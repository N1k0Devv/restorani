/* ============================================
   SATORI RESTAURANT - ENHANCED SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Navigation Logic with Enhanced Animation
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        const bars = navToggle.querySelector('.hamburger');
        if (navLinks.classList.contains('mobile-open')) {
            bars.style.background = 'transparent';
        } else {
            bars.style.background = '#fff';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            const bars = navToggle.querySelector('.hamburger');
            bars.style.background = '#fff';
        });
    });

    // 2. Menu Tabs & Image Switching with Smooth Transitions
    const tabs = document.querySelectorAll('.menu-tab');
    const categories = document.querySelectorAll('.menu-category');
    const menuImage = document.getElementById('menuImage');

    // High Quality Images for Categories
    const categoryImages = {
        'starters': '/images/Starters.jpg', 
        'mains': 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?q=80&w=1000&auto=format&fit=crop', 
        'drinks': '/images/Drinks.jpg', 
        'desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop' 
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const targetId = this.dataset.category;
            const targetContent = document.getElementById(targetId);
            if(targetContent) targetContent.classList.add('active');

            if (menuImage && categoryImages[targetId]) {
                menuImage.style.opacity = '0';
                setTimeout(() => {
                    menuImage.src = categoryImages[targetId];
                    menuImage.onload = () => {
                        menuImage.style.opacity = '1';
                    };
                    if(menuImage.complete) menuImage.style.opacity = '1';
                }, 300);
            }
        });
    });

    // 3. Scroll Reveal Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('mobile-open');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
        });
    }

    // 6. Animated Counter for Stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Only animate if it's a number
                if (!isNaN(parseFloat(finalValue))) {
                    animateCounter(target, finalValue);
                    statsObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, finalValue) {
        const isDecimal = finalValue.includes('.');
        const numericValue = parseFloat(finalValue);
        const duration = 2000;
        const increment = numericValue / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = finalValue;
                clearInterval(timer);
            } else {
                element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current) + '+';
            }
        }, 16);
    }

    // 7. Gallery Lightbox Effect (Simple Implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                    animation: fadeIn 0.3s ease;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 4px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                lightbox.addEventListener('click', () => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
            }
        });
    });

    // 8. Menu Item Hover Sound Effect (Optional - Visual Feedback)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(218, 165, 32, 0.05)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // 9. Testimonial Cards Stagger Animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        testimonialObserver.observe(card);
    });

    // 10. Event Cards Stagger Animation
    const eventCards = document.querySelectorAll('.event-card');
    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                eventObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        eventObserver.observe(card);
    });

    // 11. Scroll Progress Indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), #fff);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    };
    createScrollProgress();

    // 12. Add Cursor Trail Effect (Optional Enhancement)
    let cursorTrail = [];
    const maxTrailLength = 10;

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                opacity: 0.6;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                transition: opacity 0.5s ease;
            `;
            document.body.appendChild(trail);
            cursorTrail.push(trail);

            if (cursorTrail.length > maxTrailLength) {
                const oldTrail = cursorTrail.shift();
                oldTrail.style.opacity = '0';
                setTimeout(() => {
                    if (oldTrail.parentNode) {
                        oldTrail.parentNode.removeChild(oldTrail);
                    }
                }, 500);
            }
        }
    });

    // 13. Loading Animation Complete
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('🍽️ Satori Restaurant - Enhanced Experience Loaded');
});