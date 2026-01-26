🎯 El Problema Real

Adrián estaba en Houston en un evento de Pulcor. Un dealer le pregunta sobre rebates. Adrián saca el teléfono y... no encuentra la info fácil. Tiene que buscar entre PDFs, abrir documentos, scrollear. Pierde el momento de venta.

Lo que Adrián dijo:

"Es sumamente complejo ver esa parte... lo necesito rápido para poder utilizarlo cuando estemos hablando con el cliente"



🧠 ¿Qué necesita el vendedor en el momento de la venta?

1. Respuesta instantánea: "¿IntelliFlo tiene rebate en México?" → SÍ, $100
2. Contexto completo: Qué SKUs, hasta cuándo, qué condiciones
3. Algo para mostrar al cliente: Visual, profesional, convincente
4. Algo que el cliente se lleve: PDF, link, WhatsApp
5. Funcionar sin internet: En expos el WiFi es basura

💡 Opciones de Solución Programada

Opción A: PWA (Progressive Web App)

Una mini-app web que se instala en el teléfono como app nativa.

Experiencia:

Vendedor abre app → Selecciona país 🇲🇽 → Ve todos los rebates disponibles
                  → Toca "IntelliFlo3" → Ve detalle con SKUs
                  → Botón "Compartir con cliente" → Genera PDF o link
Pros:

• Funciona offline (se cachea)
• Se siente como app nativa
• Actualizaciones automáticas
• Un solo link para todo el equipo
• Analytics de uso
Contras:

• Requiere desarrollo (1-2 semanas)
• Hosting (aunque puede ser gratis en Vercel/Netlify)

Opción B: Notion/Coda con Base de Datos

Una base de datos visual que cualquiera puede actualizar.

Experiencia:

Vendedor abre link → Filtra por país → Filtra por producto
                   → Ve tabla con toda la info
                   → Exporta vista como PDF
Pros:

• Ana o Andrea pueden actualizar sin código
• Filtros nativos
• Se puede embeber en el sitio de Pentair
• Gratis o muy barato
Contras:

• No funciona bien offline
• Menos control del diseño
• Dependencia de tercero

Opción C: Mini Calculadora de Rebates

Widget embebible o standalone.

Experiencia:

"¿Qué producto?" → IntelliFlo3
"¿Qué país?" → México
"¿Reemplazo o instalación nueva?" → Reemplazo

RESULTADO:
✅ Rebate disponible: $100 USD
📅 Válido hasta: 31 Mayo 2026
📋 [Ver T&C] [Generar PDF para cliente] [Enviar por WhatsApp]
Pros:

• UX súper simple (3 clicks)
• Puede generar PDF personalizado con nombre del dealer
• Puede integrarse al sitio de Pentair LATAM
• Tracking de conversiones
Contras:

• Desarrollo custom
• Mantenimiento cuando cambien promociones

Opción D: Bot de WhatsApp/Telegram

El vendedor le pregunta al bot y obtiene respuesta instantánea.

Experiencia:

Vendedor: "rebate intelliflo mexico"
Bot: "✅ IntelliFlo3 VSF tiene $100 USD de rebate en México
      📅 Válido hasta 31 May 2026
      SKUs: 11065, 11066, 11067, 11068...
      [📄 Descargar PDF] [📋 Ver T&C]"
Pros:

• Cero fricción (ya usan WhatsApp)
• Funciona en cualquier teléfono
• Puede reenviar info al cliente directamente
• Respuestas en lenguaje natural
Contras:

• Requiere infraestructura de bot
• Límites de WhatsApp Business API

🏆 Mi Recomendación

Para Adrián y velocidad de implementación: Opción A (PWA) + Opción C (Calculadora)

Una PWA simple que sea:

1. Calculadora en la home: País → Producto → Resultado
2. Vista de tabla completa: Para los que quieren ver todo
3. Generador de PDF: Con branding Pentair, personalizable
4. Modo offline: Cachea los datos
Stack técnico simple:

• Next.js o Astro (estático)
• Tailwind CSS
• JSON con los datos de promociones
• jsPDF para generar PDFs
• Deploy en Vercel (gratis)
Timeline: 1 semana para MVP funcional

