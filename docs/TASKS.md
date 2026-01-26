# Pentair Hot Deals — Tareas Atómicas

> Criterio de aceptación binario: ✅ Completo | ⬜ Pendiente

---

## 🏗️ FASE 1: PWA + Calculadora

### 1.0 Setup & Estructura
- [x] **T-001** Crear repo en GitHub (`bobeglz/pentair-hotdeals`)
- [x] **T-002** Inicializar Next.js 14+ con App Router
- [x] **T-003** Configurar Tailwind CSS
- [x] **T-004** Instalar shadcn/ui
- [x] **T-005** Crear `data/rebates.json` con todos los productos, países, SKUs
- [x] **T-006** Crear `docs/BRAND_TOKENS.md` con colores Pentair
- [x] **T-007** Configurar colores Pentair en CSS/Tailwind

### 1.1 Calculadora de Rebates (Home)
- [x] **T-101** Dropdown de selección de país (10 países con banderas)
- [x] **T-102** Dropdown de selección de producto (8 productos con íconos)
- [x] **T-103** Botón "Buscar Rebate"
- [x] **T-104** Card de resultado: muestra monto del rebate
- [x] **T-105** Card de resultado: muestra fecha de vigencia
- [x] **T-106** Card de resultado: muestra SKUs elegibles
- [x] **T-107** Card de resultado: muestra condiciones especiales (bounty/marcas competidoras)
- [x] **T-108** Card de resultado: muestra método de pago (tarjeta virtual)
- [x] **T-109** Card de resultado: muestra plazo de envío (60 días)
- [x] **T-110** Estado "No disponible" cuando no hay rebate para país/producto
- [x] **T-111** Badge de advertencia si quedan <30 días de vigencia
- [ ] **T-112** Mostrar imagen del producto en el resultado
- [ ] **T-113** Link funcional a términos y condiciones (abre URL externa)

### 1.2 Header & Branding
- [ ] **T-201** Integrar logo Pentair real en header (`assets/logos/pentair-logo-white.png`)
- [ ] **T-202** Mostrar fecha de última actualización en header
- [ ] **T-203** Header con gradiente Pentair (azul oscuro → azul claro)

### 1.3 Vista de Tabla Completa
- [ ] **T-301** Crear ruta `/tabla` o tab de navegación
- [ ] **T-302** Tabla con header sticky
- [ ] **T-303** Mostrar todos los rebates agrupados por categoría (Calentadores, Filtros, Bombas)
- [ ] **T-304** Columnas: Producto, SKU, Rebate, Vigencia, Condiciones
- [ ] **T-305** Filtro por país (botones o dropdown)
- [ ] **T-306** Filtro por categoría
- [ ] **T-307** Barra de países participantes con banderas
- [ ] **T-308** Sección de calentadores con badge "BOUNTY"
- [ ] **T-309** Lista de marcas competidoras para programa bounty
- [ ] **T-310** Nota explicativa de cómo participar

### 1.4 Generador de PDF
- [ ] **T-401** Instalar librería de PDF (jsPDF o @react-pdf/renderer)
- [ ] **T-402** Botón "Generar PDF" funcional en resultado
- [ ] **T-403** PDF incluye logo Pentair
- [ ] **T-404** PDF incluye nombre del producto
- [ ] **T-405** PDF incluye monto del rebate
- [ ] **T-406** PDF incluye fecha de vigencia
- [ ] **T-407** PDF incluye SKUs elegibles
- [ ] **T-408** PDF incluye condiciones/términos resumidos
- [ ] **T-409** PDF incluye QR a página de registro (pentair.com/hotdeals)
- [ ] **T-410** PDF incluye fecha de generación
- [ ] **T-411** PDF diseño limpio, 1 página, colores Pentair
- [ ] **T-412** Descargar PDF con nombre descriptivo (`pentair-rebate-intelliflo3-mx.pdf`)

### 1.5 Compartir
- [ ] **T-501** Botón "Compartir" abre menú de opciones
- [ ] **T-502** Opción WhatsApp: abre `wa.me` con mensaje pre-armado
- [ ] **T-503** Mensaje WhatsApp incluye: producto, rebate, vigencia, link
- [ ] **T-504** Opción Email: abre cliente de email con asunto y cuerpo
- [ ] **T-505** Email incluye: producto, rebate, vigencia, link a términos
- [ ] **T-506** Opción "Copiar link": copia URL con parámetros del resultado
- [ ] **T-507** URL compartible carga resultado automáticamente (`?producto=X&pais=Y`)
- [ ] **T-508** Opción "Descargar PDF" (reutiliza T-402)

