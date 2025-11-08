// JavaScript for the Football Highlights Portal (Theme Toggle, Search, and Text File Feedback)

document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const matchGrid = document.getElementById('match-grid');
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackMessage = document.getElementById('feedback-message');
    const matchCards = matchGrid ? Array.from(matchGrid.querySelectorAll('.match-card-link')) : [];
    
    // --- 1. UTILITY FUNCTIONS ---
    
    // Function to display messages in the feedback section
    const showMessage = (message, type) => {
        feedbackMessage.textContent = message;
        if (type === 'success') {
            feedbackMessage.style.color = '#25D366'; 
        } else if (type === 'error') {
            feedbackMessage.style.color = '#ff4d4d';
        } else {
            feedbackMessage.style.color = 'var(--text-primary)';
        }
    };

    // --- 2. THEME TOGGLE LOGIC ---
    
    const applyTheme = (theme) => {
        if (theme === 'light-mode') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    applyTheme(savedTheme);

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'dark-mode');
                applyTheme('dark-mode');
            } else {
                localStorage.setItem('theme', 'light-mode');
                applyTheme('light-mode');
            }
        });
    }

    // --- 3. LIVE SEARCH LOGIC ---
    
    if (searchInput && matchCards.length > 0) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            matchCards.forEach(cardLink => {
                // Use the data-search attribute for optimized searching
                const textToSearch = cardLink.getAttribute('data-search');
                
                const cardIsVisible = textToSearch.includes(searchTerm);

                // Setting display to 'block'/'none' for filtering
                cardLink.style.display = cardIsVisible ? 'block' : 'none';
            });
        });
    }


    // --- 4. FEEDBACK SUBMISSION (AJAX to PHP Handler) ---

    const submitFeedback = async (rating, comment) => {
        showMessage("Submitting...", 'neutral');

        try {
            const response = await fetch('index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Header to signal PHP that this is an AJAX request
                    'X-Requested-With': 'XMLHttpRequest' 
                },
                body: JSON.stringify({ rating, comment })
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message, 'success');
                // Clear form fields
                feedbackForm.reset();
            } else {
                showMessage(result.message || "An unknown error occurred during submission.", 'error');
            }

        } catch (error) {
            console.error("Fetch error:", error);
            showMessage("Network error: Could not reach the server.", 'error');
        }
    };
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedRating = feedbackForm.querySelector('input[name="rating"]:checked');
            const comment = document.getElementById('feedback-comment').value;

            if (!selectedRating) {
                showMessage("Please select a star rating (1-5) before submitting.", 'error');
                return;
            }

            if (comment.trim().length < 5) {
                 showMessage("Please provide a comment longer than 5 characters.", 'error');
                 return;
            }

            const ratingValue = parseInt(selectedRating.value, 10);
            
            submitFeedback(ratingValue, comment.trim());
        });
    }
});