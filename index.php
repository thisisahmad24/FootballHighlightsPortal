<?php
// PHP Script: Read and Process Match Data

// 1. Define the path to the data source
$data_file = 'matches.json';

// 2. Load the simulated database (JSON file)
$matches_data = file_get_contents($data_file);

// Initialize variables
$matches = [];
$error = null;

// Check if file loading was successful
if ($matches_data === false) {
    $error = "Error: Could not read $data_file file. Ensure it exists in the root directory.";
} else {
    // Decode the JSON data into a PHP associative array
    $decoded_matches = json_decode($matches_data, true);
    
    // Check for JSON decode errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        $error = "Error decoding $data_file: " . json_last_error_msg();
    } elseif (!is_array($decoded_matches)) {
        $error = "Data file content is not a valid JSON array.";
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
    <title>Best Football Highlights Portal</title>
    <!-- Link the custom CSS stylesheet -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <!-- Using a span for green accent color in the title -->
            <h1>Best Football Highlights <span style="color: #238636;">Portal</span></h1>
        </div>
    </header>

    <main class="container">
        <?php if ($error !== null): ?>
            <!-- Display PHP errors in a visible red box -->
            <div id="message" style="color: #ff4d4d; background-color: #301717; border: 1px solid #ff4d4d; padding: 15px; border-radius: 8px;">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php elseif (empty($matches)): ?>
            <!-- Message if the data is empty but valid -->
            <div id="message">No highlight matches available yet. Check back soon!</div>
        <?php else: ?>
            <!-- Start of the Match Grid -->
            <section class="match-grid">
                <?php foreach ($matches as $match): 
                    // Sanitize all data output for security
                    $title = htmlspecialchars($match['title'] ?? 'No Title');
                    $description = htmlspecialchars($match['description'] ?? 'No description available.');
                    $date = htmlspecialchars($match['date'] ?? 'N/A');
                    $youtube_id = htmlspecialchars($match['youtube_id'] ?? '');

                    // CRUCIAL: Constructing the YouTube Embed URL using the privacy-enhanced domain
                    $embed_url = "https://www.youtube-nocookie.com/embed/" . $youtube_id . "?rel=0&showinfo=0&controls=1";
                ?>
                    <div class="match-card">
                        <div class="video-wrapper">
                            
                            <!-- 
                                Iframe setup for lazy loading:
                                1. src="" prevents immediate loading.
                                2. data-src holds the actual URL (scripts.js moves it to src when visible).
                            -->
                            <iframe 
                                src="" 
                                data-src="<?php echo $embed_url; ?>" 
                                title="<?php echo $title; ?>" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="card-content">
                            <h2><?php echo $title; ?></h2>
                            <p><?php echo $description; ?></p>
                            <small>Date: <?php echo $date; ?></small>
                        </div>
                    </div>
                <?php endforeach; ?>
            </section>
            <!-- End of the Match Grid -->
        <?php endif; ?>
    </main>
    
    <!-- Link the JavaScript file for lazy loading -->
    <script src="scripts.js"></script>
</body>
</html>