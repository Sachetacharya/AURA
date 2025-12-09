// ========================================
// AURA - Ultra Aesthetic Experience
// Advanced Interactive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNavbar();
    initMenu();
    initScrollReveal();
    initSmoothScroll();
    initCounters();
    initFormSubmission();
    initTestimonials();
    initParallax();
    initFloatingShapes();
    initGalleryEffects();
    initProjectCards();
    initMarquee();
    initVideoControl();
});

// ========================================
// LOADER WITH PERCENTAGE
// ========================================

function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderBar = document.querySelector('.loader-bar');
    const loaderPercent = document.querySelector('.loader-percent');

    if (!loader) return;

    let progress = 0;
    document.body.style.overflow = 'hidden';

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 12 + 3;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            if (loaderBar) loaderBar.style.width = '100%';
            if (loaderPercent) loaderPercent.textContent = '100%';

            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                triggerHeroAnimations();
            }, 800);
        } else {
            if (loaderBar) loaderBar.style.width = `${progress}%`;
            if (loaderPercent) loaderPercent.textContent = Math.floor(progress) + '%';
        }
    }, 80);
}

function triggerHeroAnimations() {
    // Trigger character animations
    const heroChars = document.querySelectorAll('.hero-title .char');
    heroChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
        }, index * 80);
    });

    // Counter animations
    const counters = document.querySelectorAll('.stat-value[data-value]');
    counters.forEach(counter => animateCounter(counter));
}

// ========================================
// ADVANCED CUSTOM CURSOR
// ========================================

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorText = document.querySelector('.cursor-text');

    if (!cursor || !cursorDot) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Clear all cursor states
    function clearCursorStates() {
        cursor.classList.remove('hovering', 'cursor-view', 'cursor-expand', 'cursor-play', 'cursor-drag', 'cursor-link', 'magnetic');
        if (cursorText) cursorText.textContent = '';
    }

    // Project cards - show "View" text
    document.querySelectorAll('.project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('cursor-view');
            if (cursorText) cursorText.textContent = 'View';
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Gallery items - show "Expand" text
    document.querySelectorAll('.gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('cursor-expand');
            if (cursorText) cursorText.textContent = 'Expand';
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Videos - show "Play" text
    document.querySelectorAll('video, .visual-frame, .hero-media').forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('cursor-play');
            if (cursorText) cursorText.textContent = 'Play';
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Testimonial area - show "Drag" text
    document.querySelectorAll('.testimonial-wrapper').forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('cursor-drag');
            if (cursorText) cursorText.textContent = 'Drag';
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Menu links - magnetic effect
    document.querySelectorAll('.menu-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('magnetic');
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Regular links and buttons - simple hover
    document.querySelectorAll('a:not(.project-card):not(.gallery-item):not(.menu-link), button:not(.control-btn)').forEach(el => {
        // Skip if element is inside a project card or gallery item
        if (el.closest('.project-card') || el.closest('.gallery-item')) return;

        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Control buttons (prev/next) - link style
    document.querySelectorAll('.control-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearCursorStates();
            cursor.classList.add('cursor-link');
        });
        el.addEventListener('mouseleave', clearCursorStates);
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// ========================================
// NAVBAR WITH HIDE ON SCROLL
// ========================================

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // Add scrolled class
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show on scroll direction
                if (currentScroll > lastScroll && currentScroll > 500) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// FULLSCREEN MENU
// ========================================

function initMenu() {
    const menuToggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.full-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (!menuToggle || !menu) return;

    function openMenu() {
        menu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        animateMenuLinks();
    }

    function closeMenu() {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
}

function animateMenuLinks() {
    const links = document.querySelectorAll('.menu-link');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(60px)';

        setTimeout(() => {
            link.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 500 + (index * 120));
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    // Section reveals
    const revealElements = document.querySelectorAll(
        '.section-tag, .section-title, .section-subtitle, .about-text, ' +
        '.about-features, .visual-wrapper, .cta-content, .footer-content'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Project cards with stagger
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(projectCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px)';
        card.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        projectObserver.observe(card);
    });

    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(galleryItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        galleryObserver.observe(item);
    });

    // Features
    const features = document.querySelectorAll('.feature');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(features).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    features.forEach((feature) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-40px)';
        feature.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        featureObserver.observe(feature);
    });

    // Stats
    const stats = document.querySelectorAll('.stat');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(stats).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });

    stats.forEach((stat) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        statObserver.observe(stat);
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 100;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-value]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    if (element.classList.contains('counted')) return;
    element.classList.add('counted');

    const target = parseInt(element.dataset.value);
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ========================================
// FORM SUBMISSION
// ========================================

function initFormSubmission() {
    const form = document.querySelector('.contact-form, .cta-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"], .form-btn');
        if (!btn) return;

        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerHTML = '<span>Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 2500);
        }, 1500);
    });
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================

