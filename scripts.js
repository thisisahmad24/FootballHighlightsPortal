/**
 * GoalGate: The Ultimate Footy Hub
 * Client-side Logic (Search, Theme Toggle, Feedback)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('goalgate-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('goalgate-theme', currentTheme);
        
        // Add a nice scale effect on click
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => themeToggle.style.transform = 'scale(1)', 100);
    });

    // --- Live Search Logic ---
    const searchInput = document.getElementById('search-input');
    const matchCards = document.querySelectorAll('.match-card-link');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        matchCards.forEach(card => {
            const searchData = card.getAttribute('data-search');
            // Also search within the category badge text
            const categoryText = card.querySelector('.category-badge').textContent.toLowerCase();
            
            if (searchData.includes(searchTerm) || categoryText.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // --- AJAX Feedback Submission ---
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackMessage = document.getElementById('feedback-message');
    const submitBtn = document.getElementById('submit-feedback');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // UI Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        feedbackMessage.textContent = '';

        const formData = new FormData(feedbackForm);
        const data = {
            rating: formData.get('rating'),
            comment: formData.get('comment')
        };

        fetch('index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                feedbackMessage.style.color = '#00f2ff';
                feedbackMessage.textContent = 'Thank you! Your feedback has been received.';
                feedbackForm.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        })
        .catch(error => {
            feedbackMessage.style.color = '#ff4444';
            feedbackMessage.textContent = 'Error: ' + error.message;
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Feedback';
            setTimeout(() => {
                feedbackMessage.textContent = '';
            }, 5000);
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.match-card, .info-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});