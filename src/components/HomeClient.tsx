'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LiveTicker from '@/components/LiveTicker';
import MatchCard from '@/components/MatchCard';
import Feedback from '@/components/Feedback';

export default function HomeClient({ legacyMatches }: { legacyMatches: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [matches, setMatches] = useState(legacyMatches);

  useEffect(() => {
    async function fetchHighlights() {
      try {
        const res = await fetch('/api/highlights');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.length > 0) {
          const mapped = data.map((item: any, index: number) => ({
            id: `api-${index}`,
            title: item.title,
            description: `Watch the latest highlights from ${item.competition?.name || 'Top League'}.`,
            category: item.competition?.name || 'International',
            date: new Date(item.date).toLocaleDateString(),
            youtube_url: item.videos?.[0]?.url || '',
            trending: index < 3
          })).filter((m: any) => m.youtube_url !== '');
          
          setMatches([...mapped, ...legacyMatches]);
        }
      } catch (err) {
        console.error('Failed to fetch highlights:', err);
      }
    }

    fetchHighlights();
  }, [legacyMatches]);

  const filteredMatches = matches.filter(match => 
    match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Header onSearch={setSearchTerm} />
      <LiveTicker />

      <div className="container">
        <h2 className="section-title" id="highlights">
          Latest <span className="highlight">GoalGate</span> Highlights
        </h2>

        <section className="match-grid">
          {filteredMatches.length > 0 ? (
            filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem', color: 'var(--text-dim)' }}>
              No matches found matching your search.
            </div>
          )}
        </section>

        {/* About Section */}
        <section id="about-us" className="info-section">
          <h2 className="section-title">About GoalGate</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'var(--text-dim)' }}>
            <p>Welcome to <strong>GoalGate</strong>, your ultimate destination for the most <strong>electrifying football moments</strong>. Our mission is simple: to save you time and deliver pure footballing joy by curating highlights from across the global game, making sure you never miss a goal, save, or dramatic turn of events.</p>
            <p style={{ marginTop: '1.5rem' }}>We diligently cover a wide spectrum of the beautiful game, including major international tournaments, the top European leagues, and historic club competitions. Our library is constantly growing to ensure coverage of both recent matches and classic historical moments.</p>
          </div>
        </section>

        {/* Contact & Feedback Section */}
        <section id="contact-feedback" className="info-section">
          <h2 className="section-title">Connect With <span className="highlight">GoalGate</span></h2>
          <div className="contact-feedback-grid">
            <div id="contact-us" className="contact-card">
              <h3>Direct Support</h3>
              <p>We value your suggestions and inquiries. Reach out to us via WhatsApp or Email.</p>
              <div className="contact-links">
                <a href="https://wa.me/923114512268?text=Hello%2C%20I%20have%20a%20question%20about%20GoalGate." 
                   target="_blank" rel="noopener noreferrer" className="contact-link whatsapp-link">
                  Message via WhatsApp
                </a>
                <a href="mailto:itisahmad07@gmail.com?subject=Inquiry%20from%20GoalGate" 
                   className="contact-link email-link">
                  Send Email (Direct)
                </a>
              </div>
            </div>
            <Feedback />
          </div>
        </section>
      </div>

      <footer>
        <div className="container footer-content">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#about-us">Our Team</a>
            <a href="#contact-us">Support</a>
          </div>
          <p>&copy; {new Date().getFullYear()} GoalGate | The Ultimate Footy Hub.</p>
        </div>
      </footer>
    </main>
  );
}
