document.addEventListener("DOMContentLoaded", () => {
    // Initialize elements
    const elements = {
        navToggle: document.getElementById('nav-toggle'),
        navClose: document.getElementById('nav-close'),
        sideNav: document.querySelector('.side-nav'),
        themeToggle: document.getElementById('theme-toggle'),
        typewriter: document.getElementById('typewriter'),
        loading: document.getElementById('loading'),
        contactForm: document.getElementById('contact-form'),
        canvas: document.getElementById('bubble-canvas')
    };

    // Navigation Toggle
    if (elements.navToggle && elements.sideNav) {
        elements.navToggle.addEventListener('click', () => {
            elements.sideNav.classList.add('active');
        });
    }

    if (elements.navClose && elements.sideNav) {
        elements.navClose.addEventListener('click', () => {
            elements.sideNav.classList.remove('active');
        });
    }

    // Theme Toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    }

    // Typewriter Effect
    if (elements.typewriter) {
        const typewriterText = "Full Stack Software Developer";
        let i = 0;
        function typeWriter() {
            if (i < typewriterText.length) {
                elements.typewriter.innerHTML += typewriterText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // Loading Handler
    if (elements.loading) {
        setTimeout(() => {
            elements.loading.style.display = 'none';
        }, 1000);
    }

    // Contact Form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const successMessage = document.createElement('p');
            successMessage.textContent = "Thank you for your message! I'll get back to you soon.";
            successMessage.style.color = "#2ecc71";
            successMessage.style.textAlign = "center";
            event.target.appendChild(successMessage);
            event.target.reset();
        });
    }

    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.sideNav && !e.target.closest('.side-nav') && !e.target.closest('.nav-toggle')) {
            elements.sideNav.classList.remove('active');
        }
    });

    // Initialize bubble canvas if it exists
    if (elements.canvas) {
        initBubbleCanvas(elements.canvas);
    }
});

// Network status handlers
window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

// Resource error handler
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.target.src = 'placeholder.png';
        e.target.classList.add('resource-error');
    }
}, true);

// Bubble canvas initialization function
function initBubbleCanvas(canvas) {
    const ctx = canvas.getContext("2d");

    let bubbles = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Bubble object
    function createBubble() {
        const size = Math.random() * 40 + 10;
        const x = Math.random() * canvas.width;
        const y = canvas.height + size;
        const speed = Math.random() * 2 + 1;
        const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
        return { x, y, size, speed, color };
    }

    function updateBubbles() {
        bubbles = bubbles.filter((bubble) => bubble.y + bubble.size > 0);
        bubbles.forEach((bubble) => {
            bubble.y -= bubble.speed;
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();
        });
    }

    function handlePop(x, y) {
        bubbles = bubbles.filter((bubble) => {
            const dist = Math.sqrt((bubble.x - x) ** 2 + (bubble.y - y) ** 2);
            return dist > bubble.size; // Remove bubble if popped
        });
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.02) {
            bubbles.push(createBubble());
        }
        updateBubbles();
        requestAnimationFrame(loop);
    }

    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        handlePop(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener("touchstart", (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        handlePop(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    loop();
}

// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('cursor-hover'));
    document.addEventListener('mouseup', () => cursor.classList.remove('cursor-hover'));

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));