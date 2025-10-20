# Hexagency Web

Sitio web de Hexagency construido con React + Vite.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Configuración de Variables de Entorno

**⚠️ IMPORTANTE:** Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Supabase (Base de datos y autenticación)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima

# Stripe (Pagos)
VITE_STRIPE_PUBLIC_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret

# EmailJS (Envío de emails)
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 📧 Configuración de EmailJS (Formulario de Contacto)

1. **Crear cuenta en EmailJS:** https://www.emailjs.com/
2. **Agregar servicio de email:**
   - Dashboard → Email Services → Add New Service
   - Para GoDaddy, selecciona "Custom SMTP":
     - SMTP Server: `smtpout.secureserver.net`
     - Port: `465` (SSL) o `587` (TLS)
     - Tu email y contraseña de GoDaddy
   - Copia el **Service ID**

3. **Crear plantilla de email:**
   - Dashboard → Email Templates → Create New Template
   - Usa estas variables en tu plantilla:
     - `{{from_name}}` - Nombre de la empresa
     - `{{phone}}` - Teléfono
     - `{{company}}` - Empresa
     - `{{business_type}}` - Tipo de negocio
     - `{{employees}}` - Número de empleados
     - `{{preferred_datetime}}` - Fecha/hora preferida
     - `{{message}}` - Mensaje/problema
   - Copia el **Template ID**

4. **Obtener Public Key:**
   - Dashboard → Account → API Keys
   - Copia tu **Public Key**

5. **Agregar las credenciales al `.env`:**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

### 🔐 Configuración de Supabase

1. **Crear proyecto en Supabase:** https://supabase.com/
2. **Crear tabla `citas`:**
   ```sql
   CREATE TABLE citas (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     nombre TEXT NOT NULL,
     email TEXT NOT NULL,
     telefono TEXT NOT NULL,
     empresa TEXT,
     plan TEXT NOT NULL,
     fecha_preferida DATE NOT NULL,
     hora_preferida TEXT NOT NULL,
     motivo_consulta TEXT NOT NULL,
     status TEXT DEFAULT 'pending',
     payment_status TEXT DEFAULT 'pending',
     stripe_payment_intent_id TEXT,
     stripe_session_id TEXT,
     amount_paid INTEGER,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
3. **Deshabilitar RLS** (Row Level Security) para la tabla `citas`
4. **Crear usuario administrador** en Authentication → Users
5. **Agregar credenciales al `.env`**

### 💳 Configuración de Stripe

1. **Crear cuenta en Stripe:** https://stripe.com/
2. **Obtener claves API:** Dashboard → Developers → API Keys
3. **Crear producto y precio** de $100 USD
4. **Configurar webhook:**
   - Dashboard → Developers → Webhooks
   - URL: `https://tu-dominio.vercel.app/api/webhook`
   - Eventos: `checkout.session.completed`
5. **Agregar credenciales al `.env`**

### Ejecutar en desarrollo

```bash
npm run dev
```

### Build para producción

```bash
npm run build
```

## ✨ Características

- ✅ Diseño responsive y moderno
- ✅ Scroll horizontal entre secciones
- ✅ Formulario de contacto con EmailJS
- ✅ Autenticación de administrador con Supabase
- ✅ Modal de login
- ✅ Panel de administración
- ✅ Sistema de reserva de citas con pago Stripe ($100 USD)
- ✅ Integración con WhatsApp para consultas

## 🔐 Login de Administrador

Para acceder como administrador:

1. Haz clic en el icono de usuario (👤) en el header
2. Se abrirá un modal de login
3. Ingresa las credenciales del administrador de Supabase
4. Una vez autenticado, el icono cambiará mostrando un icono de logout

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes React
│   ├── Header.jsx   # Header con login
│   ├── LoginModal.jsx
│   ├── BookingForm.jsx  # Formulario de reserva con Stripe
│   └── ...
├── context/         # Context API
│   └── AuthContext.jsx  # Estado de autenticación
├── lib/            # Librerías y configuración
│   └── supabase.js # Cliente de Supabase
└── assets/         # Imágenes y recursos
```

## 🛠️ Tecnologías

- **React 19** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS 4** - Estilos
- **Supabase** - Autenticación
- **Stripe** - Procesamiento de pagos
- **EmailJS** - Envío de emails
- **Lucide React** - Iconos

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
