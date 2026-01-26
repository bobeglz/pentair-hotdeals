"use client";

import jsPDF from "jspdf";
import QRCode from "qrcode";
import { Rebate, Country } from "@/lib/types";

// Pentair Brand Colors (from BRAND_TOKENS.md)
const COLORS = {
  blueDark: [0, 90, 140] as const,      // #005A8C
  blue: [0, 119, 179] as const,          // #0077B3
  blueLight: [0, 163, 224] as const,     // #00A3E0
  turquoise: [79, 195, 220] as const,    // #4FC3DC
  gold: [255, 215, 0] as const,          // #FFD700
  white: [255, 255, 255] as const,
  gray50: [248, 250, 252] as const,
  gray500: [100, 116, 139] as const,
  gray900: [15, 23, 42] as const,
  success: [34, 197, 94] as const,       // #22C55E
};

interface GeneratePDFParams {
  rebate: Rebate;
  country: Country;
}

// Convert image to base64
async function getImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

// Generate QR code
async function generateQRCode(url: string): Promise<string | null> {
  try {
    return await QRCode.toDataURL(url, {
      width: 120,
      margin: 1,
      color: { dark: "#005A8C", light: "#FFFFFF" },
    });
  } catch {
    return null;
  }
}

export async function generateRebatePDF({ rebate, country }: GeneratePDFParams): Promise<void> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // ===== HEADER (40mm) =====
  // Blue dark background
  doc.setFillColor(...COLORS.blueDark);
  doc.rect(0, 0, pageWidth, 40, "F");

  // Diagonal accent
  doc.setFillColor(...COLORS.blue);
  doc.triangle(pageWidth - 60, 0, pageWidth, 0, pageWidth, 40, "F");

  // Try to load logo
  const logoBase64 = await getImageAsBase64("/logos/pentair-logo-white.png");
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", margin, 8, 45, 15);
  } else {
    doc.setTextColor(...COLORS.white);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("PENTAIR", margin, 20);
  }

  // Hot Deals text
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("HOT DEALS", margin, 32);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Programa de Rebates Q1 2026", margin, 37);

  // Gold badge
  doc.setFillColor(...COLORS.gold);
  doc.roundedRect(pageWidth - margin - 35, 12, 35, 16, 3, 3, "F");
  doc.setTextColor(...COLORS.blueDark);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("REBATE", pageWidth - margin - 17.5, 19, { align: "center" });
  doc.setFontSize(12);
  doc.text(`$${rebate.rebateAmount}`, pageWidth - margin - 17.5, 26, { align: "center" });

  y = 48;

  // ===== PRODUCT SECTION =====
  doc.setTextColor(...COLORS.blueDark);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const nameLines = doc.splitTextToSize(rebate.name, contentWidth - 50);
  doc.text(nameLines, margin, y);
  y += nameLines.length * 7 + 2;

  doc.setTextColor(...COLORS.gray500);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(rebate.description, margin, y);
  y += 8;

  // Country tag
  doc.setFillColor(...COLORS.blueLight);
  doc.roundedRect(margin, y, 50, 7, 2, 2, "F");
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(country.name, margin + 25, y + 5, { align: "center" });
  y += 14;

  // ===== AMOUNT BOX =====
  doc.setFillColor(...COLORS.gray50);
  doc.setDrawColor(...COLORS.blueLight);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 28, 4, 4, "FD");

  doc.setTextColor(...COLORS.blueDark);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(`$${rebate.rebateAmount} ${rebate.currency}`, pageWidth / 2, y + 15, { align: "center" });

  doc.setTextColor(...COLORS.gray500);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("por unidad instalada", pageWidth / 2, y + 23, { align: "center" });
  y += 35;

  // ===== DETAILS =====
  doc.setTextColor(...COLORS.blueDark);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Detalles", margin, y);
  y += 6;

  doc.setFillColor(...COLORS.gray50);
  doc.roundedRect(margin, y, contentWidth, 28, 3, 3, "F");

  const col1 = margin + 4;
  const col2 = margin + contentWidth / 2 + 4;
  const dy = y + 6;

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gray500);
  doc.text("Vigencia", col1, dy);
  doc.text("Tipo", col1, dy + 8);
  doc.text("Plazo de envio", col1, dy + 16);
  doc.text("Pago", col2, dy);

  doc.setTextColor(...COLORS.gray900);
  doc.setFont("helvetica", "bold");
  doc.text(`${formatDate(rebate.startDate)} - ${formatDate(rebate.endDate)}`, col1 + 20, dy);
  doc.text(rebate.type === "bounty" ? "Bounty (Reemplazo)" : rebate.type === "upgrade" ? "Upgrade" : "Standard", col1 + 12, dy + 8);
  doc.text(`${rebate.submissionDeadlineDays} dias`, col1 + 32, dy + 16);
  doc.text("Tarjeta Mastercard", col2 + 12, dy);

  if (rebate.type === "bounty" && rebate.competitorBrands) {
    doc.setTextColor(...COLORS.gray500);
    doc.setFont("helvetica", "normal");
    doc.text("Marcas:", col2, dy + 8);
    doc.setTextColor(...COLORS.gray900);
    doc.setFont("helvetica", "bold");
    doc.text(rebate.competitorBrands.slice(0, 4).join(", "), col2 + 16, dy + 8);
  }
  y += 35;

  // ===== SKUs =====
  if (rebate.skus && rebate.skus.length > 0) {
    doc.setTextColor(...COLORS.blueDark);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("SKUs Elegibles", margin, y);
    y += 6;

    const skusPerRow = 5;
    const rows = Math.ceil(Math.min(rebate.skus.length, 10) / skusPerRow);
    const boxH = rows * 9 + 6;

    doc.setFillColor(...COLORS.gray50);
    doc.roundedRect(margin, y, contentWidth, boxH, 3, 3, "F");

    let sx = margin + 4;
    let sy = y + 6;
    const sw = (contentWidth - 16) / skusPerRow;

    rebate.skus.slice(0, 10).forEach((sku, i) => {
      doc.setFillColor(...COLORS.blueDark);
      doc.roundedRect(sx, sy - 3, sw - 2, 7, 1.5, 1.5, "F");
      doc.setTextColor(...COLORS.white);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(sku.sku, sx + (sw - 2) / 2, sy + 1.5, { align: "center" });

      sx += sw;
      if ((i + 1) % skusPerRow === 0) {
        sx = margin + 4;
        sy += 9;
      }
    });

    y += boxH + 7;
  }

  // ===== CONDITIONS =====
  doc.setTextColor(...COLORS.blueDark);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Condiciones", margin, y);
  y += 5;

  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(230, 190, 80);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, "FD");

  const terms = [
    "Productos nuevos instalados durante el periodo de vigencia",
    "Requiere prueba de compra y registro de instalacion",
    `Enviar solicitud dentro de ${rebate.submissionDeadlineDays} dias de la instalacion`,
  ];

  doc.setTextColor(100, 80, 30);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  terms.forEach((t, i) => doc.text("- " + t, margin + 4, y + 6 + i * 6));
  y += 28;

  // ===== CTA + QR =====
  const qrSize = 25;
  const qrX = pageWidth - margin - qrSize;

  // CTA
  doc.setFillColor(...COLORS.blueDark);
  doc.roundedRect(margin, y, contentWidth - qrSize - 8, 22, 3, 3, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Registra tu rebate", margin + 6, y + 8);

  doc.setTextColor(...COLORS.gold);
  doc.setFontSize(9);
  doc.text("www.pentair.com/hotdeals", margin + 6, y + 16);

  // QR
  const qrCode = await generateQRCode("https://www.pentair.com/hotdeals");
  if (qrCode) {
    doc.addImage(qrCode, "PNG", qrX, y - 2, qrSize, qrSize);
  }
  y += 28;

  // ===== FOOTER =====
  const footerY = pageHeight - 12;

  doc.setDrawColor(...COLORS.blueLight);
  doc.setLineWidth(0.8);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setTextColor(...COLORS.gray500);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");

  const genDate = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
  doc.text(`Generado: ${genDate}`, margin, footerY);
  doc.text("Pentair - Todos los derechos reservados", pageWidth / 2, footerY, { align: "center" });
  doc.text(`${rebate.id.toUpperCase()}-${country.code}`, pageWidth - margin, footerY, { align: "right" });

  // ===== SAVE =====
  doc.save(`pentair-rebate-${slugify(rebate.name)}-${country.code.toLowerCase()}.pdf`);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
