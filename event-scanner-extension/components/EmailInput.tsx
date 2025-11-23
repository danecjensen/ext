import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function EmailInput({ value, onChange }: EmailInputProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor="email"
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        Your Email *
      </label>
      <input
        id="email"
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="email@example.com"
        required
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
