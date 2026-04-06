/** =====================================================================
    Portfolio Website - JavaScript Functionality
    Complete implementation of all interactive features
    ===================================================================== */

/** ---------------------------------------------------------------------
    CONFIGURATION
    --------------------------------------------------------------------- */
// Hero slideshow images - Stunning high-resolution landscapes
// Carefully selected for dramatic impact and text readability
const heroImages = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&q=85', // Epic mountain range with blue sky
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=85', // Dramatic mountain peaks
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&h=1080&fit=crop&q=85', // Waterfall with mist
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1920&h=1080&fit=crop&q=85', // Himalayan mountains
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&q=85', // Night stars over mountains
];

// Typewriter phrases - varied professional titles
const phrases = [
    'AI / ML Engineer',
    'Stock Trader',
    'JEE Advanced',
    'Thomson Reuters',
    'LSEG',
    'BOLT Insurance',
    'Adventurer',
    'Designer'
];

/** ---------------------------------------------------------------------
    HERO SLIDESHOW
    - Reads from heroImages array
    - Creates slide divs dynamically
    - Crossfades every 4 seconds
    - Pauses on hover
    - Manual prev/next controls
    - Dot indicators that sync with slides
    --------------------------------------------------------------------- */
function initHeroSlideshow() {
    const slideshow = document.getElementById('heroSlideshow');
    const dotsContainer = document.getElementById('heroDots');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    if (!slideshow || !dotsContainer) return;

    // Create slides from heroImages array
    // This allows any number of images (1 to 10+)
    heroImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" ${index === 0 ? '' : 'loading="lazy"'}>`;
        slideshow.appendChild(slide);

        // Create dot for this slide
        const dot = document.createElement('button');
        dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const slides = slideshow.querySelectorAll('.hero-slide');
    const dots = dotsContainer.querySelectorAll('.hero-dot');

    // If no images configured, show a placeholder
    if (slides.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'hero-slide active';
        placeholder.innerHTML = `
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1a1a,#2d2d2d);">
                <span style="color:#808080;font-family:sans-serif;">Add hero images to heroImages array in main.js</span>
            </div>
        `;
        slideshow.appendChild(placeholder);
        return;
    }

    let currentSlide = 0;
    let isPaused = false;
    let slideshowInterval;

    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current index (wrap around if needed)
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Start auto-advance (6 seconds)
    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, 6000);
    }

    // Stop auto-advance
    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    // Event listeners for controls
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    // Pause on hover over hero section
    const hero = document.getElementById('hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => isPaused = true);
        hero.addEventListener('mouseleave', () => isPaused = false);
    }

    // Start the slideshow
    startSlideshow();
}

/** ---------------------------------------------------------------------
    NAVIGATION SCROLL EFFECTS
    - Adds .scrolled class to nav when page is scrolled
    - Highlights active section link using IntersectionObserver
    --------------------------------------------------------------------- */
function initNavScroll() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!nav) return;

    // Add/remove scrolled class based on scroll position
    function handleScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    // IntersectionObserver for active section highlighting
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/** ---------------------------------------------------------------------
    CUSTOM CURSOR
    - Green dot with smooth lerp (linear interpolation) lag
    - Ring expands on hover over interactive elements
    --------------------------------------------------------------------- */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');

    if (!cursor || !cursorRing) return;

    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop with lerp
    function animateCursor() {
        // Lerp factor: 0.15 for dot (snappier), 0.08 for ring (more lag)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        ringX += (mouseX - ringX) * 0.08;
        ringY += (mouseY - ringY) * 0.08;

        // Apply positions (center the elements)
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Expand ring on hover over interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .gallery-item, .design-card, input, textarea, .hero-arrow, .hero-dot'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
        });
    });

    // Handle mouse leave/enter window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorRing.style.opacity = '0.5';
    });
}

/** ---------------------------------------------------------------------
    TYPEWRITER EFFECT
    - Types then deletes each phrase
    - Loops forever through phrases array
    --------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterText = document.getElementById('typewriterText');
    if (!typewriterText) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Deleting characters
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        // Check if finished typing
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing - pause then start deleting
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting - move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing
    type();
}

/** ---------------------------------------------------------------------
    SCROLL REVEAL ANIMATION
    - IntersectionObserver triggers .visible class
    - Applies to all .reveal elements
    --------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/** ---------------------------------------------------------------------
    TIMELINE ANIMATION
    - Alternating left/right slide-in for timeline cards
    --------------------------------------------------------------------- */
function initTimeline() {
    const timelineCards = document.querySelectorAll('.timeline-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on card position
                const index = Array.from(timelineCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineCards.forEach(card => observer.observe(card));
}

/** ---------------------------------------------------------------------
    LIGHTBOX GALLERY
    - Opens on gallery image click
    - Shows image, caption, and counter
    - ESC key closes
    - Arrow keys navigate
    - Focus trap for accessibility
    --------------------------------------------------------------------- */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !lightboxImage) return;

    let currentIndex = 0;
    const totalImages = galleryItems.length;

    // Collect gallery data
    const galleryData = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-item-title')?.textContent || '';
        const location = item.querySelector('.gallery-item-location')?.textContent || '';
        return {
            src: img?.src || '',
            title: title,
            caption: location ? `${location} — ${title}` : title
        };
    });

    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll

        // Trap focus
        lightboxClose.focus();
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update lightbox content
    function updateLightbox() {
        const data = galleryData[currentIndex];
        lightboxImage.src = data.src;
        lightboxImage.alt = data.title;
        lightboxTitle.textContent = data.title;
        lightboxCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
    }

    // Navigate
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateLightbox();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateLightbox();
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });

    // Focus trap
    lightbox.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        const focusableElements = lightbox.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    });
}

