# Pentair Hot Deals - LATAM

PWA para el equipo de ventas de Pentair LATAM para consultar y compartir información de rebates durante interacciones con clientes y dealers.

## 🎯 Problema que resuelve

> Adrián estaba en Houston en un evento de Pulcor. Un dealer le pregunta sobre rebates. Adrián saca el teléfono y... no encuentra la info fácil. Tiene que buscar entre PDFs, abrir documentos, scrollear. Pierde el momento de venta.

**Esta app permite:**
- Respuesta instantánea: "¿IntelliFlo tiene rebate en México?" → SÍ, $100
- Contexto completo: SKUs, vigencia, condiciones
- Algo para mostrar al cliente: PDF profesional
- Algo que el cliente se lleve: WhatsApp, Email, Link

## 📱 Páginas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Calculadora | `/` | Buscar rebate por producto + país |
| Lista | `/tabla` | Ver todos los rebates con filtro por país |
| FAQ | `/faq` | Preguntas frecuentes sobre el programa |
| Términos | `/terminos/[id]` | T&C por producto (PDFs embebidos) |

## 🔥 Funcionalidades

### Calculadora
- Selección de producto y país
- Filtrado bidireccional (producto ↔ país)
- Resultado con monto, vigencia, SKUs, condiciones
- Generación de PDF con branding Pentair
- Compartir por WhatsApp/Email/Link

### Lista de Rebates
- Vista mobile-first con cards expandibles
- Filtro por país (sticky)
- Fotos de productos al expandir
- Acciones rápidas: PDF, Enviar, T&C
- Si no hay país seleccionado, pide seleccionar antes de generar PDF

### FAQ
- Preguntas frecuentes adaptadas para LATAM
- Información de contacto de soporte
- Links rápidos a otras secciones

### PDF Generator
- Diseño profesional con branding Pentair
- Colores de marca (#005A8C, #0077B3, #00A3E0)
- QR code para registro
- País específico (no genérico)

## 🌎 Países Participantes

| Código | País | Productos |
|--------|------|-----------|
| US | Estados Unidos | Todos |
| CA | Canadá | Todos |
| MX | México | Todos excepto IntelliChlor (solo US) e IntelliVibe (US, CA) |
| PR | Puerto Rico | Filtros |
| AN | Antillas | Calentadores, Bombas, Filtros |
| CR | Costa Rica | Calentadores, Bombas, Filtros |
| EC | Ecuador | Calentadores, Bombas, Filtros |
| SV | El Salvador | Calentadores, Bombas, Filtros |
| GT | Guatemala | Calentadores, Bombas, Filtros |
| HN | Honduras | Calentadores, Bombas, Filtros |
| JM | Jamaica | Calentadores, Bombas, Filtros |
| PE | Perú | Calentadores, Bombas, Filtros |
| TT | Trinidad y Tobago | Calentadores, Bombas, Filtros |

**Restricciones por producto:**
- **IntelliChlor**: Solo Estados Unidos
- **IntelliVibe**: Solo Estados Unidos y Canadá

## 💰 Rebates Disponibles (Q1 2026)

| Categoría | Producto | Monto | Vigencia |
|-----------|----------|-------|----------|
| 🔥 Calentadores | ETi® 400/250 | $400 USD | Nov 13, 2025 - May 31, 2026 |
| 🔥 Calentadores | MasterTemp®/Max-E-Therm® | $250 USD | Nov 13, 2025 - May 31, 2026 |
| 🧼 Filtros | Clean & Clear® Plus 320/420/520 | $100 USD | Dec 8, 2025 - May 31, 2026 |
| 🧼 Filtros | FullFloXF™ C620 | $100 USD | Dec 8, 2025 - May 31, 2026 |
| 🧼 Filtros | Tritón® II TR60 | $100 USD | Dec 8, 2025 - May 31, 2026 |
| 🧼 Filtros | Clean & Clear® RP 100/150/200 | $50 USD | Dec 8, 2025 - May 31, 2026 |
| 💧 Bombas | IntelliFlo3® VSF | $100 USD | Dec 8, 2025 - May 31, 2026 |
| 💧 Bombas | IntelliPro3® VSF | $100 USD | Dec 8, 2025 - May 31, 2026 |
| 💡 Iluminación | IntelliVibe® | $55 USD | Dec 8, 2025 - May 31, 2026 |
| ⚡ Cloradores | IntelliChlor® Plus/LT | $100 USD | Dec 8, 2025 - May 31, 2026 |

## 🛠 Stack Técnico

- **Framework**: Next.js 16.1 (App Router, Turbopack)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **PDF Generation**: jsPDF + QRCode
- **Analytics**: Custom trackEvent
- **Deploy**: Vercel
- **Dominio**: pentairlatam.com (pendiente configurar)

## 📁 Estructura del Proyecto

```
pentair-hotdeals-app/
├── app/
│   ├── page.tsx           # Calculadora (home)
│   ├── tabla/page.tsx     # Lista de rebates
│   ├── faq/page.tsx       # Preguntas frecuentes
│   └── terminos/[id]/     # Términos por producto
├── components/
│   ├── calculator.tsx     # Componente calculadora
│   ├── share-menu.tsx     # Menú compartir
│   └── pdf-generator.tsx  # Generador de PDF
├── data/
│   └── rebates.json       # Datos de rebates
├── public/
│   ├── products/          # Imágenes de productos
│   ├── logos/             # Logos Pentair
│   └── terms/             # PDFs de T&C
└── docs/
    ├── 42. Hot Deals/     # Documentación original
    ├── BRAND_TOKENS.md    # Guía de marca
    └── requisitos formales.md
```

## 🚀 Deploy

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Deploy a Vercel
npx vercel --prod
```

## 📋 Actualizar Rebates

1. Editar `data/rebates.json`
2. Copiar a `public/data/rebates.json`
3. Deploy

## 🎨 Brand Guidelines

### Colores Pentair
- **Blue Dark**: #005A8C (headers, CTAs)
- **Blue**: #0077B3 (links, botones)
- **Blue Light**: #00A3E0 (acentos)
- **Green**: #00A651 (éxito, confirmaciones)
- **Gold**: #FFD100 (badges, destacados)

### Logos
- `pentair-logo.png` - Fondo claro
- `pentair-logo-white.png` - Fondo oscuro

## 📞 Soporte

- **Email**: marketing.pool@pentair.com
- **Portal**: www.pentair.com/hotdeals
- **T&C LATAM**: www.pentair.com/latrebate

## 🌐 Internacionalización (i18n)

La app soporta **Español** e **Inglés** con:

- **Detección automática** del idioma del navegador
- **Toggle manual** en el header (🇪🇸/🇺🇸)
- **Persistencia** en localStorage

### Archivos de traducción
- `lib/i18n/es.json` - Español
- `lib/i18n/en.json` - Inglés

### Uso en componentes
```tsx
import { useI18n } from "@/lib/i18n/context";

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  return <h1>{t.home.title}</h1>;
}
```

## 📅 Historial

- **2026-01-26**: Versión inicial
  - Calculadora de rebates
  - Lista mobile-first con cards
  - Generador de PDF
  - FAQs para LATAM
  - Términos y condiciones internos
