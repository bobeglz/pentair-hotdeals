import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calculator } from "@/components/calculator";
import rebatesData from "@/data/rebates.json";
import { RebatesData } from "@/lib/types";

function CalculatorSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#F5F5F5] p-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 animate-pulse" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-[#E8F5E9] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const data = rebatesData as RebatesData;

  // Formatear la fecha de última actualización
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header - Clean White */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/pentair-logo.png"
                alt="Pentair Logo"
                width={130}
                height={44}
                className="h-11 w-auto"
                priority
              />
            </div>
            <div className="text-xs text-gray-500 text-right">
              <div>Actualizado</div>
              <div className="font-medium text-[#0D274D]">{formatDate(data.lastUpdated)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Gold Accent Bar */}
      <div className="bg-[#FFD100] py-2">
        <div className="max-w-md mx-auto px-4 text-center">
          <span className="text-sm font-bold text-[#0D274D]">
            🔥 HOT DEALS — Hasta Mayo 2026
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#F5F5F5] border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-center gap-6">
          <span className="text-sm font-semibold text-[#00A651] border-b-2 border-[#00A651] pb-1">
            Calculadora
          </span>
          <Link
            href="/tabla"
            className="text-sm text-[#0D274D] hover:text-[#00A651] pb-1 transition-colors"
          >
            Ver Tabla
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-8 bg-[#F5F5F5] min-h-[60vh]">
        <Suspense fallback={<CalculatorSkeleton />}>
          <Calculator data={data} />
        </Suspense>
      </div>

      {/* Footer - Navy Dark */}
      <footer className="bg-[#0D274D] text-white">
        <div className="max-w-md mx-auto px-4 py-6 text-center">
          <p className="text-sm">© 2026 Pentair Pool. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs text-gray-300">
            Los rebates están sujetos a{" "}
            <a href="https://www.pentair.com/hotdeals" className="text-[#FFD100] hover:underline">
              términos y condiciones
            </a>.
          </p>
        </div>
      </footer>
    </main>
  );
}
