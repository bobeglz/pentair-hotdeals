"use client";

import jsPDF from "jspdf";
import QRCode from "qrcode";
import { Rebate, Country } from "@/lib/types";

// Pentair brand colors
const PENTAIR_COLORS = {
  dark: "#005A8C",    // Primary dark blue
  medium: "#0077B3",  // Medium blue
  light: "#00A3E0",   // Light blue
  white: "#FFFFFF",
  gray: "#666666",
  lightGray: "#EEEEEE",
};

interface GeneratePDFParams {
  rebate: Rebate;
  country: Country;
}

// Convert image URL to base64
async function getImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Generate QR code as base64
async function generateQRCode(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      width: 150,
      margin: 1,
      color: {
        dark: PENTAIR_COLORS.dark,
        light: PENTAIR_COLORS.white,
      },
    });
  } catch {
    console.error("Error generating QR code");
    return "";
  }
}

export async function generateRebatePDF({ rebate, country }: GeneratePDFParams): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  // ========== HEADER SECTION ==========
  // Blue header background
  doc.setFillColor(0, 90, 140); // #005A8C
  doc.rect(0, 0, pageWidth, 50, "F");

  // Gradient effect (lighter band)
  doc.setFillColor(0, 119, 179); // #0077B3
  doc.rect(0, 35, pageWidth, 15, "F");

  // Logo Pentair (white version)
  try {
    const logoBase64 = await getImageAsBase64("/logos/pentair-logo-white.png");
    doc.addImage(logoBase64, "PNG", margin, 10, 50, 18);
  } catch {
    // Fallback: text logo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("PENTAIR", margin, 25);
  }

  // Hot Deals badge
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - margin - 40, 12, 40, 12, 3, 3, "F");
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("🔥 HOT DEAL", pageWidth - margin - 20, 20, { align: "center" });

  // Program title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PROGRAMA DE REBATES", margin, 43);

  yPos = 60;

  // ========== PRODUCT SECTION ==========
  // Product name
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(rebate.name, margin, yPos);
  yPos += 8;

  // Product description
  doc.setTextColor(102, 102, 102);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(rebate.description, contentWidth);
  doc.text(descLines, margin, yPos);
  yPos += descLines.length * 5 + 8;

  // ========== REBATE AMOUNT BOX ==========
  // Background box
  doc.setFillColor(240, 248, 255); // Light blue tint
  doc.roundedRect(margin, yPos, contentWidth, 35, 4, 4, "F");
  
  // Border
  doc.setDrawColor(0, 163, 224); // #00A3E0
  doc.setLineWidth(1);
  doc.roundedRect(margin, yPos, contentWidth, 35, 4, 4, "S");

  // Amount
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  const amountText = `$${rebate.rebateAmount} ${rebate.currency}`;
  doc.text(amountText, pageWidth / 2, yPos + 20, { align: "center" });

  // Per unit text
  doc.setTextColor(102, 102, 102);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("por unidad instalada", pageWidth / 2, yPos + 30, { align: "center" });

  yPos += 45;

  // ========== DETAILS SECTION ==========
  const leftCol = margin;
  const rightCol = margin + contentWidth / 2 + 10;

  // Section title
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Detalles del Rebate", leftCol, yPos);
  yPos += 10;

  // Details box
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(margin, yPos, contentWidth, 55, 3, 3, "F");
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, contentWidth, 55, 3, 3, "S");

  const detailY = yPos + 8;
  const lineHeight = 8;

  // Left column details
  doc.setFontSize(9);
  doc.setTextColor(102, 102, 102);
  doc.setFont("helvetica", "normal");
  doc.text("País:", leftCol + 5, detailY);
  doc.setTextColor(51, 51, 51);
  doc.setFont("helvetica", "bold");
  doc.text(`${country.flag} ${country.name}`, leftCol + 25, detailY);

  doc.setTextColor(102, 102, 102);
  doc.setFont("helvetica", "normal");
  doc.text("Válido desde:", leftCol + 5, detailY + lineHeight);
  doc.setTextColor(51, 51, 51);
  doc.setFont("helvetica", "bold");
  doc.text(formatDate(rebate.startDate), leftCol + 35, detailY + lineHeight);

  doc.setTextColor(102, 102, 102);
  doc.setFont("helvetica", "normal");
  doc.text("Válido hasta:", leftCol + 5, detailY + lineHeight * 2);
  doc.setTextColor(0, 90, 140);
  doc.setFont("helvetica", "bold");
  doc.text(formatDate(rebate.endDate), leftCol + 35, detailY + lineHeight * 2);

  // Right column details
  doc.setTextColor(102, 102, 102);
  doc.setFont("helvetica", "normal");
  doc.text("Tipo:", rightCol, detailY);
  doc.setTextColor(51, 51, 51);
  doc.setFont("helvetica", "bold");
  doc.text(rebate.type === "bounty" ? "Bounty" : rebate.type === "upgrade" ? "Upgrade" : "Standard", rightCol + 15, detailY);

  doc.setTextColor(102, 102, 102);
  doc.setFont("helvetica", "normal");
  doc.text("Forma de pago:", rightCol, detailY + lineHeight);
  doc.setTextColor(51, 51, 51);
  doc.setFont("helvetica", "bold");
  doc.text(rebate.paymentMethod, rightCol + 35, detailY + lineHeight);

  doc.setTextColor(102, 102, 102);
  doc.setFont("helvetica", "normal");
  doc.text("Plazo de envío:", rightCol, detailY + lineHeight * 2);
  doc.setTextColor(51, 51, 51);
  doc.setFont("helvetica", "bold");
  doc.text(`${rebate.submissionDeadlineDays} días`, rightCol + 35, detailY + lineHeight * 2);

  // Competitor brands (for bounty)
  if (rebate.type === "bounty" && rebate.competitorBrands) {
    doc.setTextColor(102, 102, 102);
    doc.setFont("helvetica", "normal");
    doc.text("Marcas elegibles:", leftCol + 5, detailY + lineHeight * 3 + 4);
    doc.setTextColor(51, 51, 51);
    doc.setFont("helvetica", "bold");
    const brandsText = rebate.competitorBrands.join(", ");
    doc.text(brandsText, leftCol + 45, detailY + lineHeight * 3 + 4);
  }

  yPos += 65;

  // ========== SKUS SECTION ==========
  if (rebate.skus.length > 0) {
    doc.setTextColor(0, 90, 140);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SKUs Elegibles", leftCol, yPos);
    yPos += 8;

    // SKU badges
    const skuBoxHeight = Math.ceil(rebate.skus.length / 4) * 10 + 10;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, yPos, contentWidth, skuBoxHeight, 3, 3, "F");
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(margin, yPos, contentWidth, skuBoxHeight, 3, 3, "S");

    let skuX = leftCol + 5;
    let skuY = yPos + 8;
    const skuWidth = (contentWidth - 20) / 4;

    rebate.skus.forEach((sku, index) => {
      // SKU badge background
      doc.setFillColor(0, 90, 140);
      doc.roundedRect(skuX, skuY - 4, skuWidth - 3, 8, 2, 2, "F");
      
      // SKU text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text(sku.sku, skuX + (skuWidth - 3) / 2, skuY, { align: "center" });

      skuX += skuWidth;
      if ((index + 1) % 4 === 0) {
        skuX = leftCol + 5;
        skuY += 10;
      }
    });

    yPos += skuBoxHeight + 10;
  }

  // ========== TERMS SECTION ==========
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Condiciones", leftCol, yPos);
  yPos += 8;

  doc.setFillColor(255, 251, 235); // Light amber for terms
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, "F");
  doc.setDrawColor(217, 177, 54);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, "S");

  const terms = [
    "• Aplica solo para productos nuevos instalados en el periodo de vigencia",
    "• Requiere prueba de compra y registro de instalación",
    "• Un rebate por unidad instalada",
    `• Enviar solicitud dentro de ${rebate.submissionDeadlineDays} días posteriores a la instalación`,
  ];

  doc.setTextColor(102, 77, 20);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  terms.forEach((term, i) => {
    doc.text(term, leftCol + 5, yPos + 7 + i * 7);
  });

  yPos += 45;

  // ========== QR CODE SECTION ==========
  // QR Code box on the right
  const qrSize = 35;
  const qrX = pageWidth - margin - qrSize - 5;
  const qrY = yPos;

  // Generate QR code
  const registrationUrl = rebate.termsUrl || "https://pentair.com/rebates";
  const qrCodeBase64 = await generateQRCode(registrationUrl);
  
  if (qrCodeBase64) {
    doc.addImage(qrCodeBase64, "PNG", qrX, qrY, qrSize, qrSize);
  }

  // QR label
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Escanea para registrar", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" });

  // CTA text next to QR
  doc.setTextColor(0, 90, 140);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("¿Listo para reclamar tu rebate?", leftCol, yPos + 10);
  
  doc.setTextColor(102, 102, 102);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Escanea el código QR o visita:", leftCol, yPos + 18);
  
  doc.setTextColor(0, 119, 179);
  doc.setFont("helvetica", "bold");
  const shortUrl = registrationUrl.length > 50 ? registrationUrl.substring(0, 47) + "..." : registrationUrl;
  doc.text(shortUrl, leftCol, yPos + 26);

  // ========== FOOTER ==========
  const footerY = pageHeight - 20;

  // Footer line
  doc.setDrawColor(0, 163, 224);
  doc.setLineWidth(1);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  // Generation date
  doc.setTextColor(153, 153, 153);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const generationDate = new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`Generado el: ${generationDate}`, leftCol, footerY);

  // Pentair copyright
  doc.text("© Pentair - Todos los derechos reservados", pageWidth / 2, footerY, { align: "center" });

  // Document ID
  const docId = `REF: ${rebate.id.toUpperCase()}-${country.code}-${Date.now().toString(36).toUpperCase()}`;
  doc.text(docId, pageWidth - margin, footerY, { align: "right" });

  // ========== SAVE PDF ==========
  const fileName = `pentair-rebate-${slugify(rebate.name)}-${country.code.toLowerCase()}.pdf`;
  doc.save(fileName);
}

// Helper function to format dates
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Helper function to create URL-safe slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
