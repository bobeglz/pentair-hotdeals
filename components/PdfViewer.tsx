"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker - must be done before rendering
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

interface PdfViewerProps {
  url: string;
  onClose: () => void;
}

export function PdfViewer({ url, onClose }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-[#0D274D] font-medium flex items-center gap-2"
        >
          <span>←</span>
          <span>Cerrar</span>
        </button>
        <span className="text-sm text-gray-500">
          {pageNumber} / {numPages || "..."}
        </span>
        <a
          href={url}
          download
          className="text-[#00A651] font-medium text-sm"
        >
          📥 Descargar
        </a>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-800 flex justify-center">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📄</div>
              <p>Cargando PDF...</p>
            </div>
          </div>
        )}
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          className="py-4"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={Math.min(window.innerWidth - 16, 600)}
              className="mb-4 shadow-lg"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>

      {/* Navigation */}
      {numPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-center gap-4">
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
