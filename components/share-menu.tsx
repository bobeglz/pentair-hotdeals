"use client";

import { useState } from "react";
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
}

export function ShareMenu({ rebate, country }: ShareMenuProps) {
  const [copied, setCopied] = useState(false);

  // Build shareable URL with query params
  const getShareableUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://pentairlatam.com";
    const params = new URLSearchParams({
      producto: rebate.id,
      pais: country.code,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Get terms URL (internal)
  const getTermsUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://pentairlatam.com";
    return `${baseUrl}/terminos/${rebate.id}`;
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

💰 Rebate: *$${rebate.rebateAmount} ${rebate.currency}* por unidad instalada

📅 Válido hasta: ${formatDate(rebate.endDate)}

🔗 Ver detalles: ${getShareableUrl()}

📋 Términos: ${getTermsUrl()}`;
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
Válido hasta: ${formatDate(rebate.endDate)}

Ver detalles de la oferta:
${getShareableUrl()}

Términos y condiciones:
${getTermsUrl()}

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full border border-[#00A651] text-[#00A651] text-xs font-semibold py-2.5 px-3 rounded-lg text-center active:bg-[#00A651]/10">
          📤 Enviar
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-52">
        <DropdownMenuItem onClick={handleWhatsApp} className="cursor-pointer">
          <span className="text-lg mr-2">💬</span>
          Enviar por WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEmail} className="cursor-pointer">
          <span className="text-lg mr-2">📧</span>
          Enviar por Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <span className="text-lg mr-2">{copied ? "✅" : "🔗"}</span>
          {copied ? "¡Link copiado!" : "Copiar link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
