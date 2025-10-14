# Hexagency Web

Sitio web de Hexagency construido con React + Vite.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Configuración de Supabase (Autenticación)

**⚠️ IMPORTANTE:** Antes de ejecutar la aplicación, debes configurar Supabase para la autenticación del administrador.

1. Edita el archivo `.env` en la raíz del proyecto
2. Agrega tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

📖 **Guía completa de configuración:** Ver [`CONFIGURACION_SUPABASE.md`](./CONFIGURACION_SUPABASE.md)

### Configuración de Stripe (Pagos)

**⚠️ IMPORTANTE:** Para procesar pagos de las citas de diagnóstico, debes configurar Stripe.

1. Obtén tu clave pública de Stripe (empieza con `pk_test_...`)
2. Edita el archivo `src/components/BookingForm.jsx`
3. Reemplaza la clave pública:

```javascript
const stripePromise = loadStripe('pk_test_TU_CLAVE_PUBLICA')
```

📖 **Guía completa de configuración:** Ver [`CONFIGURACION_STRIPE.md`](./CONFIGURACION_STRIPE.md)

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
