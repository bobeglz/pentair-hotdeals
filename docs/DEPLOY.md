# Deploy a Vercel

## Requisitos Previos
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Acceso al repo GitHub: `bobeglz/pentair-hotdeals`

---

## 1. Conectar el Repositorio

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click en **"Import Git Repository"**
3. Selecciona **GitHub** y autoriza si es necesario
4. Busca y selecciona: `bobeglz/pentair-hotdeals`
5. Vercel detectará automáticamente que es **Next.js**
6. Click en **Deploy**

El primer deploy tomará ~1-2 minutos.

---

## 2. Configurar Dominio Personalizado

### Opción A: Subdominio (hotdeals.pentairlatam.com)
1. En Vercel, ve a tu proyecto → **Settings** → **Domains**
2. Agrega: `hotdeals.pentairlatam.com`
3. Vercel te dará un registro CNAME:
   - **Tipo:** CNAME
   - **Nombre:** hotdeals
   - **Valor:** `cname.vercel-dns.com`
4. Agrega este registro en tu proveedor de DNS (Cloudflare, GoDaddy, etc.)

### Opción B: Dominio raíz (pentairlatam.com)
1. Agrega el dominio en Vercel
2. Configura estos registros DNS:
   - **Tipo:** A → **Valor:** `76.76.21.21`
   - **Tipo:** AAAA → **Valor:** `2606:4700:3108::ac42:28ad` (opcional, IPv6)

> ⏱️ La propagación DNS puede tomar hasta 48 horas, pero usualmente es <1 hora.

---

## 3. Variables de Entorno

**Este proyecto NO requiere variables de entorno.** 🎉

Es una app estática que no necesita API keys ni configuración externa.

Si en el futuro necesitas agregar variables:
1. Ve a **Settings** → **Environment Variables**
2. Agrega las variables con nombre y valor
3. Marca los entornos: Production, Preview, Development

---

## 4. Deploys Automáticos

Una vez conectado, Vercel desplegará automáticamente:
- ✅ Cada push a `main` → Deploy a producción
- ✅ Cada PR → Deploy de preview con URL única

---

## 5. Verificar el Deploy

Después del deploy:
1. Visita la URL de Vercel (ej: `pentair-hotdeals.vercel.app`)
2. Prueba la generación de flyers
3. Verifica que las imágenes y QR codes funcionen
4. Prueba el export a PDF

---

## Troubleshooting

### El build falla
```bash
# Verifica localmente:
npm run build
```

### Las imágenes no cargan
- Asegúrate que las imágenes estén en `/public/`
- Verifica que las rutas usen `/` al inicio

### Problemas de DNS
- Espera al menos 1 hora antes de preocuparte
- Usa [dnschecker.org](https://dnschecker.org) para verificar propagación

---

## Resumen Rápido

| Paso | Acción |
|------|--------|
| 1 | Importar repo en vercel.com/new |
| 2 | Deploy automático |
| 3 | Agregar dominio en Settings → Domains |
| 4 | Configurar DNS con tu proveedor |
| 5 | ¡Listo! |
