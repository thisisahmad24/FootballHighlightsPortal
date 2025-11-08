// JavaScript for the Football Highlights Portal

document.addEventListener('DOMContentLoaded', () => {
    // Console log to confirm the script has loaded successfully
    console.log('Football Highlights Portal scripts loaded. Initializing lazy loading...');

    // Function to set up the IntersectionObserver for lazy loading
    const lazyLoadVideos = () => {
        // Select all iframes that will display videos
        const iframes = document.querySelectorAll('.video-wrapper iframe');
        
        // Create a new Intersection Observer instance
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Check if the element is currently visible in the viewport
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    
                    // Get the actual URL from the placeholder 'data-src' attribute
                    const src = iframe.getAttribute('data-src');
                    
                    if (src) {
                        // Move the URL from data-src to the standard src attribute to trigger loading
                        iframe.setAttribute('src', src);
                    }
                    
                    // Stop observing this iframe, as it has now loaded
                    observer.unobserve(iframe);
                }
            });
        }, {
            // Configuration options for the observer
            // rootMargin: '0px 0px -25% 0px' means the iframe will load when it is 25% away from the bottom of the viewport
            rootMargin: '0px 0px -25% 0px' 
        });

        // Loop through all iframes and start observing them
        iframes.forEach(iframe => {
            observer.observe(iframe);
        });
    };

    // Only run the lazy loading function if the IntersectionObserver is supported (modern browsers)
    if ('IntersectionObserver' in window) {
        lazyLoadVideos();
    } else {
        // Fallback for older browsers: load all videos immediately
        document.querySelectorAll('.video-wrapper iframe').forEach(iframe => {
            const src = iframe.getAttribute('data-src');
            if (src) {
                iframe.setAttribute('src', src);
            }
        });
        console.warn('IntersectionObserver not supported. Videos loaded immediately.');
    }
});