"use client";

import { useEffect } from "react";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountrySheetProps {
  countries: Country[];
  onSelect: (country: Country) => void;
  onClose: () => void;
  title?: string;
}

export function CountrySheet({ countries, onSelect, onClose, title = "Selecciona país" }: CountrySheetProps) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
          <h3 className="text-lg font-bold text-[#0D274D] text-center">{title}</h3>
        </div>
        
        {/* Country Options */}
        <div className="p-4 grid grid-cols-2 gap-3 max-h-[50vh] overflow-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => onSelect(country)}
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-[#E8F5E9] active:bg-[#C8E6C9] rounded-xl transition-colors"
            >
              <span className="text-3xl">{country.flag}</span>
              <span className="font-medium text-[#0D274D] text-sm">{country.name}</span>
            </button>
          ))}
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
