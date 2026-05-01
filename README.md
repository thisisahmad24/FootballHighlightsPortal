# ⚽ GoalGate: The Ultimate Footy Hub 🏆

A simple, dynamic web portal built using **PHP**, **JavaScript**, and **CSS** to display the latest and greatest football highlights from across the globe.  
The portal includes features for content filtering, aesthetic customization, and user feedback submission.

---

## ✨ Features

This project combines server-side logic (**PHP**) for content rendering and client-side logic (**JavaScript**) for interactivity:

- **Dynamic Match Card Generation (PHP)**  
  Reads match data from the `matches.json` file and dynamically generates professional, structured highlight cards.

- **Live Search (JavaScript)**  
  Allows users to instantly filter highlight cards based on match title or description as they type.

- **Theme Toggle (JavaScript)**  
  Users can switch between a sleek **Dark Mode** (default) and a bright **Light Mode**.  
  The preference is saved locally using `localStorage`.

- **User Feedback System (PHP & JavaScript)**  
  Users can submit a star rating and comment via an **AJAX** request, which the PHP handler processes and saves to `feedbacks.txt` on the server.

- **Responsive Design**  
  Optimized layout for seamless viewing on **mobile**, **tablet**, and **desktop** devices.

---

## 🛠️ Project Structure

This project requires five core files to function correctly, all residing in the same directory:

```
/FootyHighlightsPortal
├── index.php             <-- Core HTML structure, PHP logic, and AJAX handling.
├── scripts.js            <-- Client-side JavaScript (Search, Theme Toggle, Feedback AJAX).
├── styles.css            <-- All custom CSS styles and responsive design rules.
├── matches.json          <-- The "database" containing highlight match details.
└── feedbacks.txt         <-- Stores user ratings and comments submitted via the form.
```

---

## 🚀 Getting Started

Since this project uses PHP to handle content rendering and feedback submission,  
it requires a **local server environment** to run properly.

### 🔧 Prerequisites

You must have a development environment installed that supports PHP, such as:

- **XAMPP** (Windows, macOS, Linux)  
- **MAMP** (macOS)  
- **Laragon** (Windows)  
- A configured **Docker container** with a PHP server.

---

### 🧩 Installation and Setup

1. **Download Files**  
   Place all five project files (`index.php`, `scripts.js`, `styles.css`, `matches.json`, and `feedbacks.txt`) into a single folder (e.g., `FootyHighlightsPortal`).

2. **Place in Web Root**  
   Move the `FootballHighlightsPortal` folder into your local server's web root directory  
   (e.g., `htdocs` for XAMPP or `www` for Laragon).

3. **Start Server**  
   Ensure your local server (**Apache/PHP**) is running.

4. **Access**  
   Open your web browser and navigate to:  
   ```
   http://localhost/FootballHighlightsPortal/index.php
   ```

---

## 📖 Usage Instructions

- **Browsing Highlights**  
  Scroll down to view the match cards. Each card links directly to the highlight video on YouTube.

- **Live Search**  
  Use the “Search matches...” input field in the header to filter results instantly by the match title or description.

- **Theme Switch**  
  Click the 🌙 / ☀️ icon in the header to toggle between **Dark Mode** and **Light Mode**.

- **Submit Feedback**  
  Fill out the **Star Rating** and **Comment** in the *Contact & Feedback* section.  
  Upon submission, the JavaScript sends the data to `index.php`, which saves it to `feedbacks.txt`.

---

## ⚙️ Customization

### Adding New Highlights

To add new matches to the portal, edit the `matches.json` file.  
Each highlight is an object in the JSON array:

```json
{
  "title": "New Match Title Here",
  "description": "A brief description of the action.",
  "date": "Month Day, Year",
  "youtube_url": "YOUR_YOUTUBE_LINK_HERE"
}
```

---

**Enjoy watching and managing your favorite football highlights in one place! ⚽🔥**
