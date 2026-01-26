// Plausible Analytics utility
// https://plausible.io/docs/custom-event-goals

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

/**
 * Track a custom event with Plausible Analytics
 * @param name - Event name (e.g., 'search', 'pdf_generated', 'share_whatsapp')
 * @param props - Optional properties to attach to the event
 */
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(name, { props });
  }
}
