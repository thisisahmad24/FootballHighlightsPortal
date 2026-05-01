'use client';

import { motion } from 'framer-motion';

interface Match {
  id: string;
  title: string;
  description: string;
  category: string;
  trending?: boolean;
  date: string;
  youtube_url: string;
}

export default function MatchCard({ match }: { match: Match }) {
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const thumbnailId = getYoutubeId(match.youtube_url);
  const thumbnailUrl = `https://img.youtube.com/vi/${thumbnailId}/mqdefault.jpg`;

  return (
    <motion.a 
      href={match.youtube_url} 
      target="_blank" 
      className="match-card-link"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="match-card">
        <div className="thumbnail-wrapper">
          <img 
            src={thumbnailUrl} 
            alt={match.title} 
            loading="lazy"
          />
        </div>
        <div className="card-content">
          <div className="badge-container">
            <small className="category-badge">{match.category}</small>
            {match.trending && <small className="trending-badge">🔥 Trending</small>}
          </div>
          <h2>{match.title}</h2>
          <p>{match.description}</p>
          <div className="card-footer">
            <span className="match-date">{match.date}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
