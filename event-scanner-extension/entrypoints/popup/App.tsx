import React, { useState, useEffect } from 'react';
import { EmailInput } from '../../components/EmailInput';
import { EventCard } from '../../components/EventCard';
import type { EventData } from '../../utils/eventScanner';

function App() {
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  // Load email from storage on mount
  useEffect(() => {
    chrome.storage.local.get(['userEmail'], (result) => {
      if (result.userEmail) {
        setEmail(result.userEmail);
      }
    });
  }, []);

  // Save email to storage when it changes
  useEffect(() => {
    if (email) {
      chrome.storage.local.set({ userEmail: email });
    }
  }, [email]);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setEvents([]);
    setScanned(false);

    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        setError('No active tab found');
        setLoading(false);
        return;
      }

      // Send message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'SCAN_PAGE' }, (response) => {
        if (chrome.runtime.lastError) {
          setError('Failed to connect to page. Please refresh and try again.');
          setLoading(false);
          return;
        }

        if (response?.success) {
          setEvents(response.events || []);
          setScanned(true);
        } else {
          setError(response?.error || 'Failed to scan page');
        }

        setLoading(false);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: '400px',
        minHeight: '300px',
        maxHeight: '600px',
        padding: '16px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h1
        style={{
          margin: '0 0 16px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#1976d2',
        }}
      >
        Event Scanner
      </h1>

      <EmailInput value={email} onChange={setEmail} />

      <button
        onClick={handleScan}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px 16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '15px',
          fontWeight: '500',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '16px',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Scanning...' : 'Scan Page'}
      </button>

      {error && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      {scanned && events.length === 0 && (
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            color: '#666',
            fontSize: '14px',
          }}
        >
          No events detected on this page
        </div>
      )}

      {events.length > 0 && (
        <div>
          <h2
            style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            Found {events.length} event{events.length !== 1 ? 's' : ''}
          </h2>
          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {events.map((event, index) => (
              <EventCard key={index} event={event} email={email} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