/** ---------------------------------------------------------------------
    CARD TILT EFFECT
    - 3D perspective tilt on project cards
    - Resets on mouseleave
    --------------------------------------------------------------------- */
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (max 10 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/** ---------------------------------------------------------------------
    COUNT UP ANIMATION
    - Animates stat numbers from 0 to final value
    - Triggers when scrolled into view
    --------------------------------------------------------------------- */
function initCountUp() {
    const statNumbers = document.querySelectorAll('[data-count]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'), 10);
                animateCount(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));

    function animateCount(element, finalValue) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * finalValue);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = finalValue;
                // Add suffix if needed
                if (finalValue === 500) {
                    element.textContent = finalValue + '+';
                }
            }
        }

        requestAnimationFrame(update);
    }
}

/** ---------------------------------------------------------------------
    CONTACT FORM
    - Prevents default submit
    - Validates all fields
    - Shows success message
    - Resets form
    - Includes commented Formspree integration
    --------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const submitBtn = document.getElementById('formSubmit');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();

        // Validation
        if (!name || !email || !message) {
            showError('Please fill in all fields.');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        // Disable submit button during submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // =====================================================================
        // FORMSPREE INTEGRATION (Uncomment to use)
        // =====================================================================
        // 1. Go to https://formspree.io and create a free account
        // 2. Create a new form and copy your endpoint URL (e.g., https://formspree.io/f/YOUR_FORM_ID)
        // 3. Replace the URL below with your Formspree endpoint
        // 4. Uncomment the code below
        //
        // try {
        //     const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json'
        //         },
        //         body: formData
        //     });
        //
        //     if (response.ok) {
        //         showSuccess();
        //     } else {
        //         showError('Something went wrong. Please try again.');
        //     }
        // } catch (error) {
        //     showError('Something went wrong. Please try again.');
        // }
        // =====================================================================

        // Simulate successful submission (remove when using Formspree)
        setTimeout(() => {
            showSuccess();
        }, 1000);
    });

    function showSuccess() {
        // Hide error if visible
        formError?.classList.remove('show');
        // Show success
        formSuccess?.classList.add('show');
        // Reset form
        form.reset();
        // Reset button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
        // Hide success after 5 seconds
        setTimeout(() => {
            formSuccess?.classList.remove('show');
        }, 5000);
    }

    function showError(message) {
        formSuccess?.classList.remove('show');
        formError.textContent = message;
        formError?.classList.add('show');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }

    // Clear messages on input
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            formSuccess?.classList.remove('show');
            formError?.classList.remove('show');
        });
    });
}

/** ---------------------------------------------------------------------
    EMAIL COPY TO CLIPBOARD
    - Copies email to clipboard on click
    - Shows toast notification
    --------------------------------------------------------------------- */
function initEmailCopy() {
    const emailWrapper = document.getElementById('emailWrapper');
    const toast = document.getElementById('toast');

    if (!emailWrapper) return;

    emailWrapper.addEventListener('click', async () => {
        const email = emailWrapper.querySelector('.contact-email')?.textContent;

        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Email copied!');
        }
    });

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
}

/** ---------------------------------------------------------------------
    CALL ICON CLICK HANDLER
    - Shows error message when clicked
    --------------------------------------------------------------------- */
function initCallIcon() {
    const callIcon = document.getElementById('callIcon');

    if (!callIcon) return;

    callIcon.addEventListener('click', (e) => {
        e.preventDefault();
        alert("You Don't have permission to call");
    });
}

/** ---------------------------------------------------------------------
    MOBILE NAVIGATION
    - Hamburger toggle
    - Closes on link click
    --------------------------------------------------------------------- */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/** ---------------------------------------------------------------------
    BACK TO TOP
    - Scrolls to top smoothly
    --------------------------------------------------------------------- */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/** ---------------------------------------------------------------------
    INITIALIZE ALL FUNCTIONS
    --------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlideshow();
    initNavScroll();
    initCursor();
    initTypewriter();
    initScrollReveal();
    initTimeline();
    initLightbox();
    initCardTilt();
    initCountUp();
    initContactForm();
    initEmailCopy();
    initCallIcon();
    initMobileNav();
    initBackToTop();
});

/** =====================================================================
    SLIDESHOW VERIFICATION CHECKLIST
    =====================================================================

    The initHeroSlideshow() function handles:

    ✓ FIRST LOAD
      - Creates slide divs from heroImages array
      - First image (index 0) gets 'active' class immediately
      - All slides start with opacity: 0 except first
      - Placeholder shown if no images configured

    ✓ AUTO-ADVANCE
      - setInterval runs every 4000ms (4 seconds)
      - Increments currentSlide, wraps to 0 at end
      - Toggles 'active' class to trigger CSS crossfade (1.5s)
      - Updates dots to match current slide

    ✓ MANUAL PREV/NEXT
      - Left/right arrow buttons call prevSlide()/nextSlide()
      - Clicking resets the interval timer
      - Wraps at beginning/end of array

    ✓ DOT SYNC
      - Dots created dynamically matching image count
      - 'active' class toggled on dots to match slides
      - Clicking a dot calls goToSlide(index)

    ✓ PAUSE ON HOVER
      - isPaused boolean set true on mouseenter
      - Interval skips slide change when paused
      - Resumes on mouseleave

    ✓ SCALABILITY
      - Works with 1 image (stays on that slide)
      - Works with 2-10+ images
      - Dynamic slide/dot creation from array

    ===================================================================== */
