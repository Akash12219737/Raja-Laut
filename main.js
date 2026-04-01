/**
 * Raja Laut Dive Resort - Main JavaScript
 * Handles interactions, animations, and UI enhancements.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuBtn && navLinks) {
        const openMenu = () => {
            mobileMenuBtn.classList.add('active');
            navLinks.classList.add('active');
            document.body.classList.add('menu-open');
        };
        const closeMenu = () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Collapse all dropdowns when menu closes
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        };

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Mobile tap-to-toggle for dropdown parents
        const isMobile = () => window.innerWidth <= 768;
        document.querySelectorAll('.dropdown > a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    const dropdown = link.parentElement;
                    const isOpen = dropdown.classList.contains('open');
                    // Close all others
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
                    // Toggle this one
                    if (!isOpen) dropdown.classList.add('open');
                }
            });
        });

        // Close mobile menu when a non-dropdown link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            // Skip dropdown parent links (handled above)
            if (!link.parentElement.classList.contains('dropdown') || link.closest('.dropdown-content')) {
                link.addEventListener('click', () => closeMenu());
            }
        });

        // Close menu when clicking outside (on the backdrop)
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const hasHero = document.querySelector('.hero') !== null;
    
    const handleScroll = () => {
        if (!hasHero || window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init

    // 3. Scroll Reveal Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in, .glass-card, .feature-item, .about-text');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Smooth Scrolling for Anchor Links (fallback for smooth-behavior CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Accordion Interactive Gallery
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            // Hover for desktop
            item.addEventListener('mouseenter', () => {
                accordionItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });
            // Focus for accessibility and mobile taps
            item.addEventListener('focus', () => {
                accordionItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
});
