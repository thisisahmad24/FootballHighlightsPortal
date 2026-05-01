'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setStatus({ type: 'error', message: 'Please select a star rating.' });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const supabase = getSupabase();
      if (!supabase) {
        throw new Error('Supabase is not configured. Please add your credentials.');
      }

      const { error } = await supabase
        .from('feedbacks')
        .insert([{ rating, comment }]);

      if (error) throw error;

      setStatus({ type: 'success', message: 'Thank you! Your feedback helps us grow.' });
      setRating(0);
      setComment('');
    } catch (error: any) {
      console.error('Feedback error:', error);
      setStatus({ type: 'error', message: 'Failed to send feedback. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="feedback-section" className="feedback-card">
      <h3>Rate Your Experience</h3>
      <form id="feedback-form" onSubmit={handleSubmit}>
        <div className="star-rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star}>
              <input 
                type="radio" 
                id={`star${star}`} 
                name="rating" 
                value={star} 
                checked={rating === star}
                onChange={() => setRating(star)}
              />
              <label 
                htmlFor={`star${star}`}
                style={{ color: rating >= star ? 'var(--star-gold)' : undefined }}
              >
                ★
              </label>
            </div>
          ))}
        </div>
        <textarea 
          id="feedback-comment" 
          name="comment" 
          rows={4} 
          placeholder="Your valuable feedback helps us grow..." 
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" id="submit-feedback" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Feedback'}
        </button>
        {status.message && (
          <div className={`form-message ${status.type}`} style={{ color: status.type === 'success' ? 'var(--accent)' : '#ff4444', marginTop: '1rem', textAlign: 'center' }}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
