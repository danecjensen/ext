# Event Scanner Chrome Extension

A Chrome extension that scans websites for event information and posts it to an API.

## Features

- Scans webpages for event information using Schema.org markup and DOM parsing
- Displays found events in a user-friendly popup interface
- Posts events to API with user email
- Supports multiple event detection strategies

## Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm dev
   ```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `.output/chrome-mv3` directory

## Usage

1. Click the extension icon to open the popup
2. Enter your email address (stored locally)
3. Click "Scan Page" to detect events on the current webpage
4. Review detected events
5. Click "Post Event" on any event to send it to the API

## Development

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm zip` - Create distribution zip file

## Tech Stack

- WXT Framework
- React + TypeScript
- Chrome Extension Manifest V3