estoy de acuerdo contigo, solo que también agregaría el bot de whatsapp después de terminar lo que tu propones. se me hace una idea genial tambien. 

1. Las promociones las decide USA junto con Adrian. y no sé con qué frecuencia cambian. me imagino que cualquiera puede ver esta info es publica. puede vivir en dominio separado, tenemos pentairlatam.com que por ahora no estamos usando. Si queremos tener tracking. Y sí el vendedor debe poder compartir al cliente.

Perfecto. Tenemos dominio (pentairlatam.com), visión clara, y un roadmap en dos fases.

Vamos a formalizar esto:


📋 Especificación de Proyecto: Pentair Hot Deals Tool

🎯 Objetivo

Crear una herramienta digital que permita al equipo de ventas de Pentair LATAM consultar y compartir información de rebates de forma instantánea durante interacciones con clientes y dealers.


👥 Usuarios

| Usuario           | Necesidad                                                    |
| ----------------- | ------------------------------------------------------------ |
| Vendedor Pentair  | Consultar rebates rápido, mostrar al cliente, compartir info |
| Dealer/Cliente    | Recibir info clara de rebates disponibles para su país       |
| Ana Wong / Adrián | Ver métricas de uso, actualizar promociones                  |

🏗️ Fases de Desarrollo

Fase 1: PWA + Calculadora (Semana 1-2)

Entregable: Web app instalable con calculadora de rebates

Fase 2: Bot de WhatsApp (Semana 3-4)

Entregable: Bot que responde consultas y comparte PDFs


📱 Fase 1: PWA — Requerimientos Funcionales

1.1 Calculadora de Rebates (Home)

┌─────────────────────────────────────┐
│  🔥 PENTAIR HOT DEALS               │
│                                     │
│  ¿Qué producto buscas?              │
│  [▼ Seleccionar producto        ]   │
│                                     │
│  ¿En qué país?                      │
│  [▼ Seleccionar país            ]   │
│                                     │
│  [ 🔍 BUSCAR REBATE ]               │
│                                     │
└─────────────────────────────────────┘
           ↓ Resultado ↓
┌─────────────────────────────────────┐
│  ✅ ¡REBATE DISPONIBLE!             │
│                                     │
│  IntelliFlo3® VSF                   │
│  💰 $100 USD                        │
│  📅 Válido hasta 31 Mayo 2026       │
│                                     │
│  SKUs elegibles:                    │
│  11065, 11066, 11067, 11068...      │
│                                     │
│  [📄 Generar PDF] [📤 Compartir]    │
│  [📋 Ver T&C completos]             │
└─────────────────────────────────────┘
Campos de búsqueda:

• Producto (dropdown con categorías)
• País (10 países participantes)
• Tipo: Instalación nueva / Reemplazo (para bounty)
Resultado muestra:

• Disponibilidad (✅/❌)
• Monto del rebate
• Fecha de vigencia
• SKUs elegibles
• Condiciones especiales (ej: marcas de competencia para bounty)

1.2 Vista de Tabla Completa

Para usuarios que quieren ver todo de un vistazo (estilo Apple).

Funcionalidades:

• Header sticky con productos
• Filtros por país
• Filtros por categoría (Calentadores, Filtros, Bombas)
• Ordenar por monto de rebate
• Búsqueda por SKU

1.3 Generador de PDF

El vendedor puede generar un PDF personalizado para el cliente.

Contenido del PDF:

• Logo Pentair
• Producto(s) seleccionados
• Rebate y condiciones
• SKUs elegibles
• QR a T&C completos
• Fecha de generación
• (Opcional) Nombre del dealer/cliente
Formato: 1 página, diseño limpio, listo para imprimir o enviar por email.


1.4 Compartir

Opciones de share:

• 📤 WhatsApp (abre chat con mensaje pre-armado + PDF)
• 📧 Email (abre cliente de email con asunto y cuerpo)
• 📋 Copiar link (link directo al resultado)
• 📥 Descargar PDF

