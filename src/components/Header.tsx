'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Search } from 'lucide-react';

export default function Header({ onSearch }: { onSearch: (term: string) => void }) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('goalgate-theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    if (newMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('goalgate-theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('goalgate-theme', 'dark');
    }
  };

  return (
    <header>
      <div className="container header-content">
        <h1>Goal<span style={{ color: 'var(--accent)' }}>Gate</span></h1>
        
        <nav className="main-nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#highlights" className="nav-link">Highlights</a>
          <a href="#about-us" className="nav-link">About</a>
          <a href="#contact-us" className="nav-link">Contact</a>
        </nav>

        <div className="search-container">
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search matches..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {isLightMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
