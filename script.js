// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const typed = document.getElementById('typed');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillProgress = document.querySelectorAll('.skill-progress');

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 10,
    easing: 'ease-in-out',
    once: true,
    offset: 50
});

// Typed.js initialization
if (typed) {
    new Typed('#typed', {
        strings: [
            'Data Analyst',
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Problem Solver'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavbar() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavbar);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skills animation on scroll
const skillsSection = document.getElementById('skills');

const animateSkills = () => {
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > sectionTop + 100) {
        skillProgress.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width;
        });
        window.removeEventListener('scroll', animateSkills);
    }
};

if (skillsSection) {
    window.addEventListener('scroll', animateSkills);
}

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully!', 'success');
        this.reset();
        
        // You can replace this with actual form submission logic
        // For example, using fetch API to send data to your server
        /*
        fetch('/submit-contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Message sent successfully!', 'success');
                this.reset();
            } else {
                showNotification('Failed to send message. Please try again.', 'error');
            }
        })
        .catch(error => {
            showNotification('An error occurred. Please try again.', 'error');
        });
        */
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Particle animation for hero section
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroParticles.appendChild(particle);
    }
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const speed = scrolled * 0.5;
        heroContent.style.transform = `translateY(${speed}px)`;
    }
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme toggle functionality (optional)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, stepTime);
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loading-content {
            text-align: center;
            color: var(--text-primary);
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--bg-tertiary);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loadingScreen);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    createParticles();
    lazyLoadImages();
    initThemeToggle();
    initScrollToTop();
    animateCounters();
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', parallaxEffect);
    
    // Prevent form submission on resume button (it should download resume)
    const resumeBtn = document.querySelector('a[href*="resume"]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can add actual resume download logic here
            showNotification('Resume download feature coming soon!', 'info');
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedParallax = debounce(parallaxEffect, 10);
const debouncedHighlight = debounce(highlightNavbar, 10);

window.addEventListener('scroll', debouncedParallax);
window.addEventListener('scroll', debouncedHighlight);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}














document.querySelectorAll(".btn-link").forEach(button => {
    button.addEventListener("click", function () {
      console.log(`User clicked: ${this.textContent}`);
    });
  });








// Certificates Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top and home section on page load/reload
    window.scrollTo(0, 0);
    window.location.hash = '';
    
    // Add the Certificates link to the navigation menu
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        const contactLink = document.querySelector('a[href="#contact"]');
        if (contactLink) {
            const certificatesLink = document.createElement('a');
            certificatesLink.href = '#certificates';
            certificatesLink.className = 'nav-link';
            certificatesLink.setAttribute('data-section', 'certificates');
            certificatesLink.innerHTML = '<i class="fas fa-award"></i> Certificates';
            navMenu.insertBefore(certificatesLink, contactLink);
        }
    }

    // Initialize certificates slider
    initCertificatesSlider();
    
    // Add scroll event listener to handle active navigation state
    updateActiveNavOnScroll();
    
    // Initialize typing animation with delay to ensure proper loading
    setTimeout(initTypingAnimation, 500);
});

// Force page to start at home on page load/reload
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Prevent hash-based navigation on page load
window.addEventListener('load', function() {
    if (window.location.hash) {
        window.location.hash = '';
        window.scrollTo(0, 0);
    }
});

function updateActiveNavOnScroll() {
    // Get all sections and navigation links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Find the current section in viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset to trigger earlier
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // If no section is detected or at top, set to home
        if (!current || window.pageYOffset < 100) {
            current = 'home';
        }
        
        // Update active class on navigation items
        navLinks.forEach(link => {
            link.classList.remove('active');
            const section = link.getAttribute('data-section');
            if (section === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Trigger once to set initial active state
    window.dispatchEvent(new Event('scroll'));
}

function initCertificatesSlider() {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.certificate-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevCertificate');
    const nextBtn = document.getElementById('nextCertificate');
    
    if (!track || !cards.length || !prevBtn || !nextBtn) return;
    
    let cardWidth = cards[0].offsetWidth + 30; // Add gap
    let cardsPerView = getCardsPerView();
    let currentIndex = 0;
    let maxIndex = Math.max(0, cards.length - cardsPerView);
    
    // Initialize slider
    updateSliderPosition();
    updateDots();
    
    // Update cards per view on window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 30;
        cardsPerView = getCardsPerView();
        maxIndex = Math.max(0, cards.length - cardsPerView);
        
        // Make sure currentIndex is still valid
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateSliderPosition();
        updateDots();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
            updateDots();
        }
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
            updateDots();
        }
    });
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Calculate the actual index based on cards per view
            let targetIndex = Math.min(index, maxIndex);
            currentIndex = targetIndex;
            updateSliderPosition();
            updateDots();
        });
    });
    
    // Update slider position
    function updateSliderPosition() {
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }
    
    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Get the number of cards to show based on viewport
    function getCardsPerView() {
        if (window.innerWidth >= 992) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }
}

// Initialize typing animation
function initTypingAnimation() {
    // Check if Typed.js is loaded and element exists
    const typedElement = document.getElementById('typed');
    if (!typedElement || !window.Typed) {
        console.log('Typed.js not loaded or element not found, retrying...');
        setTimeout(initTypingAnimation, 1000);
        return;
    }
    
    // Destroy any existing instance
    if (typedElement._typed) {
        typedElement._typed.destroy();
    }
    
    // Clear the element content
    typedElement.innerHTML = '';
    
    
    
    // Store the instance for potential cleanup
    typedElement._typed = typed;
}

// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle page visibility change to restart typing animation if needed
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const typedElement = document.getElementById('typed');
        if (typedElement && typedElement._typed) {
            // Reset typing animation when page becomes visible again
            typedElement._typed.reset();
        }
    }
});