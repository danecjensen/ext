# Installation & Testing Guide

## Quick Start

The extension has been successfully built! Follow these steps to install and test it in Chrome.

## Installation Steps

### 1. Load the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in the top-right corner)
4. Click **"Load unpacked"**
5. Navigate to and select the `.output/chrome-mv3` directory:
   ```
   /home/user/event-scanner-extension/.output/chrome-mv3
   ```
6. The Event Scanner extension should now appear in your extensions list

### 2. Pin the Extension (Optional)

1. Click the puzzle piece icon (Extensions) in Chrome's toolbar
2. Find "Event Scanner" in the list
3. Click the pin icon to keep it visible in your toolbar

## Testing the Extension

### Test on a Page with Schema.org Events

1. Visit a website with event Schema.org markup, such as:
   - https://www.eventbrite.com/ (search for any event)
   - https://www.meetup.com/ (any event page)
   - Any page with structured event data

2. Click the Event Scanner extension icon in your toolbar

3. Enter your email address (it will be saved for future use)

4. Click **"Scan Page"**

5. Review the detected events

6. Click **"Post Event"** on any event to send it to the API

### Test on a Page with HTML Event Patterns

The extension will also detect events from HTML patterns on pages like:

- Event listings
- Calendar pages
- News articles about events

### Expected Behavior

✅ **Successful scenarios:**

- Extension icon appears in toolbar
- Popup opens when clicked
- Email persists between sessions
- Events are detected and displayed
- API calls succeed (or show appropriate error messages)

⚠️ **No events found:**

- If a page has no event data, you'll see: "No events detected on this page"
- This is normal for pages without event information

## Development Mode

To make changes and test during development:

```bash
cd /home/user/event-scanner-extension

# Start development server with hot reload
pnpm dev

# The extension will auto-reload when you make changes
```

When in dev mode, the extension will automatically reload when you save changes to the code.

## Building for Production

```bash
cd /home/user/event-scanner-extension

# Build optimized version
pnpm build

# Create distribution zip
pnpm zip
```

The zip file will be created in `.output/` and can be uploaded to the Chrome Web Store.

## Troubleshooting

### Extension doesn't appear after loading

- Make sure you selected the `.output/chrome-mv3` directory, not the project root
- Check that Developer mode is enabled

### "Failed to connect to page" error

- Refresh the webpage you're trying to scan
- The content script needs to be injected when the page loads

### No events detected on a page that should have events

- The page might use non-standard event markup
- Try a page with Schema.org structured data for best results

### API errors when posting events

- Check your network connection
- Verify the API endpoint is accessible: https://api.funfuncal.com/events
- The email field must be filled in before posting

## Project Structure

```
event-scanner-extension/
├── .output/chrome-mv3/          # Built extension (load this in Chrome)
├── entrypoints/
│   ├── popup/                   # Popup UI
│   │   ├── App.tsx
│   │   ├── index.html
│   │   └── main.tsx
│   └── content.ts               # Page scanning logic
├── components/
│   ├── EmailInput.tsx
│   └── EventCard.tsx
├── utils/
│   ├── eventScanner.ts          # Event detection algorithms
│   └── api.ts                   # API integration
├── wxt.config.ts                # Extension configuration
├── package.json
└── tsconfig.json
```

## Next Steps

- Test the extension on various event websites
- Customize the event detection patterns in `utils/eventScanner.ts`
- Modify the UI in `entrypoints/popup/App.tsx`
- Add additional features as needed
