'use client';

import { useState } from 'react';
import { useContactPortfolio } from '../../../../lib/hooks/use-portfolio';

export default function PortfolioContactForm({
  username,
}: {
  username: string;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const contact = useContactPortfolio();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    await contact.mutateAsync({ username, name, email, message });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  if (sent) {
    return (
      <div
        className="p-5 rounded-lg text-center"
        style={{
          backgroundColor:
            'color-mix(in srgb, var(--portfolio-accent) 6%, var(--portfolio-bg))',
          border:
            '1px solid color-mix(in srgb, var(--portfolio-accent) 20%, transparent)',
        }}
      >
        <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--portfolio-accent)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-semibold text-sm" style={{ color: 'var(--portfolio-text)' }}>
          Message sent successfully!
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-2 text-xs underline"
          style={{ color: 'var(--portfolio-primary)' }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
          style={{
            color: 'var(--portfolio-text)',
            backgroundColor:
              'color-mix(in srgb, var(--portfolio-gray) 6%, var(--portfolio-bg))',
            border:
              '1px solid color-mix(in srgb, var(--portfolio-gray) 20%, transparent)',
          }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
          style={{
            color: 'var(--portfolio-text)',
            backgroundColor:
              'color-mix(in srgb, var(--portfolio-gray) 6%, var(--portfolio-bg))',
            border:
              '1px solid color-mix(in srgb, var(--portfolio-gray) 20%, transparent)',
          }}
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message..."
        required
        rows={4}
        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none transition-colors"
        style={{
          color: 'var(--portfolio-text)',
          backgroundColor:
            'color-mix(in srgb, var(--portfolio-gray) 6%, var(--portfolio-bg))',
          border:
            '1px solid color-mix(in srgb, var(--portfolio-gray) 20%, transparent)',
        }}
      />
      <button
        type="submit"
        disabled={contact.isPending}
        className="px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
        style={{ backgroundColor: 'var(--portfolio-primary)' }}
      >
        {contact.isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
