"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
};

interface CalculatorProps {
  data: RebatesData;
}

export function Calculator({ data }: CalculatorProps) {
  const searchParams = useSearchParams();
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
    return new Date(dateStr).toLocaleDateString("es-MX", {
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
      <Card className="border-0 shadow-lg">
        <CardHeader className="pentair-gradient text-white rounded-t-xl pb-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            🔥 Hot Deals
          </CardTitle>
          <CardDescription className="text-pentair-100">
            Encuentra rebates disponibles para tu región
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Country Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              ¿En qué país?
            </label>
            <Select value={selectedCountry} onValueChange={(v) => {
              setSelectedCountry(v);
              setResult(null);
              setNoResult(false);
            }}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Seleccionar país" />
              </SelectTrigger>
              <SelectContent>
                {data.countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              ¿Qué producto buscas?
            </label>
            <Select value={selectedProduct} onValueChange={(v) => {
              setSelectedProduct(v);
              setResult(null);
              setNoResult(false);
            }}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Seleccionar producto" />
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

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            disabled={!selectedCountry || !selectedProduct}
            className="w-full h-12 text-base font-semibold bg-pentair-600 hover:bg-pentair-700"
          >
            🔍 Buscar Rebate
          </Button>
        </CardContent>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6 space-y-4">
            {/* Success Header */}
            <div className="flex items-center gap-2 text-success">
              <span className="text-2xl">✅</span>
              <span className="text-lg font-bold">¡REBATE DISPONIBLE!</span>
            </div>

            {/* Product Image */}
            {productImages[result.id] && (
              <div className="flex justify-center">
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
                <h3 className="text-xl font-bold text-foreground">{result.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{result.description}</p>
            </div>

            {/* Amount */}
            <div className="bg-pentair-50 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold text-pentair-700">
                ${result.rebateAmount} <span className="text-lg">{result.currency}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                por unidad instalada
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {/* Country */}
              <div className="flex items-center gap-2 text-sm">
                <span>{selectedCountryData?.flag}</span>
                <span className="text-muted-foreground">País:</span>
                <span className="font-medium">{selectedCountryData?.name}</span>
              </div>

              {/* Validity */}
              <div className="flex items-center gap-2 text-sm">
                <span>📅</span>
                <span className="text-muted-foreground">Válido hasta:</span>
                <span className="font-medium">{formatDate(result.endDate)}</span>
                {daysUntilEnd(result.endDate) <= 30 && (
                  <Badge variant="outline" className="text-warning border-warning text-xs">
                    ⚠️ {daysUntilEnd(result.endDate)} días
                  </Badge>
                )}
              </div>

              {/* Payment */}
              <div className="flex items-center gap-2 text-sm">
                <span>💳</span>
                <span className="text-muted-foreground">Pago:</span>
                <span className="font-medium">{result.paymentMethod}</span>
              </div>

              {/* Submission Deadline */}
              <div className="flex items-center gap-2 text-sm">
                <span>⏰</span>
                <span className="text-muted-foreground">Plazo de envío:</span>
                <span className="font-medium">{result.submissionDeadlineDays} días después de instalación</span>
              </div>

              {/* Type Badge */}
              {result.type === 'bounty' && result.competitorBrands && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                  <div className="text-sm font-medium text-amber-800 mb-1">
                    🏆 Programa Bounty
                  </div>
                  <div className="text-xs text-amber-700">
                    Reemplazo de marcas: {result.competitorBrands.join(", ")}
                  </div>
                </div>
              )}

              {/* SKUs */}
              {result.skus.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    SKUs elegibles:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skus.map((sku) => (
                      <Badge key={sku.sku} variant="secondary" className="text-xs font-mono">
                        {sku.sku}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <Button className="w-full bg-pentair-600 hover:bg-pentair-700">
                📄 Generar PDF
              </Button>
              <div className="grid grid-cols-2 gap-2">
                {selectedCountryData && (
                  <ShareMenu rebate={result} country={selectedCountryData} />
                )}
                <Button variant="outline" asChild>
                  <a href={result.termsUrl} target="_blank" rel="noopener noreferrer">
                    📋 Ver T&C
                  </a>
                </Button>
              </div>
            </div>

            {/* Reset */}
            <Button variant="ghost" onClick={handleReset} className="w-full text-muted-foreground">
              ← Nueva búsqueda
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Result */}
      {noResult && (
        <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-4xl">❌</div>
            <div>
              <h3 className="text-lg font-bold text-foreground">No disponible</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Este producto no tiene rebate activo en el país seleccionado.
              </p>
            </div>
            <Button variant="outline" onClick={handleReset} className="w-full">
              ← Nueva búsqueda
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
