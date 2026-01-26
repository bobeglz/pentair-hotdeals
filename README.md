# Pentair Hot Deals App

> Herramienta digital para el equipo de ventas de Pentair LATAM

## 🎯 Objetivo

Permitir al equipo de ventas consultar y compartir información de rebates de forma instantánea durante interacciones con clientes y dealers.

## 🛠 Stack Técnico

- **Framework:** Next.js 14 (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **Tipografía:** Inter (Google Fonts)
- **Icons:** Lucide React
- **PDF:** jsPDF / React-PDF
- **Analytics:** Plausible
- **Hosting:** Vercel
- **Dominio:** pentairlatam.com

## 📁 Estructura del Proyecto

```
pentair-hotdeals-app/
├── README.md
├── docs/
│   ├── BRAND_TOKENS.md      # Guía de diseño y colores
│   ├── REQUIREMENTS.md      # Especificación funcional
│   └── mockups/             # Diseños de referencia
├── assets/
│   ├── logos/               # Logos Pentair oficiales
│   └── pdfs/                # PDFs de referencia (rebates, guidelines)
├── data/
│   └── rebates.json         # Datos de promociones
├── src/
│   └── (Next.js app)
└── public/
    └── (assets estáticos)
```

## 🚀 Fases de Desarrollo

### Fase 1: PWA + Calculadora (Semana 1-2)
- [ ] Setup Next.js + shadcn + Tailwind
- [ ] Configurar colores Pentair
- [ ] Calculadora de rebates (home)
- [ ] Vista de tabla completa
- [ ] Generador de PDF
- [ ] Compartir (WhatsApp, Email, Link)
- [ ] Modo offline (PWA)
- [ ] Analytics

### Fase 2: Bot WhatsApp (Semana 3-4)
- [ ] Configurar WhatsApp Business API
- [ ] Bot de consulta de rebates
- [ ] Envío de PDFs
- [ ] Comandos naturales

## 🎨 Colores Pentair

```css
--pentair-dark: #005A8C;
--pentair-primary: #0077B3;
--pentair-light: #00A3E0;
--pentair-turquoise: #4FC3DC;
--pentair-gold: #FFD700;
```

## 📊 Datos de Rebates

Ver `data/rebates.json` para estructura de datos.

**Promociones activas:**
- Calentadores (ETi, MasterTemp) — hasta $400
- Filtros (Clean & Clear) — hasta $100
- Bombas (IntelliFlo3, IntelliPro3) — $100

**Países participantes:**
🇺🇸 USA, 🇵🇷 Puerto Rico, 🇲🇽 México, 🇨🇷 Costa Rica, 🇪🇨 Ecuador, 🇸🇻 El Salvador, 🇬🇹 Guatemala, 🇭🇳 Honduras, 🇯🇲 Jamaica, 🇵🇪 Perú

## 👥 Equipo

- **Cliente:** Pentair LATAM (Ana Wong, Adrián Sánchez)
- **Desarrollo:** Plexiz Media

## 📝 Licencia

Proyecto privado para Pentair Pool.
