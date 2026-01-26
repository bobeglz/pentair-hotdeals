import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pentair Hot Deals | LATAM",
  description: "Consulta rebates de productos Pentair para Latinoamérica",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pentair Hot Deals",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#005A8C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          defer
          data-domain="pentairlatam.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
