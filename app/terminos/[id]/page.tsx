"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import rebatesData from "@/data/rebates.json";
import { RebatesData } from "@/lib/types";

// Mapping rebate ID to terms PDF
const termsPdfMap: Record<string, string> = {
  "heaters-eti": "/terms/heaters-eti.pdf",
  "heaters-mastertemp": "/terms/heaters-mastertemp.pdf",
  "filters-plus-large": "/terms/filters.pdf",
  "filters-fullflo": "/terms/filters.pdf",
  "filters-triton": "/terms/filters.pdf",
  "filters-rp": "/terms/filters.pdf",
  "pumps-intelliflo3": "/terms/pumps-intelliflo3.pdf",
  "pumps-intellipro3": "/terms/pumps-intellipro3.pdf",
  "lighting-intellivibe": "/terms/lighting-intellivibe.pdf",
  "chlorinators-intellichlor": "/terms/chlorinators-intellichlor.pdf",
};

export default function TerminosPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const data = rebatesData as RebatesData;
  const rebate = data.rebates.find((r) => r.id === id);
  const category = rebate ? data.categories.find((c) => c.id === rebate.category) : null;
  const pdfUrl = termsPdfMap[id];

  if (!rebate || !pdfUrl) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 text-center max-w-sm">
          <div className="text-4xl mb-3">❌</div>
          <h1 className="font-bold text-[#0D274D] text-lg mb-2">
            Términos no encontrados
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            No encontramos los términos y condiciones para este producto.
          </p>
          <Link
            href="/tabla"
            className="inline-block bg-[#00A651] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            ← Volver a la lista
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#0D274D] text-sm font-medium"
            >
              <span>←</span>
              <span>Volver</span>
            </button>
            <Image
              src="/logos/pentair-logo.png"
              alt="Pentair"
              width={80}
              height={26}
              className="h-5 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Product Info */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category?.icon}</span>
          <div>
            <h1 className="font-bold text-[#0D274D] text-sm">{rebate.name}</h1>
            <p className="text-xs text-gray-500">Términos y Condiciones</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="font-bold text-[#0D274D] text-lg mb-2">
            Documento PDF
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Términos y condiciones oficiales de esta promoción
          </p>
          
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#00A651] text-white font-semibold py-3 px-6 rounded-xl text-center mb-3"
          >
            📄 Ver PDF
          </a>
          
          <a
            href={pdfUrl}
            download
            className="block w-full border-2 border-[#00A651] text-[#00A651] font-semibold py-3 px-6 rounded-xl text-center"
          >
            📥 Descargar
          </a>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <span className="text-xl">🔢</span>
            <span className="text-[10px] font-medium">Calculadora</span>
          </Link>
          <Link
            href="/tabla"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <span className="text-xl">📋</span>
            <span className="text-[10px] font-medium">Lista</span>
          </Link>
          <a
            href="https://www.pentair.com/hotdeals"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <span className="text-xl">🌐</span>
            <span className="text-[10px] font-medium">Pentair</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
