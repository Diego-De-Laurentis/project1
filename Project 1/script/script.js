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
    
    // Cookie functions
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    function deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    
    // Cookie consent banner
    function checkCookieConsent() {
        const cookieConsent = getCookie('cookie_consent');
        
        if (!cookieConsent) {
            // Create cookie consent banner
            const cookieBanner = document.createElement('div');
            cookieBanner.id = 'cookie-banner';
            cookieBanner.innerHTML = `
                <div class="cookie-content">
                    <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                    <div class="cookie-buttons">
                        <button id="accept-cookies" class="btn">Accept</button>
                        <button id="reject-cookies" class="btn btn-secondary">Reject</button>
                    </div>
                </div>
            `;
            
            // Add styles for the cookie banner
            const style = document.createElement('style');
            style.textContent = `
                #cookie-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #333;
                    color: white;
                    padding: 1rem;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
                    z-index: 1000;
                }
                .cookie-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .cookie-content p {
                    margin: 0 1rem 1rem 0;
                    flex: 1;
                }
                .cookie-buttons {
                    display: flex;
                    gap: 1rem;
                }
                .btn-secondary {
                    background: #666 !important;
                }
                @media (max-width: 768px) {
                    .cookie-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .cookie-content p {
                        margin: 0 0 1rem 0;
                    }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(cookieBanner);
            
            // Add event listeners to buttons
            document.getElementById('accept-cookies').addEventListener('click', function() {
                setCookie('cookie_consent', 'accepted', 365);
                document.getElementById('cookie-banner').style.display = 'none';
                // Set additional cookies if needed
                setCookie('analytics_consent', 'accepted', 365);
            });
            
            document.getElementById('reject-cookies').addEventListener('click', function() {
                setCookie('cookie_consent', 'rejected', 30);
                document.getElementById('cookie-banner').style.display = 'none';
                // Make sure to not set any non-essential cookies
                setCookie('analytics_consent', 'rejected', 30);
            });
        }
    }
    
    // Check and remember user preferences
    function rememberUserPreferences() {
        const preferredLanguage = getCookie('preferred_language');
        const fontSizePreference = getCookie('font_size');
        
        // Apply preferences if they exist
        if (preferredLanguage) {
            // You could implement language switching logic here
            console.log('User language preference:', preferredLanguage);
        }
        
        if (fontSizePreference) {
            document.body.style.fontSize = fontSizePreference;
        }
    }
    
    // Example: Set user preference
    function setUserPreference(name, value, days = 365) {
        if (getCookie('cookie_consent') === 'accepted') {
            setCookie(name, value, days);
            return true;
        }
        return false;
    }
    
    // Initialize cookie functionality
    checkCookieConsent();
    rememberUserPreferences();
    
    // Example usage: Set a user preference (could be triggered by a UI element)
    // setUserPreference('preferred_language', 'en');
    // setUserPreference('font_size', '18px');
    
    // Console welcome message
    console.log('Welcome to ALALI Concepts! Innovative solutions for tomorrow\'s challenges.');
});

