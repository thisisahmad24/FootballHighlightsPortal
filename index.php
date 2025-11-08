<?php
// PHP Script: Read and Process Match Data and Handle Feedback Storage

// Define the path to the data and feedback files
$data_file = 'matches.json';
$feedback_file = 'feedbacks.txt';

// --- Helper function to extract YouTube ID from various URL formats ---
function getYoutubeIdFromUrl($url) {
    if (empty($url)) {
        return '';
    }
    
    $parts = parse_url($url);
    if (isset($parts['host']) && $parts['host'] == 'youtu.be') {
        return trim($parts['path'] ?? '', '/');
    }
    if (isset($parts['query'])) {
        parse_str($parts['query'], $query);
        if (isset($query['v'])) {
            return $query['v'];
        }
    }
    if (isset($parts['path'])) {
        $path_parts = explode('/', trim($parts['path'], '/'));
        if (in_array('embed', $path_parts) || in_array('v', $path_parts)) {
            return end($path_parts);
        }
    }
    return ''; 
}
// ---------------------------------------------------------------------

// --- HANDLE FEEDBACK SUBMISSION (AJAX POST REQUEST) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    // Read the JSON data sent from the client
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    $rating = filter_var($data['rating'] ?? 0, FILTER_VALIDATE_INT);
    $comment = trim(filter_var($data['comment'] ?? '', FILTER_SANITIZE_STRING));

    if ($rating >= 1 && $rating <= 5 && !empty($comment)) {
        $timestamp = date('Y-m-d H:i:s');
        // Format the feedback entry
        $entry = "--- Feedback Entry ---\n";
        $entry .= "Timestamp: {$timestamp}\n";
        $entry .= "Rating: {$rating} / 5 Stars\n";
        $entry .= "Comment: {$comment}\n\n";

        // Append to the feedback file
        if (file_put_contents($feedback_file, $entry, FILE_APPEND | LOCK_EX) !== false) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Feedback saved successfully.']);
            exit;
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to write to file.']);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid rating or comment data.']);
        exit;
    }
}
// ---------------------------------------------------------------------


// 2. Load the simulated database (JSON file)
$matches_data = @file_get_contents($data_file);
$matches = [];
$error = null;

