import { Suspense } from "react";
import Image from "next/image";
import { Calculator } from "@/components/calculator";
import rebatesData from "@/data/rebates.json";
import { RebatesData } from "@/lib/types";

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

      {/* Main Content */}
      <div className="px-4 py-6 -mt-2">
        <Suspense fallback={<div className="w-full max-w-md mx-auto p-6 text-center text-muted-foreground">Cargando...</div>}>
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
