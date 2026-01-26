"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Rebate, Country } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

interface ShareMenuProps {
  rebate: Rebate;
  country: Country;
  onGeneratePDF?: () => void;
}

export function ShareMenu({ rebate, country, onGeneratePDF }: ShareMenuProps) {
  const [copied, setCopied] = useState(false);

  // Build shareable URL with query params
  const getShareableUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      producto: rebate.id,
      pais: country.code,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Format date for messages
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // WhatsApp message
  const getWhatsAppMessage = () => {
    const message = `🔥 *Hot Deal Pentair - ${rebate.name}*

💰 Rebate: $${rebate.rebateAmount} ${rebate.currency} por unidad instalada

📅 Vigencia: hasta el ${formatDate(rebate.endDate)}

📋 Términos y condiciones: ${rebate.termsUrl}

🔗 Ver oferta: ${getShareableUrl()}`;
    return encodeURIComponent(message);
  };

  // Email subject and body
  const getEmailSubject = () => {
    return encodeURIComponent(`Hot Deal Pentair - ${rebate.name} - $${rebate.rebateAmount} ${rebate.currency}`);
  };

  const getEmailBody = () => {
    const body = `¡Hola!

Te comparto este Hot Deal de Pentair:

Producto: ${rebate.name}
Rebate: $${rebate.rebateAmount} ${rebate.currency} por unidad instalada
Vigencia: hasta el ${formatDate(rebate.endDate)}

Términos y condiciones: ${rebate.termsUrl}

Ver oferta completa: ${getShareableUrl()}

¡Saludos!`;
    return encodeURIComponent(body);
  };

  // Share via WhatsApp
  const handleWhatsApp = () => {
    trackEvent("share_whatsapp", {
      product: rebate.name,
      country: country.code,
    });
    const url = `https://wa.me/?text=${getWhatsAppMessage()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Share via Email
  const handleEmail = () => {
    trackEvent("share_email", {
      product: rebate.name,
      country: country.code,
    });
    const mailtoUrl = `mailto:?subject=${getEmailSubject()}&body=${getEmailBody()}`;
    window.open(mailtoUrl, "_self");
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareableUrl());
      trackEvent("share_copy_link", {
        product: rebate.name,
        country: country.code,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (onGeneratePDF) {
      onGeneratePDF();
    } else {
      // Placeholder - show alert if PDF generator not connected
      alert("Generador de PDF próximamente disponible");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-pentair-600 border-pentair-600">
          📤 Compartir
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem onClick={handleWhatsApp} className="cursor-pointer">
          <span className="text-lg mr-2">💬</span>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEmail} className="cursor-pointer">
          <span className="text-lg mr-2">📧</span>
          Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <span className="text-lg mr-2">{copied ? "✅" : "🔗"}</span>
          {copied ? "¡Copiado!" : "Copiar link"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer">
          <span className="text-lg mr-2">📥</span>
          Descargar PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
