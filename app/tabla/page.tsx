"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import rebatesData from "@/data/rebates.json";
import { RebatesData, Rebate } from "@/lib/types";

export default function TablaPage() {
  const data = rebatesData as RebatesData;
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filtrar rebates por país y categoría
  const filteredRebates = useMemo(() => {
    return data.rebates.filter((rebate) => {
      const matchesCountry =
        selectedCountry === "all" || rebate.countries.includes(selectedCountry);
      const matchesCategory =
        selectedCategory === "all" || rebate.category === selectedCategory;
      return matchesCountry && matchesCategory;
    });
  }, [data.rebates, selectedCountry, selectedCategory]);

  // Agrupar rebates por categoría
  const rebatesByCategory = useMemo(() => {
    const grouped: Record<string, Rebate[]> = {};
    for (const category of data.categories) {
      grouped[category.id] = filteredRebates.filter(
        (r) => r.category === category.id
      );
    }
    return grouped;
  }, [filteredRebates, data.categories]);

  // Formatear fecha
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
    });
  };

  // Marcas competidoras para bounty
  const competitorBrands = ["Jandy", "Hayward", "Raypak", "Lochinvar", "Laars"];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="pentair-gradient text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logos/pentair-logo-white.png"
                  alt="Pentair Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
              <div>
                <h1 className="text-xl font-bold">🔥 Hot Deals Q1 2026</h1>
                <p className="text-xs text-pentair-100">Tabla de Rebates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-gold text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                ⏰ Hasta 31 Mayo 2026
              </span>
              <Link
                href="/"
                className="text-xs text-pentair-100 hover:text-white underline"
              >
                ← Calculadora
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de países participantes */}
      <section className="bg-pentair-50 border-b border-pentair-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-pentair-700 text-sm">
              Países participantes:
            </span>
            {data.countries.map((country) => (
              <span
                key={country.code}
                className="flex items-center gap-1 text-sm"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-gray-700">{country.code}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b shadow-sm sticky top-[72px] z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Filtro por país */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Filtrar por país:
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pentair-500 focus:border-pentair-500"
              >
                <option value="all">Todos los países</option>
                {data.countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por categoría (tabs) */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Categoría:
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-pentair-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Todas
                </button>
                {data.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-pentair-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Sección de Calentadores */}
        {(selectedCategory === "all" || selectedCategory === "heaters") &&
          rebatesByCategory.heaters &&
          rebatesByCategory.heaters.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl">🔥</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    Rebate #1: Calentadores
                  </h2>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    BOUNTY - Reemplazo de competencia
                  </span>
                </div>
              </div>

              {/* Marcas competidoras */}
              <div className="bg-red-50 px-6 py-3 border-b">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">
                    Marcas a reemplazar:
                  </span>
                  {competitorBrands.map((brand) => (
                    <span
                      key={brand}
                      className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-[140px]">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Producto
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        SKU
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Rebate
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Vigencia
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Condiciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rebatesByCategory.heaters.map((rebate) => (
                      <tr key={rebate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {rebate.name}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {rebate.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {rebate.skus && rebate.skus.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {rebate.skus.map((s) => (
                                <code
                                  key={s.sku}
                                  className="bg-gray-100 px-2 py-0.5 rounded text-xs"
                                >
                                  {s.sku}
                                </code>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              Varios modelos
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xl font-bold text-pentair-600">
                            ${rebate.rebateAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                            {formatDate(rebate.startDate)} -{" "}
                            {formatDate(rebate.endDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          Reemplazar calentador de competencia
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        {/* Sección de Filtros */}
        {(selectedCategory === "all" || selectedCategory === "filters") &&
          rebatesByCategory.filters &&
          rebatesByCategory.filters.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧼</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    Rebate #2: Filtros Clean & Clear®
                  </h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Producto
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        SKU
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Rebate
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Vigencia
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Condiciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rebatesByCategory.filters.map((rebate) => (
                      <tr key={rebate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {rebate.name}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {rebate.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {rebate.skus?.map((s) => (
                              <code
                                key={s.sku}
                                className="bg-gray-100 px-2 py-0.5 rounded text-xs"
                              >
                                {s.sku}
                              </code>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xl font-bold text-pentair-600">
                            ${rebate.rebateAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                            {formatDate(rebate.startDate)} -{" "}
                            {formatDate(rebate.endDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          Instalación de filtro elegible
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        {/* Sección de Bombas */}
        {(selectedCategory === "all" || selectedCategory === "pumps") &&
          rebatesByCategory.pumps &&
          rebatesByCategory.pumps.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    Rebate #3: Bombas IntelliFlo3® / IntelliPro3®
                  </h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Producto
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        SKU
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Rebate
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Vigencia
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-pentair-500">
                        Condiciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rebatesByCategory.pumps.map((rebate) => (
                      <tr key={rebate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {rebate.name}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {rebate.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {rebate.skus?.slice(0, 4).map((s) => (
                              <code
                                key={s.sku}
                                className="bg-gray-100 px-2 py-0.5 rounded text-xs"
                              >
                                {s.sku}
                              </code>
                            ))}
                            {rebate.skus && rebate.skus.length > 4 && (
                              <span className="text-xs text-gray-500">
                                +{rebate.skus.length - 4} más
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xl font-bold text-pentair-600">
                            ${rebate.rebateAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                            {formatDate(rebate.startDate)} -{" "}
                            {formatDate(rebate.endDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          Upgrade a velocidad variable
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        {/* Nota explicativa */}
        <section className="bg-pentair-50 border-l-4 border-pentair-500 rounded-r-xl p-6">
          <h3 className="font-bold text-pentair-700 flex items-center gap-2 mb-3">
            <span>📋</span> Cómo participar
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              <strong>Compra</strong> el producto elegible durante el periodo de
              vigencia
            </li>
            <li>
              <strong>Instala</strong> el producto dentro del periodo de la
              promoción
            </li>
            <li>
              <strong>Registra</strong> tu rebate en{" "}
              <a
                href="https://www.pentair.com/hotdeals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pentair-600 font-semibold hover:underline"
              >
                pentair.com/hotdeals
              </a>{" "}
              (dentro de 60 días)
            </li>
            <li>
              <strong>Recibe</strong> tu tarjeta virtual Mastercard por email
            </li>
          </ol>
          <div className="mt-4 pt-4 border-t border-pentair-200 text-xs text-gray-600">
            <p>
              <strong>Términos y condiciones completos:</strong>{" "}
              <a
                href="https://www.pentair.com/hotdeals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pentair-600 hover:underline"
              >
                www.pentair.com/hotdeals
              </a>{" "}
              |{" "}
              <a
                href="https://www.pentair.com/latrebate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pentair-600 hover:underline"
              >
                www.pentair.com/latrebate
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-pentair-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              <p>© 2026 Pentair Pool. Todos los derechos reservados.</p>
              <p className="text-pentair-300 text-xs mt-1">
                Los rebates están sujetos a términos y condiciones.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-pentair-200 hover:text-white"
              >
                ← Volver a Calculadora
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
