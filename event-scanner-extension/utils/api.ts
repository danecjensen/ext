import type { EventData } from './eventScanner';

export interface PostEventPayload {
  email: string;
  event: {
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    url: string;
  };
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const API_URL = 'https://api.funfuncal.com/events';

export async function postEvent(
  email: string,
  event: EventData,
): Promise<ApiResponse> {
  try {
    const payload: PostEventPayload = {
      email,
      event: {
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        url: event.url,
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Server error: ${response.status} - ${errorText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Event posted successfully',
      ...data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}