function initTestimonials() {
    const testimonialData = [
        {
            quote: "AURA transformed our digital presence into something truly magical. Their attention to detail and creative vision exceeded all expectations.",
            name: "Sarah Kim",
            role: "CEO, Ethereal Wellness",
            initials: "SK"
        },
        {
            quote: "Working with AURA was an incredible experience. They understood our vision perfectly and delivered beyond what we imagined possible.",
            name: "James Chen",
            role: "Founder, Lumina Gallery",
            initials: "JC"
        },
        {
            quote: "The level of craftsmanship and creativity AURA brings to every project is unmatched. They're not just designers, they're artists.",
            name: "Maria Santos",
            role: "Creative Director, Horizon",
            initials: "MS"
        },
        {
            quote: "AURA elevated our brand to new heights. Their innovative approach and flawless execution made all the difference.",
            name: "David Park",
            role: "CEO, Prism Fashion",
            initials: "DP"
        },
        {
            quote: "From concept to completion, AURA delivered excellence. Their team's passion for design shines through in every detail.",
            name: "Emma Wilson",
            role: "Marketing Director, Nova Tech",
            initials: "EW"
        }
    ];

    const quoteText = document.querySelector('.quote-text');
    const authorName = document.querySelector('.author-name');
    const authorRole = document.querySelector('.author-role');
    const authorImage = document.querySelector('.author-image span');
    const currentCounter = document.querySelector('.control-counter .current');
    const totalCounter = document.querySelector('.control-counter .total');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');

    if (!quoteText || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const total = testimonialData.length;

    if (totalCounter) totalCounter.textContent = String(total).padStart(2, '0');

    function updateTestimonial() {
        const testimonial = testimonialData[currentIndex];

        // Fade out
        quoteText.style.opacity = '0';
        quoteText.style.transform = 'translateY(20px)';

        setTimeout(() => {
            quoteText.textContent = testimonial.quote;
            if (authorName) authorName.textContent = testimonial.name;
            if (authorRole) authorRole.textContent = testimonial.role;
            if (authorImage) authorImage.textContent = testimonial.initials;
            if (currentCounter) currentCounter.textContent = String(currentIndex + 1).padStart(2, '0');

            // Fade in
            quoteText.style.opacity = '1';
            quoteText.style.transform = 'translateY(0)';
        }, 300);
    }

    quoteText.style.transition = 'all 0.5s var(--ease-out-expo)';

    function nextSlide() {
        currentIndex = (currentIndex + 1) % total;
        updateTestimonial();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + total) % total;
        updateTestimonial();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto advance
    let autoInterval = setInterval(nextSlide, 6000);

    const wrapper = document.querySelector('.testimonial-wrapper');
    wrapper?.addEventListener('mouseenter', () => clearInterval(autoInterval));
    wrapper?.addEventListener('mouseleave', () => {
        autoInterval = setInterval(nextSlide, 6000);
    });
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-video, .parallax');
    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;

                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.dataset.speed) || 0.3;
                    const yPos = scrollY * speed;
                    el.style.transform = `translateY(${yPos}px) scale(1.1)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// FLOATING SHAPES INTERACTION
// ========================================

function initFloatingShapes() {
    const shapes = document.querySelectorAll('.float-shape');
    if (shapes.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 15;
            const x = mouseX * speed;
            const y = mouseY * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ========================================
// GALLERY HOVER EFFECTS
// ========================================

function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            galleryItems.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.3';
                    other.style.filter = 'grayscale(100%) blur(2px)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(other => {
                other.style.opacity = '';
                other.style.filter = '';
            });
        });
    });
}

// ========================================
// PROJECT CARDS 3D TILT
// ========================================

function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Magnetic buttons
    const buttons = document.querySelectorAll('.btn, .cta-button, .project-link');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ========================================
// MARQUEE PAUSE ON HOVER
// ========================================

function initMarquee() {
    const marquee = document.querySelector('.marquee');
    const marqueeContent = document.querySelector('.marquee-content');

    if (!marquee || !marqueeContent) return;

    marquee.addEventListener('mouseenter', () => {
        marqueeContent.style.animationPlayState = 'paused';
    });

    marquee.addEventListener('mouseleave', () => {
        marqueeContent.style.animationPlayState = 'running';
    });
}

// ========================================
// VIDEO PLAY/PAUSE ON VISIBILITY
// ========================================

function initVideoControl() {
    const videos = document.querySelectorAll('video');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.3 });

    videos.forEach(video => {
        video.setAttribute('preload', 'metadata');
        videoObserver.observe(video);
    });
}

// ========================================
// BACK TO TOP
// ========================================

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }

    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid var(--accent, #a78bfa);
        outline-offset: 4px;
    }
`;
document.head.appendChild(focusStyle);

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Reduce animations on low-end devices or prefer-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

if (prefersReducedMotion || isLowEndDevice) {
    document.body.classList.add('reduce-animations');

    const reduceStyle = document.createElement('style');
    reduceStyle.textContent = `
        .reduce-animations *,
        .reduce-animations *::before,
        .reduce-animations *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.2s !important;
        }
        .reduce-animations .floating-shape,
        .reduce-animations .glow-orb {
            display: none;
        }
    `;
    document.head.appendChild(reduceStyle);
}

// ========================================
// TEXT SPLIT ANIMATION
// ========================================

document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';

    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(40px)';
        span.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s`;
        span.classList.add('char');
        el.appendChild(span);
    });

    const chars = el.querySelectorAll('.char');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chars.forEach(char => {
                    char.style.opacity = '1';
                    char.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(el);
});

// ========================================
// INITIALIZATION COMPLETE
// ========================================

console.log('%c AURA ', 'background: linear-gradient(135deg, #a78bfa, #c4b5fd); color: #000; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 4px;', 'Ultra Aesthetic Experience Initialized');
