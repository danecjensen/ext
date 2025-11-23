export interface EventData {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  url: string;
  sourceType: 'schema' | 'parsed';
}

// Parse various date formats to ISO string
function parseDate(dateStr: string): string | undefined {
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  } catch {
    return undefined;
  }
  return undefined;
}

// Extract Schema.org Event data from JSON-LD
function extractSchemaOrgEvents(): EventData[] {
  const events: EventData[] = [];
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );

  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || '');
      const items = Array.isArray(data) ? data : [data];

      items.forEach((item: any) => {
        if (item['@type'] === 'Event' || item.type === 'Event') {
          events.push({
            title: item.name || item.title || 'Untitled Event',
            description: item.description,
            startDate: item.startDate ? parseDate(item.startDate) : undefined,
            endDate: item.endDate ? parseDate(item.endDate) : undefined,
            location:
              item.location?.name ||
              item.location?.address?.streetAddress ||
              item.location,
            url: window.location.href,
            sourceType: 'schema',
          });
        }
      });
    } catch (e) {
      // Invalid JSON, skip
    }
  });

  return events;
}

// Parse events from DOM by looking for patterns
function parseEventsFromDOM(): EventData[] {
  const events: EventData[] = [];

  // Find elements that might contain event information
  const eventSelectors = [
    '[class*="event"]',
    '[id*="event"]',
    '[class*="calendar"]',
    '[id*="calendar"]',
    'article',
    '.post',
    '.entry',
  ];

  const potentialEventElements = document.querySelectorAll(
    eventSelectors.join(','),
  );
  const seenTitles = new Set<string>();

  // Date pattern regex
  const datePatterns = [
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b/gi,
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
    /\b\d{4}-\d{2}-\d{2}\b/g,
  ];

  potentialEventElements.forEach((element) => {
    // Look for title
    const titleEl = element.querySelector(
      'h1, h2, h3, [class*="title"], [class*="name"]',
    );
    const title =
      titleEl?.textContent?.trim() ||
      element.querySelector('a')?.textContent?.trim();

    if (!title || seenTitles.has(title)) return;

    // Look for date
    const text = element.textContent || '';
    let foundDate: string | undefined;

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        foundDate = parseDate(match[0]);
        if (foundDate) break;
      }
    }

    // Look for location/venue
    const locationEl = element.querySelector(
      '[class*="location"], [class*="venue"], [class*="address"]',
    );
    const location = locationEl?.textContent?.trim();

    // Look for description
    const descEl = element.querySelector(
      'p, [class*="description"], [class*="summary"]',
    );
    const description = descEl?.textContent?.trim();

    // Only add if we found at least a title and either a date or location
    if (title && (foundDate || location)) {
      seenTitles.add(title);
      events.push({
        title,
        description: description ? description.substring(0, 200) : undefined,
        startDate: foundDate,
        location,
        url: window.location.href,
        sourceType: 'parsed',
      });
    }
  });

  return events.slice(0, 10); // Limit to 10 parsed events
}

// Main scanning function
export function scanForEvents(): EventData[] {
  // Try Schema.org first (most reliable)
  const schemaEvents = extractSchemaOrgEvents();

  if (schemaEvents.length > 0) {
    return schemaEvents;
  }

  // Fall back to DOM parsing
  return parseEventsFromDOM();
}
