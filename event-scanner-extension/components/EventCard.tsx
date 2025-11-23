import React, { useState } from 'react';
import type { EventData } from '../utils/eventScanner';
import { postEvent } from '../utils/api';

interface EventCardProps {
  event: EventData;
  email: string;
}

export function EventCard({ event, email }: EventCardProps) {
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePost = async () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }

    setPosting(true);
    setError(null);

    const result = await postEvent(email, event);

    if (result.success) {
      setPosted(true);
    } else {
      setError(result.error || 'Failed to post event');
    }

    setPosting(false);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        backgroundColor: '#fff',
      }}
    >
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        {event.title}
      </h3>

      {event.startDate && (
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
          📅 {formatDate(event.startDate)}
          {event.endDate &&
            event.endDate !== event.startDate &&
            ` - ${formatDate(event.endDate)}`}
        </div>
      )}

      {event.location && (
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
          📍 {event.location}
        </div>
      )}

      {event.description && (
        <p
          style={{
            fontSize: '13px',
            color: '#555',
            margin: '8px 0',
            lineHeight: '1.4',
          }}
        >
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </p>
      )}

      <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px' }}>
        Source:{' '}
        {event.sourceType === 'schema' ? 'Schema.org' : 'Parsed from page'}
      </div>

      <button
        onClick={handlePost}
        disabled={posting || posted}
        style={{
          width: '100%',
          padding: '8px 12px',
          backgroundColor: posted ? '#4caf50' : '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: posted ? 'default' : 'pointer',
          opacity: posting || posted ? 0.7 : 1,
        }}
      >
        {posting ? 'Posting...' : posted ? 'Posted ✓' : 'Post Event'}
      </button>

      {error && (
        <div
          style={{
            marginTop: '8px',
            padding: '8px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
