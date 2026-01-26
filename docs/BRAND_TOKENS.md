# Pentair Pool — Brand Tokens

> Extraído de los Brand Guidelines oficiales de Pentair Pool

---

## 🎨 Colores

### Primarios
| Nombre | Hex | RGB | Uso |
|--------|-----|-----|-----|
| **Pentair Blue Dark** | `#005A8C` | 0, 90, 140 | Fondos principales, headers |
| **Pentair Blue** | `#0077B3` | 0, 119, 179 | Botones primarios, links |
| **Pentair Blue Light** | `#00A3E0` | 0, 163, 224 | Acentos, hover states |
| **Pentair Turquoise** | `#4FC3DC` | 79, 195, 220 | Elementos decorativos |

### Neutrales
| Nombre | Hex | Uso |
|--------|-----|-----|
| **White** | `#FFFFFF` | Texto sobre fondos oscuros, fondos claros |
| **Gray 50** | `#F8FAFC` | Fondos de sección |
| **Gray 100** | `#F1F5F9` | Fondos de tabla |
| **Gray 200** | `#E2E8F0` | Bordes |
| **Gray 500** | `#64748B` | Texto secundario |
| **Gray 900** | `#0F172A` | Texto principal |

### Estados / Semánticos
| Nombre | Hex | Uso |
|--------|-----|-----|
| **Success** | `#22C55E` | Rebate disponible, confirmaciones |
| **Warning** | `#F59E0B` | Fechas próximas a vencer |
| **Error** | `#EF4444` | No disponible, errores |
| **Gold** | `#FFD700` | CTAs destacados, badges |

---

## 🔤 Tipografía

### Font Family
**Primaria:** `Inter` (Google Fonts) — alternativa moderna a Gotham/Proxima Nova
**Monospace:** `JetBrains Mono` — para SKUs y códigos

### Escala Tipográfica (Tailwind)
| Nombre | Size | Weight | Uso |
|--------|------|--------|-----|
| `display` | 36px / 2.25rem | 700 | Hero titles |
| `h1` | 30px / 1.875rem | 700 | Page titles |
| `h2` | 24px / 1.5rem | 600 | Section titles |
| `h3` | 20px / 1.25rem | 600 | Card titles |
| `body` | 16px / 1rem | 400 | Body text |
| `small` | 14px / 0.875rem | 400 | Captions, labels |
| `xs` | 12px / 0.75rem | 500 | Badges, tags |

---

## 📐 Logo

### Archivos disponibles
- `pentair-logo.png` — Logo principal (fondo claro)
- `pentair-logo-white.png` — Logo blanco (fondo oscuro)
- `pentair-app-icon.png` — Icono para PWA

### Espaciado mínimo
- Área de protección: 1x altura del icono en todos los lados
- Tamaño mínimo: 120px de ancho

### Uso
- Header: Logo blanco sobre fondo Pentair Blue Dark
- Footer: Logo color sobre fondo blanco
- Favicon/PWA: App icon

---

## 🔲 Componentes shadcn/ui

### Configuración de colores para `tailwind.config.js`
```js
colors: {
  pentair: {
    50: '#E6F4FA',
    100: '#CCE9F5',
    200: '#99D3EB',
    300: '#66BDE1',
    400: '#33A7D7',
    500: '#00A3E0', // Pentair Blue Light
    600: '#0077B3', // Pentair Blue
    700: '#005A8C', // Pentair Blue Dark
    800: '#004A73',
    900: '#003A5A',
  },
  gold: '#FFD700',
}
```

### Tema de componentes
```js
// Button primary
bg-pentair-600 hover:bg-pentair-700 text-white

// Button secondary
bg-white border-pentair-600 text-pentair-600 hover:bg-pentair-50

// Card
bg-white border border-gray-200 rounded-xl shadow-sm

// Badge success
bg-green-100 text-green-800

// Badge warning
bg-amber-100 text-amber-800

// Input
border-gray-300 focus:border-pentair-500 focus:ring-pentair-500
```

---

## 🎯 Elementos Gráficos

### Formas características
- Diagonales (ángulo ~15°) como elemento decorativo
- Gradientes azules sutiles
- Bordes redondeados (`rounded-xl` / 12px)

### Iconografía
- Lucide Icons (incluido en shadcn)
- Estilo: Outline, 24px, stroke-width 2

### Sombras
```js
shadow: {
  'card': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  'card-hover': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
}
```

---

## 📱 PWA

### Manifest colors
```json
{
  "theme_color": "#005A8C",
  "background_color": "#FFFFFF"
}
```

### Splash screen
- Fondo: Pentair Blue Dark (#005A8C)
- Logo: Centrado, blanco

---

## ✅ Do's and Don'ts

### ✅ Do
- Usar azules Pentair como colores dominantes
- Mantener alto contraste para legibilidad
- Usar el logo sobre fondos sólidos
- Respetar el área de protección del logo

### ❌ Don't
- Modificar los colores del logo
- Usar el logo sobre fondos complejos/fotos
- Combinar con colores que no sean de la paleta
- Distorsionar las proporciones del logo
