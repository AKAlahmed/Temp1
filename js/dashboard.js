/**
 * Dashboard JavaScript
 * Handles interactivity for the supplier dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSidebar();
    initProfileDropdown();
    initBusinessStatus();
    initChartTabs();
    initViewsChart();
    initCounterAnimation();
    initFeaturedProducts();
    initShareModal();
    initSubscriptionBanner();
});

/**
 * Sidebar Toggle
 */
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const mainWrapper = document.querySelector('.main-wrapper');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

/**
 * Profile Dropdown
 */
function initProfileDropdown() {
    const profileTrigger = document.querySelector('.profile-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (profileTrigger && dropdownMenu) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });
    }
}

/**
 * Business Status (Open/Closed)
 */
function initBusinessStatus() {
    const businessStatus = document.querySelectorAll('.business-status');
    const currentStatus = document.querySelector('.current-status');
    const statusIndicator = document.querySelector('.status-indicator');
    const nextChangeText = document.querySelector('.next-change');

    // Business hours configuration
    const businessHours = {
        0: null, // Sunday - Closed
        1: { open: '08:00', close: '18:00' },
        2: { open: '08:00', close: '18:00' },
        3: { open: '08:00', close: '18:00' },
        4: { open: '08:00', close: '18:00' },
        5: { open: '08:00', close: '14:00' }, // Friday
        6: { open: '09:00', close: '17:00' }  // Saturday
    };

    function checkBusinessStatus() {
        const now = new Date();
        const day = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const todayHours = businessHours[day];

        let isOpen = false;
        let nextChangeInfo = '';

        if (todayHours) {
            const [openHour, openMin] = todayHours.open.split(':').map(Number);
            const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
            const openTime = openHour * 60 + openMin;
            const closeTime = closeHour * 60 + closeMin;

            isOpen = currentTime >= openTime && currentTime < closeTime;

            if (isOpen) {
                nextChangeInfo = `Closes at ${todayHours.close}`;
            } else if (currentTime < openTime) {
                nextChangeInfo = `Opens at ${todayHours.open}`;
            } else {
                // Find next open day
                let nextDay = (day + 1) % 7;
                while (!businessHours[nextDay]) {
                    nextDay = (nextDay + 1) % 7;
                }
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                nextChangeInfo = `Opens ${days[nextDay]} at ${businessHours[nextDay].open}`;
            }
        } else {
            // Find next open day
            let nextDay = (day + 1) % 7;
            while (!businessHours[nextDay]) {
                nextDay = (nextDay + 1) % 7;
            }
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            nextChangeInfo = `Opens ${days[nextDay]} at ${businessHours[nextDay].open}`;
        }

        // Update header status
        businessStatus.forEach(status => {
            const dot = status.querySelector('.status-dot');
            const text = status.querySelector('.status-text');
            
            if (isOpen) {
                status.classList.remove('closed');
                dot.classList.remove('closed');
                text.textContent = 'Open Now';
            } else {
                status.classList.add('closed');
                dot.classList.add('closed');
                text.textContent = 'Closed';
            }
        });

        // Update business hours section
        if (currentStatus) {
            if (isOpen) {
                currentStatus.classList.remove('closed');
                statusIndicator.classList.remove('closed');
                statusIndicator.querySelector('.status-text').textContent = 'Open Now';
            } else {
                currentStatus.classList.add('closed');
                statusIndicator.classList.add('closed');
                statusIndicator.querySelector('.status-text').textContent = 'Closed';
            }
        }

        if (nextChangeText) {
            nextChangeText.textContent = nextChangeInfo;
        }
    }

    // Check initially and every minute
    checkBusinessStatus();
    setInterval(checkBusinessStatus, 60000);
}

/**
 * Chart Tabs
 */
function initChartTabs() {
    const tabs = document.querySelectorAll('.chart-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const period = tab.dataset.period;
            updateChart(period);
        });
    });
}

/**
 * Views Chart (Chart.js)
 */
let viewsChart = null;

