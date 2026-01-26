import { Calculator } from "@/components/calculator";
import rebatesData from "@/data/rebates.json";
import { RebatesData } from "@/lib/types";

export default function Home() {
  const data = rebatesData as RebatesData;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="pentair-gradient text-white">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">💧</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">PENTAIR</h1>
                <p className="text-xs text-pentair-100">LATAM Hot Deals</p>
              </div>
            </div>
            <div className="text-xs text-pentair-100 text-right">
              <div>Actualizado</div>
              <div className="font-medium">{data.lastUpdated}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-6 -mt-2">
        <Calculator data={data} />
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
