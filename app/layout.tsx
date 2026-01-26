import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OfflineBanner } from "@/components/OfflineBanner";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

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
  icons: {
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Pentair Hot Deals LATAM",
    description: "Consulta rebates de productos Pentair",
    images: ["/logos/pentair-logo.png"],
    type: "website",
    locale: "es_MX",
    siteName: "Pentair Hot Deals",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pentair Hot Deals LATAM",
    description: "Consulta rebates de productos Pentair",
    images: ["/logos/pentair-logo.png"],
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ServiceWorkerRegistration />
        <OfflineBanner />
        {children}
      </body>
    </html>
  );
}
