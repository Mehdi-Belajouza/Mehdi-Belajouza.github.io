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

    // Mobile menu - check if elements exist
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('-translate-y-full');
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
