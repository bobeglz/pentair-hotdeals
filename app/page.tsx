import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calculator } from "@/components/calculator";
import rebatesData from "@/data/rebates.json";
import { RebatesData } from "@/lib/types";

function CalculatorSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="pentair-gradient p-6">
          <div className="h-8 bg-white/20 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-white/20 rounded w-2/3 mt-2 animate-pulse" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-pentair-100 rounded animate-pulse" />
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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="pentair-gradient text-white">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/pentair-logo-white.png"
                alt="Pentair Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <div>
                <p className="text-xs text-pentair-100">LATAM Hot Deals</p>
              </div>
            </div>
            <div className="text-xs text-pentair-100 text-right">
              <div>Actualizado</div>
              <div className="font-medium">{formatDate(data.lastUpdated)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-md mx-auto px-4 py-2 flex justify-center gap-4">
          <span className="text-sm font-medium text-pentair-600 border-b-2 border-pentair-600 pb-1">
            🔍 Calculadora
          </span>
          <Link
            href="/tabla"
            className="text-sm text-gray-500 hover:text-pentair-600 pb-1"
          >
            📊 Ver Tabla Completa
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-6 -mt-2">
        <Suspense fallback={<CalculatorSkeleton />}>
          <Calculator data={data} />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="max-w-md mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
        <p>© 2026 Pentair Pool. Todos los derechos reservados.</p>
        <p className="mt-1">
          Los rebates están sujetos a términos y condiciones.
        </p>
      </footer>
    </main>
  );
}
