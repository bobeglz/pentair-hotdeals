"use client";

import { useState } from "react";

interface PdfViewerProps {
  url: string;
  onClose: () => void;
}

export function PdfViewer({ url, onClose }: PdfViewerProps) {
  const [error, setError] = useState(false);
  
  // Use Google Docs viewer as fallback for better mobile compatibility
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + url)}&embedded=true`;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between safe-area-top">
        <button
          onClick={onClose}
          className="text-[#0D274D] font-medium flex items-center gap-2"
        >
          <span className="text-lg">←</span>
          <span>Cerrar</span>
        </button>
        <a
          href={url}
          download
          className="text-[#00A651] font-medium text-sm flex items-center gap-1"
        >
          📥 Descargar
        </a>
      </div>

      {/* PDF Content */}
      <div className="flex-1 bg-gray-100">
        {!error ? (
          <iframe
            src={googleViewerUrl}
            className="w-full h-full border-0"
            title="PDF Viewer"
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="font-bold text-[#0D274D] text-lg mb-2">
              No se pudo cargar el PDF
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Descarga el archivo para verlo en tu dispositivo
            </p>
            <a
              href={url}
              download
              className="bg-[#00A651] text-white font-semibold py-3 px-8 rounded-xl"
            >
              📥 Descargar PDF
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .safe-area-top {
          padding-top: env(safe-area-inset-top, 0);
        }
      `}</style>
    </div>
  );
}
