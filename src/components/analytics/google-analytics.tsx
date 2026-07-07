"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              cookie_flags: 'SameSite=Lax;Secure',
            });
            
            // Custom event tracking
            window.trackEvent = function(eventName, parameters) {
              gtag('event', eventName, parameters);
            };
            
            // Track page views
            window.trackPageView = function(pageTitle, pageLocation) {
              gtag('config', '${measurementId}', {
                page_title: pageTitle,
                page_location: pageLocation,
              });
            };
            
            // Track donation events
            window.trackDonation = function(amount, frequency) {
              gtag('event', 'donation', {
                event_category: 'engagement',
                event_label: frequency,
                value: amount,
                currency: 'USD'
              });
            };
            
            // Track prayer request submissions
            window.trackPrayerRequest = function() {
              gtag('event', 'prayer_request', {
                event_category: 'engagement',
                event_label: 'prayer'
              });
            };
            
            // Track event registrations
            window.trackEventRegistration = function(eventName) {
              gtag('event', 'event_registration', {
                event_category: 'engagement',
                event_label: eventName
              });
            };
            
            // Track member registrations
            window.trackMemberRegistration = function() {
              gtag('event', 'member_registration', {
                event_category: 'engagement',
                event_label: 'membership'
              });
            };
          `,
        }}
      />
    </>
  );
}

// Custom hooks for tracking
export function useAnalytics() {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent(eventName, parameters);
    }
  };

  const trackPageView = (pageTitle: string, pageLocation?: string) => {
    if (typeof window !== 'undefined' && (window as any).trackPageView) {
      (window as any).trackPageView(pageTitle, pageLocation || window.location.href);
    }
  };

  const trackDonation = (amount: number, frequency: string) => {
    if (typeof window !== 'undefined' && (window as any).trackDonation) {
      (window as any).trackDonation(amount, frequency);
    }
  };

  const trackPrayerRequest = () => {
    if (typeof window !== 'undefined' && (window as any).trackPrayerRequest) {
      (window as any).trackPrayerRequest();
    }
  };

  const trackEventRegistration = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).trackEventRegistration) {
      (window as any).trackEventRegistration(eventName);
    }
  };

  const trackMemberRegistration = (memberData: any) => {
    if (typeof window !== 'undefined' && (window as any).trackMemberRegistration) {
      (window as any).trackMemberRegistration(memberData);
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackDonation,
    trackPrayerRequest,
    trackEventRegistration,
    trackMemberRegistration,
  };
}
