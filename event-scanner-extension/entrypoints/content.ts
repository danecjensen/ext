import { defineContentScript } from 'wxt/sandbox';
import { scanForEvents, type EventData } from '../utils/eventScanner';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'SCAN_PAGE') {
        try {
          const events = scanForEvents();
          sendResponse({ success: true, events });
        } catch (error) {
          sendResponse({
            success: false,
            error:
              error instanceof Error ? error.message : 'Failed to scan page',
            events: [],
          });
        }
        return true; // Keep the message channel open for async response
      }
    });
  },
});
