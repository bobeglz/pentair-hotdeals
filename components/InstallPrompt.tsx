"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia("(display-mode: standalone)").matches 
      || (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already dismissed
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
    
    // Don't show if dismissed less than 7 days ago
    if (dismissedTime && daysSinceDismissed < 7) {
      return;
    }

    // Don't show if already installed
    if (standalone) {
      return;
    }

    // Listen for beforeinstallprompt (Android/Chrome)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Show prompt after 45 seconds of use
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 45000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome - use native prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
    // For iOS, the instructions are shown in the UI
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-w-md mx-auto">
        <div className="flex gap-3">
          <div className="text-4xl">📲</div>
          <div className="flex-1">
            <h3 className="font-bold text-[#0D274D] text-sm">
              Instala Pentair Hot Deals
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Acceso rápido desde tu pantalla de inicio
            </p>
            
            {isIOS ? (
              // iOS Instructions
              <div className="mt-3 bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2">
                  <span className="font-semibold">En Safari:</span>
                </p>
                <ol className="text-xs text-gray-600 space-y-1">
                  <li>1. Toca el botón <span className="inline-block px-1.5 py-0.5 bg-gray-200 rounded">Compartir ↑</span></li>
                  <li>2. Selecciona <span className="font-medium">"Agregar a inicio"</span></li>
                  <li>3. Toca <span className="font-medium">"Agregar"</span></li>
                </ol>
              </div>
            ) : (
              // Android/Chrome - show install button
              <button
                onClick={handleInstall}
                className="mt-3 w-full bg-[#00A651] text-white text-sm font-semibold py-2.5 px-4 rounded-lg active:bg-[#00953F]"
              >
                Instalar App
              </button>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 self-start"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        
        <button
          onClick={handleDismiss}
          className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600"
        >
          No volver a mostrar
        </button>
      </div>
      
      <style jsx>{`
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px); 
          }
          to { 
            opacity: 1;
            transform: translateY(0); 
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