1.5 Modo Offline (PWA)

• Cachear datos de promociones
• Funcionar sin conexión
• Sincronizar cuando vuelva internet
• Instalable como app en iOS/Android

1.6 Admin / Actualización de Datos

Opción A (Simple): Archivo JSON en el repo

• Plexiz actualiza cuando Pentair manda cambios
• Deploy automático
Opción B (Self-service): Panel admin básico

• Login para Ana/Andrea
• Editar promociones sin código
• Requiere más desarrollo
Recomendación: Empezar con Opción A, iterar a B si la frecuencia de cambios lo justifica.


1.7 Analytics / Tracking

Eventos a trackear:

• Búsquedas (qué producto + país)
• PDFs generados
• Shares (por canal)
• Países más consultados
• Productos más buscados
• Dispositivo (móvil vs desktop)

Herramienta: Google Analytics 4, Mixpanel, o Plausible (privacy-friendly)

Dashboard mensual para Ana/Adrián:

• Top 5 productos consultados
• Top 5 países
• de PDFs generados
• de shares

🤖 Fase 2: Bot de WhatsApp — Requerimientos

2.1 Funcionalidad Básica

Usuario: "rebate intelliflo mexico"
Bot: "✅ IntelliFlo3® VSF tiene rebate en México

💰 $100 USD por bomba instalada
📅 Válido hasta 31 Mayo 2026

SKUs: 11065, 11066, 11067, 11068, 11075, 11076, 11077, 11078

¿Quieres que te envíe el PDF con los detalles?"

Usuario: "si"
Bot: [Envía PDF adjunto]

2.2 Comandos del Bot

• rebate [producto] [país] — Consulta específica
• productos — Lista de productos con rebate
• paises — Lista de países participantes
• todos — Resumen de todos los rebates
• ayuda — Cómo usar el bot
2.3 Inteligencia

• Entender variaciones ("intelliflo", "intelli flo", "bomba intelliflo")
• Sugerir si no encuentra exacto
• Responder en español
2.4 Infraestructura

• WhatsApp Business API (vía Twilio, 360dialog, o similar)
• Número dedicado para Pentair LATAM
• Webhook para procesar mensajes

🎨 Diseño / Branding

Colores Pentair:

• Primario: #00A3E0 (azul Pentair)
• Secundario: #0066a1 (azul oscuro)
• Acento: #FFD700 (dorado para CTAs)
• Fondo: #f8f9fa
Logo: Usar logo oficial de Pentair Pool

Tono: Profesional pero accesible, enfocado en acción


🔧 Stack Técnico Recomendado

| Componente | Tecnología              | Razón                       |
| ---------- | ----------------------- | --------------------------- |
| Frontend   | Next.js 14 (App Router) | PWA nativo, SSG, rápido     |
| Styling    | Tailwind CSS            | Rápido de desarrollar       |
| PDF        | jsPDF o React-PDF       | Generación client-side      |
| Hosting    | Vercel                  | Gratis, deploy automático   |
| Dominio    | pentairlatam.com        | Ya disponible               |
| Analytics  | Plausible o GA4         | Tracking sin cookies (GDPR) |
| Bot        | Twilio + Node.js        | WhatsApp Business API       |


📅 Timeline Estimado

| Semana | Entregable                               |
| ------ | ---------------------------------------- |
| 1      | MVP calculadora + vista tabla + diseño   |
| 2      | Generador PDF + compartir + PWA + deploy |
| 3      | Bot WhatsApp básico                      |
| 4      | Bot inteligente + testing + launch       |


❓ Decisiones Pendientes

1. ¿Quién hostea? ¿Plexiz o Pentair?
2. ¿Quién mantiene el código? ¿Repo en GitHub de Plexiz?
3. ¿Número de WhatsApp? ¿Nuevo o existente de Pentair?
4. ¿Presupuesto para WhatsApp API? Twilio cobra por mensaje
5. ¿Aprobación de branding? ¿Necesita visto bueno de Pentair US?

¿Quieres que genere esto como documento formal (PDF/MD) para presentar a Ana/Adrián? 🐧