if ($matches_data === false) {
    $error = "Error: Could not read $data_file file. Please ensure it exists.";
} else {
    $decoded_matches = json_decode($matches_data, true);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded_matches)) {
        $error = "Error decoding $data_file: " . (json_last_error_msg() ?: "Invalid JSON format.");
    } else {
        $matches = $decoded_matches;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Football Highlights Portal</title>
    <!-- Link the custom CSS stylesheet -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container header-content">
            <!-- Header Title -->
            <h1>Footy <span style="color: var(--accent);">Highlights</span> Central</h1>
            
            <!-- Navigation Links -->
            <nav class="main-nav">
                <a href="#" class="nav-link">Home</a>
                <a href="#match-grid" class="nav-link">Highlights</a>
                <a href="#about-us" class="nav-link">About</a>
                <a href="#contact-us" class="nav-link">Contact</a>
            </nav>

            <!-- Search Bar -->
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Search matches...">
            </div>

            <!-- Theme Toggle Button (Sleek professional design) -->
            <button id="theme-toggle" class="theme-toggle">
                <span class="icon-light">&#9728;</span> <!-- Sun -->
                <span class="icon-dark">&#9790;</span> <!-- Moon -->
            </button>
        </div>
    </header>

    <main class="container">
        <!-- Main Highlights Section -->
        <h2 class="section-title" id="highlights">Latest & Greatest Football Highlights</h2>

        <?php if ($error !== null): ?>
            <div id="message" class="error-message">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php elseif (empty($matches)): ?>
            <div id="message" class="info-message">No highlight matches available yet. Check back soon!</div>
        <?php else: ?>
            <section class="match-grid" id="match-grid">
                <?php foreach ($matches as $match): 
                    $title = htmlspecialchars($match['title'] ?? 'No Title');
                    $description = htmlspecialchars($match['description'] ?? 'No description available.');
                    $date = htmlspecialchars($match['date'] ?? 'N/A');
                    $video_url = htmlspecialchars($match['youtube_url'] ?? '');
                    $youtube_id = getYoutubeIdFromUrl($video_url);
                    $thumbnail_url = "https://img.youtube.com/vi/" . $youtube_id . "/mqdefault.jpg";
                ?>
                    <a href="<?php echo $video_url; ?>" target="_blank" class="match-card-link" data-search="<?php echo strtolower($title . ' ' . $description); ?>">
                        <div class="match-card">
                            <div class="thumbnail-wrapper">
                                <img 
                                    src="<?php echo $thumbnail_url; ?>" 
                                    alt="<?php echo $title; ?> Thumbnail" 
                                    loading="lazy"
                                    onerror="this.onerror=null;this.src='https://placehold.co/480x270/222/fff?text=Video+Unavailable';"
                                >
                            </div>
                            <div class="card-content">
                                <h2><?php echo $title; ?></h2>
                                <p><?php echo $description; ?></p>
                                <small>Date: <?php echo $date; ?></small>
                            </div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </section>
        <?php endif; ?>

        <!-- --- ABOUT US SECTION (New Placeholder) --- -->
        <section id="about-us" class="info-section">
            <h2 class="section-title">About Our Portal</h2>
            <p>We are dedicated to compiling the most memorable and exciting football highlights from around the globe. Our mission is to provide fans with quick access to the matches that made history, from classic World Cup moments to dramatic league deciders.</p>
            <p>Enjoy the best of football, all in one place!</p>
        </section>

        <!-- --- CONTACT US & FEEDBACK SECTION --- -->
        <section id="contact-feedback" class="info-section">
            <h2 class="section-title">Contact & Feedback</h2>

            <!-- Contact Section -->
            <div id="contact-us" class="contact-card">
                <h3>Get in Touch Directly</h3>
                <p>We value your suggestions and inquiries. Reach out to us via WhatsApp or Email.</p>
                <div class="contact-links">
                    
                    <!-- WhatsApp Link -->
                    <a href="https://wa.me/923114512268?text=Hello%2C%20I%20have%20a%20question%20about%20your%20highlights%20portal." 
                       target="_blank" 
                       class="contact-link whatsapp-link">
                        Message via WhatsApp
                    </a>
                    
                    <!-- Email Link -->
                    <a href="mailto:itisahmad07@gmail.com?subject=Inquiry%20from%20Highlights%20Portal" 
                       class="contact-link email-link">
                        Send Email (Opens Gmail)
                    </a>
                </div>
            </div>

            <!-- Feedback Form -->
            <div id="feedback-section" class="feedback-card">
                <h3>Rate Our Website and Share Comments</h3>
                <p>Rate us from 1 to 5 stars and let us know what you think!</p>
                
                <form id="feedback-form">
                    <!-- Star Rating Input -->
                    <div class="star-rating">
                        <?php for ($i = 5; $i >= 1; $i--): ?>
                            <input type="radio" id="star<?php echo $i; ?>" name="rating" value="<?php echo $i; ?>" required />
                            <label for="star<?php echo $i; ?>"></label>
                        <?php endfor; ?>
                    </div>
                    
                    <!-- Feedback Text Area -->
                    <textarea id="feedback-comment" name="comment" rows="4" placeholder="Your valuable feedback and suggestions..." required></textarea>
                    
                    <!-- Submission Button -->
                    <button type="submit" id="submit-feedback">Submit Feedback</button>
                    
                    <!-- Message Display -->
                    <div id="feedback-message" class="form-message"></div>
                </form>
            </div>
        </section>
        <!-- --- END CONTACT US & FEEDBACK SECTION --- -->
    </main>
    
    <footer>
        <div class="container footer-content">
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#about-us">Our Team</a>
                <a href="#contact-us">Support</a>
            </div>
            <p>&copy; <?php echo date("Y"); ?> Footy Highlights Central. | Built for Fans.</p>
        </div>
    </footer>
    
    <!-- This is the CORRECT place to link the JavaScript file -->
    <script src="scripts.js"></script>
</body>
</html>