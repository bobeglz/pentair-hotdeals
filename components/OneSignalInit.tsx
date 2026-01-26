"use client";

import { useEffect } from "react";

const ONESIGNAL_APP_ID = "db430d31-363a-4eb6-8400-9dc25fd978b4";

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

export function OneSignalInit() {
  useEffect(() => {
    // Load OneSignal SDK
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);

    window.OneSignalDeferred.push(async function(OneSignal: any) {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true,
        serviceWorkerParam: { scope: "/" },
        serviceWorkerPath: "/OneSignalSDKWorker.js",
        notifyButton: {
          enable: false, // We'll use our own UI
        },
        welcomeNotification: {
          title: "Pentair Hot Deals",
          message: "¡Gracias por suscribirte! Te avisaremos de nuevos rebates.",
        },
      });
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}

// Helper functions to use OneSignal
export async function requestNotificationPermission(): Promise<boolean> {
  if (!window.OneSignal) return false;
  
  try {
    await window.OneSignal.Notifications.requestPermission();
    return window.OneSignal.Notifications.permission === true;
  } catch {
    return false;
  }
}

export async function setUserTags(tags: Record<string, string>) {
  if (!window.OneSignal) return;
  
  try {
    await window.OneSignal.User.addTags(tags);
  } catch (e) {
    console.error("Error setting tags:", e);
  }
}

export async function getNotificationPermission(): Promise<boolean> {
  if (!window.OneSignal) return false;
  return window.OneSignal.Notifications.permission === true;
}
