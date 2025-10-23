document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 1000);
    }, 2000);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80', 'backdrop-blur-md');
        } else {
            navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
        }
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('-translate-y-full');
    });

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
                // Close mobile menu
                mobileMenu.classList.add('-translate-y-full');
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
        
        parent.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log('Video play failed'));
        });
        
        parent.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Form handling
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.classList.add('bg-green-500');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.classList.remove('bg-green-500');
                this.reset();
            }, 2000);
        }, 1000);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animate-float');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Navigation active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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

    // Add custom cursor (optional)
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150';
    cursor.style.display = 'none';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 12 + 'px';
        cursor.style.top = e.clientY - 12 + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Hover effects for interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});
