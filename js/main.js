// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const pricingToggle = document.getElementById('pricingToggle');
const faqItems = document.querySelectorAll('.faq-item');
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// ===== FAQ Accordion =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== Pricing Toggle =====
if (pricingToggle) {
    const toggleLabels = document.querySelectorAll('.toggle-label');
    
    pricingToggle.addEventListener('change', () => {
        toggleLabels.forEach(label => label.classList.toggle('active'));
        
        // Update pricing display if needed
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const yearlyPrices = document.querySelectorAll('.yearly-price');
        
        if (pricingToggle.checked) {
            // Show yearly
            monthlyPrices.forEach(el => el.closest('.pricing-card')?.classList.add('hidden'));
            yearlyPrices.forEach(el => el.closest('.pricing-card')?.classList.remove('hidden'));
        } else {
            // Show monthly
            monthlyPrices.forEach(el => el.closest('.pricing-card')?.classList.remove('hidden'));
            yearlyPrices.forEach(el => el.closest('.pricing-card')?.classList.add('hidden'));
        }
    });
}

// ===== Animated Counter =====
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when visible
            if (entry.target.hasAttribute('data-count')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe stat numbers for counter animation
statNumbers.forEach(stat => {
    observer.observe(stat);
});

// Observe elements with reveal class
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize first FAQ item as open (optional)
    // faqItems[0]?.classList.add('active');
});

// ===== Form Validation Helper (if needed) =====
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// ===== Utility Functions =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===== Window Resize Handler =====
window.addEventListener('resize', debounce(() => {
    // Reset mobile menu on desktop
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
}, 250));