### 1.6 PWA & Offline
- [ ] **T-601** Crear `manifest.json` con metadata correcta
- [ ] **T-602** Generar ícono PWA 192x192 desde `pentair-app-icon.png`
- [ ] **T-603** Generar ícono PWA 512x512 desde `pentair-app-icon.png`
- [ ] **T-604** Configurar `theme_color` (#005A8C)
- [ ] **T-605** Configurar `background_color` (#FFFFFF)
- [ ] **T-606** App instalable en iOS (Add to Home Screen)
- [ ] **T-607** App instalable en Android (Add to Home Screen)
- [ ] **T-608** Service Worker cachea `rebates.json`
- [ ] **T-609** App funciona sin conexión (muestra datos cacheados)
- [ ] **T-610** Indicador visual cuando está offline

### 1.7 Analytics / Tracking
- [ ] **T-701** Integrar Plausible o GA4
- [ ] **T-702** Evento: búsqueda realizada (producto + país)
- [ ] **T-703** Evento: PDF generado
- [ ] **T-704** Evento: compartido por WhatsApp
- [ ] **T-705** Evento: compartido por Email
- [ ] **T-706** Evento: link copiado
- [ ] **T-707** Tracking de dispositivo (móvil vs desktop)

### 1.8 Deploy & Dominio
- [ ] **T-801** Conectar repo a Vercel
- [ ] **T-802** Configurar dominio `pentairlatam.com` en Vercel
- [ ] **T-803** SSL activo (HTTPS)
- [ ] **T-804** Build exitoso en producción
- [ ] **T-805** App accesible en `https://pentairlatam.com`

### 1.9 Assets & Optimización
- [ ] **T-901** Copiar logos a `/public/logos/`
- [ ] **T-902** Copiar imágenes de productos a `/public/products/`
- [ ] **T-903** Optimizar imágenes (webp, tamaño apropiado)
- [ ] **T-904** Favicon desde logo Pentair
- [ ] **T-905** Meta tags Open Graph (título, descripción, imagen)
- [ ] **T-906** Meta tag `apple-mobile-web-app-capable`

---

## 🤖 FASE 2: Bot de WhatsApp (Posterior)

### 2.1 Infraestructura
- [ ] **T-2101** Obtener número de WhatsApp Business
- [ ] **T-2102** Configurar WhatsApp Business API (Twilio/360dialog)
- [ ] **T-2103** Crear endpoint webhook para mensajes entrantes
- [ ] **T-2104** Configurar respuestas automáticas

### 2.2 Funcionalidad Bot
- [ ] **T-2201** Comando: `rebate [producto] [país]` → responde con info
- [ ] **T-2202** Comando: `productos` → lista productos con rebate
- [ ] **T-2203** Comando: `paises` → lista países participantes
- [ ] **T-2204** Comando: `todos` → resumen de todos los rebates
- [ ] **T-2205** Comando: `ayuda` → instrucciones de uso
- [ ] **T-2206** Bot envía PDF adjunto cuando se solicita
- [ ] **T-2207** Bot entiende variaciones ("intelliflo", "intelli flo", "bomba vs")
- [ ] **T-2208** Bot sugiere alternativas si no encuentra match exacto

---

## 📊 Resumen de Progreso

| Sección | Completadas | Total | % |
|---------|-------------|-------|---|
| 1.0 Setup | 7 | 7 | 100% |
| 1.1 Calculadora | 11 | 13 | 85% |
| 1.2 Header | 0 | 3 | 0% |
| 1.3 Vista Tabla | 0 | 10 | 0% |
| 1.4 PDF | 0 | 12 | 0% |
| 1.5 Compartir | 0 | 8 | 0% |
| 1.6 PWA | 0 | 10 | 0% |
| 1.7 Analytics | 0 | 7 | 0% |
| 1.8 Deploy | 0 | 5 | 0% |
| 1.9 Assets | 0 | 6 | 0% |
| **FASE 1 TOTAL** | **18** | **81** | **22%** |
| 2.1 Infra Bot | 0 | 4 | 0% |
| 2.2 Bot | 0 | 8 | 0% |
| **FASE 2 TOTAL** | **0** | **12** | **0%** |

---

## 🎯 Prioridad de Ejecución Sugerida

**Sprint 1 (MVP visible):**
1. T-201 a T-203 (Header con logo real)
2. T-112, T-113 (Completar calculadora)
3. T-901 a T-904 (Assets)
4. T-801 a T-805 (Deploy)

**Sprint 2 (Funcionalidad core):**
1. T-301 a T-310 (Vista tabla)
2. T-401 a T-412 (PDF)
3. T-501 a T-508 (Compartir)

**Sprint 3 (PWA + Polish):**
1. T-601 a T-610 (PWA/Offline)
2. T-701 a T-707 (Analytics)
3. T-905, T-906 (Meta tags)

---

*Última actualización: 2026-01-26*