function initViewsChart() {
    const ctx = document.getElementById('viewsChart');
    if (!ctx) return;

    const chartData = {
        daily: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [45, 62, 58, 71, 85, 92, 68]
        },
        weekly: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [320, 428, 385, 512]
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [1250, 1420, 1180, 1580, 1890, 2150]
        }
    };

    viewsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.daily.labels,
            datasets: [{
                label: 'Profile Views',
                data: chartData.daily.data,
                borderColor: '#3b5bdb',
                backgroundColor: 'rgba(59, 91, 219, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b5bdb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Store chart data for updates
    window.chartData = chartData;
}

function updateChart(period) {
    if (!viewsChart || !window.chartData) return;
    
    const data = window.chartData[period];
    viewsChart.data.labels = data.labels;
    viewsChart.data.datasets[0].data = data.data;
    viewsChart.update();
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value');
    
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.count || element.textContent.replace(/,/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        update();
    };

    // Use Intersection Observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.dataset.count = counter.textContent.replace(/,/g, '');
        observer.observe(counter);
    });
}

/**
 * Featured Products Selection
 */
function initFeaturedProducts() {
    const products = document.querySelectorAll('.featured-product-card:not(.add-new)');
    const maxFeatured = 5;
    let selectedCount = document.querySelectorAll('.featured-product-card.selected').length;

    products.forEach(product => {
        product.addEventListener('click', () => {
            if (product.classList.contains('selected')) {
                product.classList.remove('selected');
                selectedCount--;
            } else if (selectedCount < maxFeatured) {
                product.classList.add('selected');
                selectedCount++;
            } else {
                showNotification(`You can only select up to ${maxFeatured} featured products`, 'warning');
            }

            // Update count display
            const countDisplay = document.querySelector('.featured-count');
            if (countDisplay) {
                countDisplay.textContent = `${selectedCount}/${maxFeatured} Selected`;
            }
        });
    });

    // Add new product button
    const addNewBtn = document.querySelector('.featured-product-card.add-new');
    if (addNewBtn) {
        addNewBtn.addEventListener('click', () => {
            showNotification('Add product feature coming soon!', 'info');
        });
    }
}

/**
 * Share Modal
 */
function initShareModal() {
    const shareBtn = document.querySelector('.share-btn');
    const shareModal = document.getElementById('shareModal');
    const modalClose = shareModal?.querySelector('.modal-close');
    const copyBtn = document.querySelector('.copy-btn');
    const shareInput = document.querySelector('.share-link-box input');

    if (shareBtn && shareModal) {
        shareBtn.addEventListener('click', () => {
            shareModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        modalClose?.addEventListener('click', () => {
            shareModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Copy link functionality
    if (copyBtn && shareInput) {
        copyBtn.addEventListener('click', () => {
            shareInput.select();
            document.execCommand('copy');
            
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    // Share options
    const shareOptions = document.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', () => {
            const platform = option.classList[1];
            const profileUrl = shareInput?.value || window.location.href;
            const text = 'Check out our business profile!';

            let shareUrl = '';
            switch (platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + profileUrl)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(profileUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
    });
}

/**
 * Subscription Banner
 */
function initSubscriptionBanner() {
    const banner = document.querySelector('.subscription-banner');
    const closeBtn = banner?.querySelector('.banner-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.style.display = 'none';
            localStorage.setItem('subscriptionBannerClosed', 'true');
        });
    }

    // Check if banner was previously closed
    if (localStorage.getItem('subscriptionBannerClosed') === 'true') {
        if (banner) banner.style.display = 'none';
    }
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Simulated Data Updates (Demo)
 * In production, this would fetch real data from an API
 */
function simulateDataUpdates() {
    // Simulate real-time counter updates
    setInterval(() => {
        const viewsCounter = document.querySelector('.stat-icon.views + .stat-info .stat-value');
        if (viewsCounter) {
            const currentValue = parseInt(viewsCounter.textContent.replace(/,/g, ''));
            // Random increment
            if (Math.random() > 0.7) {
                viewsCounter.textContent = (currentValue + 1).toLocaleString();
            }
        }
    }, 5000);
}

// Initialize simulated updates for demo
// simulateDataUpdates();
