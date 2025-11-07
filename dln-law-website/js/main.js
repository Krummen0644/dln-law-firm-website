// Donald L. Nageleisen Attorney at Law - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    initMobileMenu();

    // Form Validation
    initContactForm();

    // Smooth Scrolling
    initSmoothScroll();

    // Header Scroll Effect
    initHeaderScroll();

    // Animation on Scroll
    initScrollAnimations();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobilePracticeToggle = document.getElementById('mobile-practice-toggle');
    const mobilePracticeMenu = document.getElementById('mobile-practice-menu');

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Toggle practice areas submenu on mobile
    if (mobilePracticeToggle && mobilePracticeMenu) {
        mobilePracticeToggle.addEventListener('click', function() {
            const isExpanded = mobilePracticeToggle.getAttribute('aria-expanded') === 'true';
            mobilePracticeToggle.setAttribute('aria-expanded', !isExpanded);
            mobilePracticeMenu.classList.toggle('hidden');

            // Rotate arrow icon
            const arrow = mobilePracticeToggle.querySelector('svg');
            if (arrow) {
                arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) &&
            mobileMenuButton && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Contact Form Validation and Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        clearFormErrors();

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // In production, this would submit to a backend
            // For now, show success message
            showSuccessMessage();
            contactForm.reset();
        }
    });
}

/**
 * Validate Contact Form
 */
function validateForm() {
    let isValid = true;

    // Validate name
    const name = document.getElementById('name');
    if (name && name.value.trim() === '') {
        showError('name', 'name-error');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && (email.value.trim() === '' || !emailRegex.test(email.value))) {
        showError('email', 'email-error');
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('phone');
    if (phone && phone.value.trim() === '') {
        showError('phone', 'phone-error');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message');
    if (message && message.value.trim() === '') {
        showError('message', 'message-error');
        isValid = false;
    }

    return isValid;
}

/**
 * Show Error Message
 */
function showError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (field) {
        field.classList.add('border-red-500');
    }

    if (error) {
        error.classList.remove('hidden');
    }
}

/**
 * Clear Form Errors
 */
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('[id$="-error"]');
    errorMessages.forEach(function(error) {
        error.classList.add('hidden');
    });

    const fields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    fields.forEach(function(field) {
        field.classList.remove('border-red-500');
    });
}

/**
 * Show Success Message
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.classList.remove('hidden');

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide after 5 seconds
        setTimeout(function() {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip empty hashes
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Scroll Effect - Add shadow on scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');

    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
}

/**
 * Scroll Animations - Fade in elements on scroll
 */
function initScrollAnimations() {
    // Create observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * Utility: Debounce Function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Track Call Button Clicks (for analytics)
 */
document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
        // In production, send to analytics
        console.log('Call button clicked');
    });
});

/**
 * Track Form Submissions (for analytics)
 */
const forms = document.querySelectorAll('form');
forms.forEach(function(form) {
    form.addEventListener('submit', function() {
        // In production, send to analytics
        console.log('Form submitted');
    });
});
