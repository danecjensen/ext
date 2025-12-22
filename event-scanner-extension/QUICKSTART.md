# Quickstart Guide

Get the Event Scanner extension running in Chrome in under 2 minutes.

## Installation

### 1. Build the Extension

```bash
cd event-scanner-extension
pnpm install
pnpm build
```

### 2. Load in Chrome

1. Open Chrome and go to: `chrome://extensions/`
2. Toggle **"Developer mode"** ON (top-right corner)
3. Click **"Load unpacked"**
4. Navigate to and select: `event-scanner-extension/.output/chrome-mv3`

✅ Done! The extension icon should appear in your Chrome toolbar.

## Quick Test

1. Visit any event website (e.g., Eventbrite, Meetup)
2. Click the Event Scanner extension icon
3. Enter your email
4. Click **"Scan Page"**
5. View detected events and click **"Post Event"** to send to API

## Development Mode

For live development with hot reload:

```bash
pnpm dev
```

Then load the `.output/chrome-mv3` directory in Chrome. Changes auto-reload.

---

**Need help?** See [INSTALLATION.md](INSTALLATION.md) for detailed instructions and troubleshooting.
