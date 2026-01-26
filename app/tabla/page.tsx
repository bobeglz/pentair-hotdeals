"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import rebatesData from "@/data/rebates.json";
import { RebatesData, Rebate } from "@/lib/types";
import { generateRebatePDF } from "@/components/pdf-generator";
import { ShareMenu } from "@/components/share-menu";
import { trackEvent } from "@/lib/analytics";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n/context";

// Product image mapping
const productImages: Record<string, string> = {
  "heaters-eti": "/products/ETi400-banner-2.png",
  "heaters-mastertemp": "/products/mastertemp.png",
  "filters-plus-large": "/products/CNCPlus 320.png",
  "filters-fullflo": "/products/FULLFLOXF-PLEATCO.png",
  "filters-triton": "/products/Triton II_ajuste color.png",
  "filters-rp": "/products/CNCPlus 320.png",
  "pumps-intelliflo3": "/products/3.0 HP - IntelliFlo3 VSF Product Image - Left Side.png",
  "pumps-intellipro3": "/products/2022-Pentair-IntelliPro3-LeftAngle.png",
  "lighting-intellivibe": "/products/intellivibe.png",
  "chlorinators-intellichlor": "/logos/pentair-logo.png",
};

export default function TablaPage() {
  const data = rebatesData as RebatesData;
  const { t, locale } = useI18n();
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Filtrar rebates por país
  const filteredRebates = useMemo(() => {
    return data.rebates.filter((rebate) => {
      return selectedCountry === "all" || rebate.countries.includes(selectedCountry);
    });
  }, [data.rebates, selectedCountry]);

  // Agrupar rebates por categoría
  const rebatesByCategory = useMemo(() => {
    const grouped: Record<string, Rebate[]> = {};
    for (const category of data.categories) {
      const categoryRebates = filteredRebates.filter(
        (r) => r.category === category.id
      );
      if (categoryRebates.length > 0) {
        grouped[category.id] = categoryRebates;
      }
    }
    return grouped;
  }, [filteredRebates, data.categories]);

  // Formatear fecha
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Días restantes
  const daysUntilEnd = (dateStr: string) => {
    const end = new Date(dateStr);
    const now = new Date();
    return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const selectedCountryData = data.countries.find((c) => c.code === selectedCountry);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Contar rebates disponibles
  const totalRebates = filteredRebates.length;

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />

      {/* Filtro de país - Sticky */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[#0D274D] whitespace-nowrap">
              🌎 País:
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setExpandedCard(null);
              }}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] bg-white"
            >
              <option value="all">🌐 {t.common.allCountries}</option>
              {data.countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {t.countries[country.code as keyof typeof t.countries] || country.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Resumen */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>
              {totalRebates} rebate{totalRebates !== 1 ? "s" : ""} disponible{totalRebates !== 1 ? "s" : ""}
            </span>
            <span className="bg-[#FFD100] text-[#0D274D] px-2 py-0.5 rounded-full font-semibold">
              {locale === "es" ? "Hasta 31 Mayo 2026" : "Until May 31, 2026"}
            </span>
          </div>
        </div>
      </div>

      {/* Lista de rebates por categoría */}
      <div className="px-4 py-4 space-y-4 pb-24">
        {Object.entries(rebatesByCategory).map(([categoryId, rebates]) => {
          const category = data.categories.find((c) => c.id === categoryId);
          if (!category || rebates.length === 0) return null;

          return (
            <section key={categoryId}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{category.icon}</span>
                <h2 className="text-sm font-bold text-[#0D274D] uppercase tracking-wide">
                  {category.name}
                </h2>
                <span className="text-xs text-gray-400">
                  ({rebates.length})
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {rebates.map((rebate) => {
                  const isExpanded = expandedCard === rebate.id;

                  return (
                    <div
                      key={rebate.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      {/* Card Header - Always visible */}
                      <button
                        onClick={() => toggleCard(rebate.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left active:bg-gray-50"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#0D274D] text-sm truncate pr-2">
                            {rebate.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {rebate.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-lg font-bold text-[#00A651]">
                            ${rebate.rebateAmount}
                          </span>
                          <span className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          {/* Product Image */}
                          {productImages[rebate.id] && (
                            <div className="flex justify-center py-2">
                              <Image
                                src={productImages[rebate.id]}
                                alt={rebate.name}
                                width={160}
                                height={160}
                                className="object-contain max-h-32"
                                style={{ height: "auto" }}
                              />
                            </div>
                          )}

                          {/* Bounty Badge */}
                          {rebate.type === "bounty" && rebate.competitorBrands && (
                            <div className="bg-[#FFD100]/10 border border-[#FFD100] rounded-lg p-2.5">
                              <div className="text-xs font-semibold text-[#0D274D] mb-1">
                                🏆 Programa Bounty
                              </div>
                              <div className="text-xs text-gray-600">
                                Reemplazo de: {rebate.competitorBrands.join(", ")}
                              </div>
                            </div>
                          )}

                          {/* Info Grid */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-[#F5F5F5] rounded-lg p-2.5">
                              <div className="text-gray-500 mb-0.5">📅 Vigencia</div>
                              <div className="font-medium text-[#0D274D]">
                                {formatDate(rebate.endDate)}
                              </div>
                              {daysUntilEnd(rebate.endDate) <= 30 && (
                                <div className="text-[#FFD100] font-semibold mt-0.5">
                                  ⚠️ {daysUntilEnd(rebate.endDate)} días
                                </div>
                              )}
                            </div>
                            <div className="bg-[#F5F5F5] rounded-lg p-2.5">
                              <div className="text-gray-500 mb-0.5">💳 Pago</div>
                              <div className="font-medium text-[#0D274D]">
                                Tarjeta Mastercard
                              </div>
                            </div>
                            <div className="bg-[#F5F5F5] rounded-lg p-2.5">
                              <div className="text-gray-500 mb-0.5">⏰ Plazo</div>
                              <div className="font-medium text-[#0D274D]">
                                {rebate.submissionDeadlineDays} días
                              </div>
                            </div>
                            <div className="bg-[#F5F5F5] rounded-lg p-2.5">
                              <div className="text-gray-500 mb-0.5">🌎 Países</div>
                              <div className="font-medium text-[#0D274D]">
                                {rebate.countries.length} elegibles
                              </div>
                            </div>
                          </div>

                          {/* SKUs */}
                          {rebate.skus && rebate.skus.length > 0 && (
                            <div>
                              <div className="text-xs font-medium text-gray-500 mb-1.5">
                                SKUs elegibles:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {rebate.skus.map((s) => (
                                  <span
                                    key={s.sku}
                                    className="bg-[#E8F5E9] text-[#0D274D] px-2 py-1 rounded text-xs font-mono"
                                  >
                                    {s.sku}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2 pt-1">
                            {selectedCountry !== "all" && selectedCountryData ? (
                              <>
                                <button
                                  onClick={() => {
                                    trackEvent("pdf_generated", {
                                      product: rebate.name,
                                      country: selectedCountryData.code,
                                    });
                                    generateRebatePDF({ rebate, country: selectedCountryData });
                                  }}
                                  className="flex-1 bg-[#00A651] text-white text-xs font-semibold py-2.5 px-3 rounded-lg active:bg-[#00953F]"
                                >
                                  📄 PDF
                                </button>
                                <div className="flex-1">
                                  <ShareMenu rebate={rebate} country={selectedCountryData} />
                                </div>
                              </>
                            ) : (
                              <div className="flex-1 bg-gray-100 text-gray-500 text-xs font-medium py-2.5 px-3 rounded-lg text-center">
                                {t.common.selectCountryFirst}
                              </div>
                            )}
                            <Link
                              href={`/terminos/${rebate.id}`}
                              className="flex-1 border border-[#0D274D] text-[#0D274D] text-xs font-semibold py-2.5 px-3 rounded-lg text-center active:bg-gray-50"
                            >
                              📋 T&C
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Empty State */}
        {totalRebates === 0 && (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-bold text-[#0D274D] mb-1">
              {t.list.noRebates}
            </h3>
            <p className="text-sm text-gray-500">
              No encontramos rebates para {selectedCountryData?.name || "este país"}.
            </p>
            <button
              onClick={() => setSelectedCountry("all")}
              className="mt-4 text-sm text-[#00A651] font-medium"
            >
              Ver todos los países →
            </button>
          </div>
        )}

        {/* Quick Guide */}
        <div className="bg-[#E8F5E9] rounded-xl p-4 border-l-4 border-[#00A651]">
          <h3 className="font-bold text-[#0D274D] text-sm mb-2">
            📋 Cómo participar
          </h3>
          <ol className="text-xs text-gray-700 space-y-1.5">
            <li><span className="font-semibold">1.</span> Compra el producto elegible</li>
            <li><span className="font-semibold">2.</span> Instala dentro del periodo</li>
            <li>
              <span className="font-semibold">3.</span> Registra en{" "}
              <a href="https://www.pentair.com/hotdeals" target="_blank" rel="noopener noreferrer" className="text-[#00A651] font-semibold">
                pentair.com/hotdeals
              </a>
            </li>
            <li><span className="font-semibold">4.</span> Recibe tu tarjeta virtual</li>
          </ol>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
