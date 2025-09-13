// Enhanced profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update last updated date
    updateLastUpdated();
    
    // Add smooth scrolling for internal links
    addSmoothScrolling();
    
    // Add copy email functionality
    addEmailCopyFunctionality();
    
    // Add intersection observer for animation triggers
    addScrollAnimations();
    
    // Add keyboard navigation enhancements
    addKeyboardNavigation();
    
    // Add theme toggle (optional)
    addThemeToggle();
    
    // Add show more projects functionality
    addShowMoreProjects();
});

function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long' };
        lastUpdatedElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addEmailCopyFunctionality() {
    const emailLink = document.querySelector('.contact-link[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showTooltip(this, 'Email copied!');
                    setTimeout(() => window.location.href = this.getAttribute('href'), 100);
                }).catch(() => {
                    window.location.href = this.getAttribute('href');
                });
            } else {
                window.location.href = this.getAttribute('href');
            }
        });
    }
}

function showTooltip(element, message) {
    // Remove existing tooltips
    document.querySelectorAll('.tooltip').forEach(t => t.remove());
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.bottom + 5 + 'px';
    
    setTimeout(() => tooltip.remove(), 2000);
}

function addScrollAnimations() {
    // Enhanced scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe publication and experience items for staggered animation
    document.querySelectorAll('.publication-item, .experience-item, .award-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

function addKeyboardNavigation() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + 1-5 for quick section navigation
        if (e.altKey && e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const sections = ['biography', 'publications', 'experience', 'awards'];
            const sectionIndex = parseInt(e.key) - 1;
            
            if (sections[sectionIndex]) {
                const section = document.getElementById(sections[sectionIndex]);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        
        // Escape to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Optional theme toggle functionality
function addThemeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f0f0f0;
        border: none;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: #333;
    `;
    
    document.body.appendChild(toggleButton);
    
    // Load saved theme preference first
    const savedTheme = localStorage.getItem('dark-theme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        toggleButton.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('dark-theme', isDark.toString());
    });
}

// Add loading state management
function addLoadingState() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}

// Add error handling for images
function handleImageErrors() {
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function() {
            this.style.display = 'none';
            
            // Create a placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-photo-placeholder';
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            placeholder.style.cssText = `
                width: 200px;
                height: 200px;
                background: #f0f0f0;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: #ccc;
            `;
            
            this.parentNode.appendChild(placeholder);
        });
    }
}

// Performance optimization: Lazy load images
function addLazyLoading() {
    const images = document.querySelectorAll('img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize additional features
addLoadingState();
handleImageErrors();

function addShowMoreProjects() {
    const showMoreBtn = document.getElementById('show-more-projects');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const showText = showMoreBtn.querySelector('.show-text');
    const hideText = showMoreBtn.querySelector('.hide-text');
    
    if (!showMoreBtn) return; // Exit if button doesn't exist
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show hidden projects
            hiddenProjects.forEach(project => {
                project.classList.add('show');
            });
            
            // Update button text
            showText.style.display = 'none';
            hideText.style.display = 'inline';
        } else {
            // Hide projects
            hiddenProjects.forEach(project => {
                project.classList.remove('show');
            });
            
            // Update button text
            showText.style.display = 'inline';
            hideText.style.display = 'none';
        }
    });
}