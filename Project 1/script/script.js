// JavaScript for ALALI Concepts Website

document.addEventListener('DOMContentLoaded', function() {
    // Add a scroll event listener to change header appearance
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });
    
    // Add animation to intro section when scrolling
    const introSection = document.querySelector('.intro');
    const introImage = document.querySelector('.intro-image');
    const introText = document.querySelector('.intro-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                introImage.style.opacity = 1;
                introImage.style.transform = 'translateX(0)';
                introText.style.opacity = 1;
                introText.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(introSection);
    
    // Initialize element styles for animation
    introImage.style.opacity = 0;
    introImage.style.transform = 'translateX(50px)';
    introImage.style.transition = 'all 0.8s ease-out';
    
    introText.style.opacity = 0;
    introText.style.transform = 'translateX(-50px)';
    introText.style.transition = 'all 0.8s ease-out';
    
    // Add click event to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Simple 404 page redirection for broken links
    function checkPageExists() {
        // Get the current page path
        const currentPath = window.location.pathname;
        const pageName = currentPath.split('/').pop();
        
        // List of valid pages on the website
        const validPages = [
            'index.html',
            'about_us.html',
            'service.html',
            'contact_us.html',
            '404.html'
        ];
        
        // If we're not on a valid page and not on the root/index, redirect to 404
        if (pageName && !validPages.includes(pageName) && pageName !== '') {
            window.location.href = '../content/404.html';
        }
    }
    
    // Check if current page exists
    checkPageExists();
    
    // Console welcome message
    console.log('Welcome to ALALI Concepts! Innovative solutions for tomorrow\'s challenges.');
});