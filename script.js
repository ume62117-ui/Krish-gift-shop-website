/* ==========================================
   KRRISH GIFT GALLERY - Main JavaScript
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Navigation Toggle for Mobile
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ==========================================
    // Sticky Header on Scroll
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ==========================================
    // Scroll Animation - Fade in elements on scroll
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.product-card, .why-card, .review-card, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // ==========================================
    // Active Navigation Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // ==========================================
    // Product Card Tilt Effect (optional enhancement)
    // ==========================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ==========================================
    // WhatsApp Button Visibility
    // ==========================================
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        } else {
            whatsappButton.style.opacity = '0.8';
        }
    });
    
    // ==========================================
    // Lazy Loading Images (Performance optimization)
    // ==========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ==========================================
    // Add Loading State to Product Buttons
    // ==========================================
    const orderButtons = document.querySelectorAll('.product-info .btn-secondary');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a slight scale effect on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log('%c🎁 Welcome to KRRISH GIFT GALLERY!', 'font-size: 20px; font-weight: bold; color: #C41E3A;');
    console.log('%cYour Perfect Gift Destination', 'font-size: 14px; color: #D4AF37;');
    
    // ==========================================
    // Performance: Reduce animations on low-end devices
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
    
});

// ==========================================
// Utility Functions
// ==========================================

// Function to format phone numbers
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{2})(\d{4})(\d{3})(\d{3})/, '+$1-$2-$3-$4');
}

// Function to generate WhatsApp link
function generateWhatsAppLink(phone, product) {
    const message = encodeURIComponent(`Hi I want to order ${product} from KRRISH GIFT GALLERY`);
    return `https://wa.me/${phone}?text=${message}`;
}

// ==========================================
// Page Load Performance
// ==========================================
window.addEventListener('load', function() {
    // Hide loading indicator if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
