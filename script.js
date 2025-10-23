document.addEventListener('DOMContentLoaded', function() {
    // Loading screen with fallback
    const loading = document.getElementById('loading');
    
    // Ensure loading screen disappears even if something fails
    const hideLoading = () => {
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    };

    // Hide loading after maximum 3 seconds regardless
    setTimeout(hideLoading, 3000);

    // Check if all critical resources are loaded
    window.addEventListener('load', () => {
        setTimeout(hideLoading, 1000);
    });

    // Navbar scroll effect - check if navbar exists
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black/80', 'backdrop-blur-md');
            } else {
                navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
            }
        });
    }

    // Mobile menu - Enhanced for better mobile experience
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Close mobile menu when clicking on navigation links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close mobile menu when clicking outside (on overlay)
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if it exists
                if (mobileMenu) {
                    mobileMenu.classList.add('-translate-y-full');
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section > div').forEach(el => {
        observer.observe(el);
    });

    // Project video hover effects
    document.querySelectorAll('.group video').forEach(video => {
        const parent = video.closest('.group');
        
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play failed:', e));
            });
            
            parent.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Form handling - check if form exists
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                const originalText = button.textContent;
                
                button.textContent = 'Sending...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Message Sent!';
                    button.classList.add('from-green-500', 'to-green-600');
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.classList.remove('from-green-500', 'to-green-600');
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }

    // Navigation active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-blue-400');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-blue-400');
                }
            });
        });
    }

    // Enhanced hover effects for interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-2px)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animate-float');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Enhanced Section Animations with Scale Effect
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.section-content');
                if (content) {
                    content.classList.add('animate-section-enter');
                }
                
                // Animate individual cards/elements within sections
                const cards = entry.target.querySelectorAll('.bg-white\\/5, .group, .flex');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                });
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '-50px 0px'
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
        
        // Set initial state for cards
        const cards = section.querySelectorAll('.bg-white\\/5, .group, .flex');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Add dynamic styles for animations
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .section-content {
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-section-enter {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .mobile-nav-link {
            opacity: 0;
            transform: translateX(-20px);
            animation: slideInMobile 0.4s ease-out forwards;
        }
        
        .mobile-nav-link:nth-child(1) { animation-delay: 0.1s; }
        .mobile-nav-link:nth-child(2) { animation-delay: 0.2s; }
        .mobile-nav-link:nth-child(3) { animation-delay: 0.3s; }
        .mobile-nav-link:nth-child(4) { animation-delay: 0.4s; }
        .mobile-nav-link:nth-child(5) { animation-delay: 0.5s; }
        
        @keyframes slideInMobile {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Enhanced hover effects for mobile */
        @media (hover: none) and (pointer: coarse) {
            .mobile-nav-link:active {
                transform: scale(0.95);
                color: #60a5fa;
            }
        }
        
        /* Smooth section transitions */
        section {
            transition: background 1s ease-in-out;
        }
        
        /* Custom scrollbar for mobile */
        @media (max-width: 768px) {
            ::-webkit-scrollbar {
                width: 4px;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);

    console.log('Portfolio loaded successfully!');
});

// Additional safeguard - hide loading if it's still visible after 5 seconds
setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading && loading.style.display !== 'none') {
        loading.style.display = 'none';
        console.warn('Loading screen force-hidden after timeout');
    }
}, 5000);
