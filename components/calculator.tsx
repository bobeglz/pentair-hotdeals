"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShareMenu } from "@/components/share-menu";
import { RebatesData, Rebate } from "@/lib/types";
import { generateRebatePDF } from "@/components/pdf-generator";
import { trackEvent } from "@/lib/analytics";
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

interface CalculatorProps {
  data: RebatesData;
}

export function Calculator({ data }: CalculatorProps) {
  const searchParams = useSearchParams();
  const { t, locale } = useI18n();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [result, setResult] = useState<Rebate | null>(null);
  const [noResult, setNoResult] = useState(false);

  // Load from URL query params on mount
  useEffect(() => {
    const producto = searchParams.get("producto");
    const pais = searchParams.get("pais");
    
    if (producto && pais) {
      // Validate that product and country exist
      const rebate = data.rebates.find(
        (r) => r.id === producto && r.countries.includes(pais)
      );
      const countryExists = data.countries.some((c) => c.code === pais);
      
      if (rebate && countryExists) {
        setSelectedCountry(pais);
        setSelectedProduct(producto);
        setResult(rebate);
        setNoResult(false);
      }
    }
  }, [searchParams, data]);

  // Get all products (rebates)
  const products = useMemo(() => {
    return data.rebates.map((r) => ({
      id: r.id,
      name: r.name,
      category: data.categories.find((c) => c.id === r.category),
    }));
  }, [data]);

  // Filter countries by selected product
  const availableCountries = useMemo(() => {
    if (!selectedProduct) return data.countries;
    const rebate = data.rebates.find((r) => r.id === selectedProduct);
    if (!rebate) return data.countries;
    return data.countries.filter((c) => rebate.countries.includes(c.code));
  }, [selectedProduct, data.countries, data.rebates]);

  // Filter products by selected country
  const availableProducts = useMemo(() => {
    if (!selectedCountry) return products;
    return products.filter((p) => {
      const rebate = data.rebates.find((r) => r.id === p.id);
      return rebate?.countries.includes(selectedCountry);
    });
  }, [selectedCountry, products, data.rebates]);

  const handleSearch = () => {
    if (!selectedCountry || !selectedProduct) return;
    
    const rebate = data.rebates.find(
      (r) => r.id === selectedProduct && r.countries.includes(selectedCountry)
    );
    
    // Track search event
    const productData = products.find((p) => p.id === selectedProduct);
    trackEvent("search", {
      product: productData?.name || selectedProduct,
      country: selectedCountry,
      found: rebate ? "yes" : "no",
    });
    
    if (rebate) {
      setResult(rebate);
      setNoResult(false);
    } else {
      setResult(null);
      setNoResult(true);
    }
  };

  const handleReset = () => {
    setSelectedCountry("");
    setSelectedProduct("");
    setResult(null);
    setNoResult(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const daysUntilEnd = (dateStr: string) => {
    const end = new Date(dateStr);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const selectedCountryData = data.countries.find((c) => c.code === selectedCountry);
  const category = result ? data.categories.find((c) => c.id === result.category) : null;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Calculator Card */}
      <Card className="border border-gray-200 shadow-md bg-white">
        <CardHeader className="bg-white border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-[#0D274D]">
            {locale === "es" ? "Calculadora de Rebates" : "Rebate Calculator"}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {locale === "es" ? "Encuentra rebates disponibles para tu región" : "Find available rebates for your region"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {/* Country Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0D274D]">
              {t.home.whatCountry}
            </label>
            <Select value={selectedCountry} onValueChange={(v) => {
              setSelectedCountry(v);
              setResult(null);
              setNoResult(false);
            }}>
              <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:border-[#00A651] focus:ring-[#00A651]">
                <SelectValue placeholder={t.common.selectCountry} />
              </SelectTrigger>
              <SelectContent>
                {availableCountries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{t.countries[country.code as keyof typeof t.countries] || country.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0D274D]">
              {t.home.whatProduct}
            </label>
            <Select value={selectedProduct} onValueChange={(v) => {
              setSelectedProduct(v);
              // Clear country if it's not available for the new product
              const rebate = data.rebates.find((r) => r.id === v);
              if (selectedCountry && rebate && !rebate.countries.includes(selectedCountry)) {
                setSelectedCountry("");
              }
              setResult(null);
              setNoResult(false);
            }}>
              <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:border-[#00A651] focus:ring-[#00A651]">
                <SelectValue placeholder={t.common.selectProduct} />
              </SelectTrigger>
              <SelectContent>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <span className="flex items-center gap-2">
                      <span>{product.category?.icon}</span>
                      <span>{product.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button - GREEN */}
          <Button 
            onClick={handleSearch}
            disabled={!selectedCountry || !selectedProduct}
            className="w-full h-12 text-base font-semibold bg-[#00A651] hover:bg-[#00953F] text-white"
          >
            {t.home.searchRebate}
          </Button>
        </CardContent>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className="border border-gray-200 shadow-md bg-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6 space-y-4">
            {/* Success Header */}
            <div className="flex items-center gap-2 text-[#00A651]">
              <span className="text-2xl">✅</span>
              <span className="text-lg font-bold">{locale === "es" ? "¡REBATE DISPONIBLE!" : "REBATE AVAILABLE!"}</span>
            </div>

            {/* Product Image */}
            {productImages[result.id] && (
              <div className="flex justify-center py-2">
                <Image
                  src={productImages[result.id]}
                  alt={result.name}
                  width={200}
                  height={200}
                  className="object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {/* Product Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{category?.icon}</span>
                <h3 className="text-xl font-bold text-[#0D274D]">{result.name}</h3>
              </div>
              <p className="text-gray-500 text-sm">{result.description}</p>
            </div>

            {/* Amount - GREEN Badge */}
            <div className="bg-[#E8F5E9] rounded-lg p-4 text-center">
              <div className="text-4xl font-bold text-[#00A651]">
                ${result.rebateAmount} <span className="text-lg">{result.currency}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {t.common.perUnitInstalled}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {/* Country */}
              <div className="flex items-center gap-2 text-sm">
                <span>{selectedCountryData?.flag}</span>
                <span className="text-gray-500">{t.result.country}:</span>
                <span className="font-medium text-[#0D274D]">{t.countries[selectedCountryData?.code as keyof typeof t.countries] || selectedCountryData?.name}</span>
              </div>

              {/* Validity */}
              <div className="flex items-center gap-2 text-sm">
                <span>📅</span>
                <span className="text-gray-500">{t.common.validUntil}:</span>
                <span className="font-medium text-[#0D274D]">{formatDate(result.endDate)}</span>
                {daysUntilEnd(result.endDate) <= 30 && (
                  <Badge variant="outline" className="text-[#FFD100] border-[#FFD100] bg-[#FFD100]/10 text-xs">
                    ⚠️ {daysUntilEnd(result.endDate)} {t.common.days}
                  </Badge>
                )}
              </div>

              {/* Payment */}
              <div className="flex items-center gap-2 text-sm">
                <span>💳</span>
                <span className="text-gray-500">{t.result.payment}:</span>
                <span className="font-medium text-[#0D274D]">{t.result.paymentMethod}</span>
              </div>

              {/* Submission Deadline */}
              <div className="flex items-center gap-2 text-sm">
                <span>⏰</span>
                <span className="text-gray-500">{t.result.submissionDeadline}:</span>
                <span className="font-medium text-[#0D274D]">{result.submissionDeadlineDays} {t.result.daysAfterInstall}</span>
              </div>

              {/* Type Badge */}
              {result.type === 'bounty' && result.competitorBrands && (
                <div className="bg-[#FFD100]/10 border border-[#FFD100] rounded-lg p-3 mt-2">
                  <div className="text-sm font-medium text-[#0D274D] mb-1">
                    🏆 {t.result.bountyProgram}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t.result.replacementOf}: {result.competitorBrands.join(", ")}
                  </div>
                </div>
              )}

              {/* SKUs */}
              {result.skus.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {t.result.eligibleSkus}:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skus.map((sku) => (
                      <Badge key={sku.sku} variant="secondary" className="text-xs font-mono bg-[#F5F5F5] text-[#0D274D]">
                        {sku.sku}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions - GREEN buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                className="w-full bg-[#00A651] hover:bg-[#00953F] text-white"
                onClick={() => {
                  if (result && selectedCountryData) {
                    trackEvent("pdf_generated", {
                      product: result.name,
                      country: selectedCountryData.code,
                    });
                    generateRebatePDF({ rebate: result, country: selectedCountryData });
                  }
                }}
              >
                📄 {locale === "es" ? "Generar PDF" : "Generate PDF"}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                {selectedCountryData && (
                  <ShareMenu rebate={result} country={selectedCountryData} />
                )}
                <Button variant="outline" className="border-[#00A651] text-[#00A651] hover:bg-[#00A651]/10" asChild>
                  <Link href={`/terminos/${result.id}`}>
                    📋 {locale === "es" ? "Ver T&C" : "View T&C"}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Reset */}
            <Button variant="ghost" onClick={handleReset} className="w-full text-gray-500 hover:text-[#0D274D]">
              ← {t.common.newSearch}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Result */}
      {noResult && (
        <Card className="border border-gray-200 shadow-md bg-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-4xl">❌</div>
            <div>
              <h3 className="text-lg font-bold text-[#0D274D]">{t.result.notAvailable}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {t.result.notAvailableDesc}
              </p>
            </div>
            <Button variant="outline" onClick={handleReset} className="w-full border-[#0D274D] text-[#0D274D]">
              ← {t.common.newSearch}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
