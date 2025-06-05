document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // DOM Elements
    const homeSection = document.getElementById('home');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryButtonsContainer = document.querySelector('.category-buttons');
    const contentSections = document.querySelectorAll('.content-section');
    
    console.log('Found buttons:', categoryButtons.length);
    console.log('Found sections:', contentSections.length);
    
    // Initialize the site in dark mode
    document.body.classList.add('dark-mode');
    
    // Function to open a section
    function openSection(sectionId) {
        console.log('Opening section:', sectionId);
        
        // Hide home section
        homeSection.classList.add('minimized');
        
        // IMPORTANT: Move the category buttons container to the body
        // This ensures it's not hidden when the home section is minimized
        if (categoryButtonsContainer.parentElement === homeSection) {
            document.body.appendChild(categoryButtonsContainer);
        }
        
        // Move category buttons to bottom and minimize them
        categoryButtonsContainer.classList.add('fixed-bottom');
        
        // Update button states
        categoryButtons.forEach(btn => {
            btn.classList.add('minimized');
            
            // Highlight active button
            const btnCategory = btn.getAttribute('data-category');
            if (btnCategory === sectionId) {
                btn.classList.add('active');
                console.log('Setting button active:', btnCategory);
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Hide all sections first
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            console.log('Found target section, activating');
            // Use a small timeout to ensure CSS transitions work properly
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50);
        } else {
            console.error('Target section not found:', sectionId);
        }
    }
    
    // Function to return to home
    function goToHome() {
        console.log('Going back to home');
        
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('minimized');
        });
        
        // Move buttons back to home section if they were moved
        categoryButtonsContainer.classList.remove('fixed-bottom');
        if (categoryButtonsContainer.parentElement !== homeSection) {
            homeSection.appendChild(categoryButtonsContainer);
        }
        
        // Show home section
        setTimeout(() => {
            homeSection.classList.remove('minimized');
        }, 50);
    }
    
    // Event listeners for category buttons - using more explicit approach
    categoryButtons.forEach(button => {
        console.log('Adding click listener to button:', button.getAttribute('data-category'));
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.getAttribute('data-category');
            console.log('Button clicked:', category);
            
            // If we're already in a section and clicking a different button,
            // just switch to that section without going back to home
            const activeSection = document.querySelector('.content-section.active');
            
            if (activeSection) {
                console.log('Active section found:', activeSection.id);
                
                if (activeSection.id !== category) {
                    console.log('Switching to different section');
                    openSection(category);
                } else {
                    console.log('Clicked active section button, going home');
                    goToHome();
                }
            } else {
                console.log('No active section, opening new section');
                openSection(category);
            }
        });
    });
    
    // // Form submission (prevent default for demo)
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();

    //         // Optional: Show loading state
    //         const submitBtn = contactForm.querySelector('.submit-btn');
    //         submitBtn.textContent = 'Sending...';
    //         submitBtn.disabled = true;

    //         emailjs.sendForm('service_o3395zd', 'template_1b3hlkn', this)
    //           .then(function() {
    //             alert('Message sent successfully!');
    //             contactForm.reset();
    //             submitBtn.textContent = 'Send Message';
    //             submitBtn.disabled = false;
    //           }, function(error) {
    //             alert('Failed to send message. Please try again.');
    //             submitBtn.textContent = 'Send Message';
    //             submitBtn.disabled = false;
    //           });
    //     });
    // }
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add typing effect to intro text
    const introText = document.querySelector('.intro-content p');
    if (introText) {
        const originalText = introText.textContent;
        introText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                introText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to go back to home
        if (e.key === 'Escape') {
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                goToHome();
            }
        }
        
        // Arrow keys to navigate between sections
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            const currentId = activeSection.id;
            const categories = ['skills', 'experience', 'projects', 'contact'];
            const currentIndex = categories.indexOf(currentId);
            
            if (currentIndex !== -1) {
                if (e.key === 'ArrowRight' && currentIndex < categories.length - 1) {
                    openSection(categories[currentIndex + 1]);
                } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    openSection(categories[currentIndex - 1]);
                }
            }
        }
    });
    
    // Add theme toggle functionality
    const createThemeToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('theme-toggle');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Start with sun icon since we're in dark mode
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '20px';
        toggleBtn.style.right = '20px';
        toggleBtn.style.zIndex = '100';
        toggleBtn.style.background = '#3a3f4b';
        toggleBtn.style.color = '#f8f9fa';
        toggleBtn.style.border = 'none';
        toggleBtn.style.borderRadius = '50%';
        toggleBtn.style.width = '40px';
        toggleBtn.style.height = '40px';
        toggleBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        toggleBtn.style.cursor = 'pointer';
        
        document.body.appendChild(toggleBtn);
        
        // Start in dark mode
        let darkMode = true;
        
        toggleBtn.addEventListener('click', () => {
            darkMode = !darkMode;
            
            if (darkMode) {
                document.body.classList.add('dark-mode');
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                toggleBtn.style.background = '#3a3f4b';
                toggleBtn.style.color = '#f8f9fa';
            } else {
                document.body.classList.remove('dark-mode');
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                toggleBtn.style.background = 'white';
                toggleBtn.style.color = '#212529';
            }
        });
    };
    
    createThemeToggle();
    
    // Add loading animation
    const createLoader = () => {
        const loader = document.createElement('div');
        loader.classList.add('page-loader');
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';
        loader.style.background = '#121212'; // Dark background for loader
        loader.style.display = 'flex';
        loader.style.justifyContent = 'center';
        loader.style.alignItems = 'center';
        loader.style.zIndex = '9999';
        loader.style.transition = 'opacity 0.5s ease';
        
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.border = '5px solid #2a2a2a';
        spinner.style.borderTop = '5px solid #4a6cf7';
        spinner.style.borderRadius = '50%';
        spinner.style.animation = 'spin 1s linear infinite';
        
        // Add keyframes for spinner
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        loader.appendChild(spinner);
        document.body.appendChild(loader);
        
        // Check if page is already loaded
        if (document.readyState === 'complete') {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            // Hide loader after page is loaded
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 500);
            });
        }
    };
    
    createLoader();
    
    // Add double-click on home to go back to home
    document.addEventListener('dblclick', function(e) {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            goToHome();
        }
    });
});
