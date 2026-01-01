// ===== DOM Elements =====
const magicBtn = document.getElementById('magicBtn');
const stylePanel = document.getElementById('stylePanel');
const closePanel = document.getElementById('closePanel');
const panelOverlay = document.getElementById('panelOverlay');
const colorOptions = document.querySelectorAll('.color-option');
const layoutOptions = document.querySelectorAll('.layout-option');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const shareBtn = document.getElementById('shareBtn');
const shareModal = document.getElementById('shareModal');
const modalClose = document.getElementById('modalClose');
const copyBtn = document.getElementById('copyBtn');
const shareLink = document.getElementById('shareLink');

// ===== Style Panel Toggle =====
function openStylePanel() {
    stylePanel.classList.add('active');
    panelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeStylePanel() {
    stylePanel.classList.remove('active');
    panelOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

magicBtn.addEventListener('click', openStylePanel);
closePanel.addEventListener('click', closeStylePanel);
panelOverlay.addEventListener('click', closeStylePanel);

// ===== Theme Switcher =====
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all
        colorOptions.forEach(opt => opt.classList.remove('active'));
        // Add active to clicked
        option.classList.add('active');
        
        // Get theme name
        const theme = option.getAttribute('data-theme');
        
        // Remove all theme classes
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-red', 'theme-teal');
        
        // Add new theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Save to localStorage
        localStorage.setItem('profileTheme', theme);
    });
});

// ===== Layout Switcher =====
layoutOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all
        layoutOptions.forEach(opt => opt.classList.remove('active'));
        // Add active to clicked
        option.classList.add('active');
        
        // Get layout name
        const layout = option.getAttribute('data-layout');
        
        // Remove all layout classes
        document.body.classList.remove('layout-modern', 'layout-classic', 'layout-minimal');
        
        // Add new layout class
        document.body.classList.add(`layout-${layout}`);
        
        // Save to localStorage
        localStorage.setItem('profileLayout', layout);
    });
});

// ===== Load Saved Preferences =====
function loadSavedPreferences() {
    const savedTheme = localStorage.getItem('profileTheme');
    const savedLayout = localStorage.getItem('profileLayout');
    
    if (savedTheme) {
        // Remove all theme classes and add saved
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-red', 'theme-teal');
        document.body.classList.add(`theme-${savedTheme}`);
        
        // Update UI
        colorOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-theme') === savedTheme);
        });
    }
    
    if (savedLayout) {
        // Remove all layout classes and add saved
        document.body.classList.remove('layout-modern', 'layout-classic', 'layout-minimal');
        document.body.classList.add(`layout-${savedLayout}`);
        
        // Update UI
        layoutOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-layout') === savedLayout);
        });
    }
}

// ===== Tab Navigation =====
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked tab and its content
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // Scroll to top of content
        window.scrollTo({
            top: document.querySelector('.profile-nav').offsetTop - 20,
            behavior: 'smooth'
        });
    });
});

// ===== Product Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter products
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Share Modal =====
function openShareModal() {
    shareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    shareModal.classList.remove('active');
    document.body.style.overflow = '';
}

shareBtn.addEventListener('click', openShareModal);
modalClose.addEventListener('click', closeShareModal);
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        closeShareModal();
    }
});

// ===== Copy Link =====
copyBtn.addEventListener('click', () => {
    shareLink.select();
    document.execCommand('copy');
    
    // Show feedback
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.background = '#10b981';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
        copyBtn.style.background = '';
    }, 2000);
});

// ===== Share Links =====
const shareOptions = document.querySelectorAll('.share-option');
const profileUrl = shareLink.value;
const profileTitle = document.querySelector('.business-name').textContent;

shareOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        let shareUrl = '';
        
        if (option.classList.contains('whatsapp')) {
            shareUrl = `https://wa.me/?text=${encodeURIComponent(profileTitle + ' - ' + profileUrl)}`;
        } else if (option.classList.contains('email')) {
            shareUrl = `mailto:?subject=${encodeURIComponent('Check out ' + profileTitle)}&body=${encodeURIComponent('I wanted to share this business profile with you: ' + profileUrl)}`;
        } else if (option.classList.contains('linkedin')) {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
        } else if (option.classList.contains('twitter')) {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out ' + profileTitle)}&url=${encodeURIComponent(profileUrl)}`;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});

// ===== Smooth Scroll for Contact Link =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#contact') {
            e.preventDefault();
            
            // Switch to contact tab
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            document.querySelector('[data-tab="contact"]').classList.add('active');
            document.getElementById('contact').classList.add('active');
            
            // Scroll to nav
            window.scrollTo({
                top: document.querySelector('.profile-nav').offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadSavedPreferences();
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (stylePanel.classList.contains('active')) {
            closeStylePanel();
        }
        if (shareModal.classList.contains('active')) {
            closeShareModal();
        }
    }
});
