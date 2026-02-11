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
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
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

// CV Modal functionality
const cvModal = document.getElementById('cv-modal');
const cvModalBtn = document.getElementById('cv-modal-btn');
const cvCloseBtn = document.getElementById('cv-close-btn');
const downloadPdfBtn = document.getElementById('download-pdf');

if (cvModalBtn && cvModal) {
    cvModalBtn.addEventListener('click', () => {
        cvModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
}

if (cvCloseBtn && cvModal) {
    cvCloseBtn.addEventListener('click', () => {
        cvModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (cvModal) {
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            cvModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Download PDF functionality
if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
        // You can link to a PDF file or generate one
        window.open('mehdi-belajouza-cv.pdf', '_blank');
    });
}

// Print CV functionality
const printCvBtn = document.getElementById('print-cv');
if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
        // Hide modal temporarily for printing
        const modal = document.getElementById('cv-modal');
        const originalDisplay = modal.style.display;
        
        // Create print-friendly version
        const printWindow = window.open('', '_blank');
        const cvContent = document.querySelector('.modal-content').innerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Mehdi Belajouza - CV</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    .cv-section { margin-bottom: 20px; page-break-inside: avoid; }
                    .cv-section-title { color: #1abc9c; border-bottom: 2px solid #1abc9c; padding-bottom: 5px; }
                    .skill-tag { display: inline-block; background: #1abc9c; color: white; padding: 2px 8px; border-radius: 10px; margin: 2px; font-size: 12px; }
                    .cv-photo { width: 100px; height: 100px; border-radius: 50%; }
                    .experience-period, .education-period { background: #1abc9c; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>${cvContent}</body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    });
}

// ============================================
// ENHANCED 3D TILT EFFECTS AND COOL ANIMATIONS
// ============================================

// 3D Tilt Effect for Cards (like the reference site)
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .bg-white\\/5');
    
    cards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s ease-out';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('button, .btn, a.group');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Staggered Reveal Animation on Scroll
function initStaggeredReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.reveal-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('revealed');
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.reveal-container').forEach(container => {
        revealObserver.observe(container);
    });
}

// Smooth Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Cursor Trail Effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.3}px;
            height: ${8 - i * 0.3}px;
            background: linear-gradient(135deg, #4ade80, #22c55e);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i * 0.05};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    let positions = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        positions.unshift({ x: mouseX, y: mouseY });
        if (positions.length > trailLength) positions.pop();
        
        trail.forEach((dot, index) => {
            const pos = positions[index] || positions[positions.length - 1];
            if (pos) {
                dot.style.left = pos.x + 'px';
                dot.style.top = pos.y + 'px';
            }
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Parallax Depth Effect
function initParallaxDepth() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const y = scrollY * speed;
            el.style.transform = `translateY(${y}px)`;
        });
    });
}

// Section Color Transition on Scroll
function initSectionColors() {
    const sections = document.querySelectorAll('section');
    
    const colorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const bgColor = entry.target.dataset.bgColor || '#0f1115';
                document.body.style.backgroundColor = bgColor;
            }
        });
    }, { threshold: [0.5] });
    
    sections.forEach(section => colorObserver.observe(section));
}

// Glitch Effect on Hover
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-hover');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 300);
        });
    });
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        init3DTilt();
        initMagneticButtons();
        initStaggeredReveal();
        initParallaxDepth();
        initSectionColors();
        initGlitchEffect();
        
        // Optional: Enable cursor trail (can be heavy on performance)
        // initCursorTrail();
        
        console.log('Enhanced animations initialized!');
    }, 500);
});

// Inject styles for these effects
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .reveal-child {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .reveal-child.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scramble-char {
        color: #4ade80;
    }
    
    .glitching {
        animation: glitch 0.3s steps(2, end);
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); filter: hue-rotate(180deg); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); filter: hue-rotate(0); }
    }
    
    /* Smooth transitions for body background */
    body {
        transition: background-color 0.8s ease;
    }
    
    /* Card hover glow effect */
    .project-card:hover,
    .skill-card:hover,
    .bg-white\\/5:hover {
        box-shadow: 
            0 0 30px rgba(74, 222, 128, 0.2),
            0 0 60px rgba(74, 222, 128, 0.1),
            0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    /* Floating animation enhancement */
    @keyframes float-enhanced {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(2deg);
        }
    }
    
    .float-enhanced {
        animation: float-enhanced 4s ease-in-out infinite;
    }
`;
document.head.appendChild(enhancedStyles);

// =====================================================
// THEME TOGGLE FUNCTIONALITY
// =====================================================

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
if (currentTheme === 'dark') {
    body.classList.add('dark');
    updateThemeIcon('dark');
} else {
    body.classList.remove('dark');
    updateThemeIcon('light');
}

function toggleTheme() {
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i');
    icons.forEach(icon => {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun text-yellow-400';
        } else {
            icon.className = 'fas fa-moon text-gray-700';
        }
    });
}

// Add click handlers
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
}

// Discover button smooth scroll
const discoverBtn = document.getElementById('discover-btn');
if (discoverBtn) {
    discoverBtn.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Smooth scroll reveal animations
const observeElements = document.querySelectorAll('.fade-in-up, .project-card, .skill-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

observeElements.forEach(el => {
    el.classList.add('fade-in-up');
    scrollObserver.observe(el);
});

// Lightbox functionality for menu gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const menuItems = document.querySelectorAll('.menu-item');

let currentImageIndex = 0;
const images = Array.from(menuItems).map(item => ({
    src: item.querySelector('img').src,
    title: item.getAttribute('data-title')
}));

// Open lightbox
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    if (lightbox && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', hideLightbox);
}

// Close on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
}

// Navigate images
if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showLightbox();
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showLightbox();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            hideLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showLightbox();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showLightbox();
        }
    }
});
