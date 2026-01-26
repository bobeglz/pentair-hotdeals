"use client";

import { useEffect } from "react";
import { Rebate, Country } from "@/lib/types";
import { generateRebatePDF } from "@/components/pdf-generator";
import { trackEvent } from "@/lib/analytics";

interface ShareSheetProps {
  rebate: Rebate;
  country: Country;
  onClose: () => void;
}

export function ShareSheet({ rebate, country, onClose }: ShareSheetProps) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const shareUrl = `${window.location.origin}/?product=${rebate.id}&country=${country.code}`;
  const shareText = `${rebate.name} - Rebate $${rebate.rebateAmount} USD en ${country.name}`;

  const handleWhatsApp = () => {
    trackEvent("share_whatsapp", { product: rebate.name, country: country.code });
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`,
      "_blank"
    );
    onClose();
  };

  const handleEmail = () => {
    trackEvent("share_email", { product: rebate.name, country: country.code });
    window.open(
      `mailto:?subject=${encodeURIComponent("Pentair Hot Deals - " + rebate.name)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      "_blank"
    );
    onClose();
  };

  const handleCopyLink = async () => {
    trackEvent("share_copy", { product: rebate.name, country: country.code });
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copiado!");
    onClose();
  };

  const handleDownloadPDF = () => {
    trackEvent("pdf_generated", { product: rebate.name, country: country.code });
    generateRebatePDF({ rebate, country });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="relative bg-white w-full max-w-lg rounded-t-2xl animate-slide-up safe-area-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="px-4 pb-3 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#0D274D] text-center">
            Compartir {country.flag}
          </h3>
          <p className="text-sm text-gray-500 text-center mt-1">{rebate.name}</p>
        </div>
        
        {/* Share Options */}
        <div className="p-4 space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-4 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 active:bg-[#25D366]/30 rounded-xl transition-colors"
          >
            <span className="text-3xl">💬</span>
            <span className="font-medium text-[#0D274D]">WhatsApp</span>
          </button>
          
          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-xl transition-colors"
          >
            <span className="text-3xl">📧</span>
            <span className="font-medium text-[#0D274D]">Email</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-colors"
          >
            <span className="text-3xl">🔗</span>
            <span className="font-medium text-[#0D274D]">Copiar link</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="w-full flex items-center gap-4 p-4 bg-[#00A651]/10 hover:bg-[#00A651]/20 active:bg-[#00A651]/30 rounded-xl transition-colors"
          >
            <span className="text-3xl">📄</span>
            <span className="font-medium text-[#0D274D]">Descargar PDF</span>
          </button>
        </div>
        
        {/* Cancel Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 font-medium rounded-xl hover:bg-gray-50 active:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
    </div>
  );
}
