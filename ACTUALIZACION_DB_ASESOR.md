# 🗄️ Actualización de Base de Datos - Campo Asesor

## 📋 Instrucciones para agregar el campo de asesor preferido

### **Paso 1: Ir a Supabase Dashboard**

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Click en **"Table Editor"** en el menú izquierdo
3. Selecciona la tabla **"citas"**

### **Paso 2: Agregar la nueva columna**

1. Click en el botón **"Add Column"** (o el icono +)
2. Configura la nueva columna:

   **Column Name:** `asesor_preferido`
   
   **Type:** `text`
   
   **Default Value:** `'Sin preferencia'`
   
   **Is Nullable:** ✅ (Sí, puede ser nulo)

3. Click en **"Add Column"**

### **Paso 3: Verificar la columna**

La tabla `citas` ahora debería tener estas columnas:

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
  asesor_preferido TEXT DEFAULT 'Sin preferencia', -- ✅ NUEVA COLUMNA
  motivo_consulta TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  amount_paid INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Paso 4: Probar la funcionalidad**

1. **Reinicia tu aplicación:**
   ```bash
   npm run dev
   ```

2. **Ve al formulario de reserva**
3. **Llena todos los campos incluyendo el asesor**
4. **Verifica que se guarde correctamente**

---

## 🔍 **Verificación en el Panel Administrativo**

Una vez agregada la columna, el panel administrativo mostrará:

- ✅ **Campo "Asesor"** en cada cita
- ✅ **Opciones disponibles:**
  - Fernando Ramírez - CEO & Fundador
  - Enrique Ramírez - Director de Estrategia
  - Alesh Ancira - Director de Operaciones
  - Yzak García - Director de Desarrollo
  - Sin preferencia (Te asignaremos el mejor asesor)

---

## 🚀 **Alternativa: SQL Directo**

Si prefieres usar SQL directamente:

```sql
ALTER TABLE citas 
ADD COLUMN asesor_preferido TEXT DEFAULT 'Sin preferencia';
```

Ejecuta este comando en el **SQL Editor** de Supabase.

---

## ✅ **Funcionalidades completadas:**

- ✅ **Campo asesor en formulario** - Dropdown con opciones
- ✅ **Validación requerida** - Campo obligatorio
- ✅ **Guardado en Supabase** - Nueva columna `asesor_preferido`
- ✅ **Visualización en panel admin** - Muestra asesor seleccionado
- ✅ **Confirmación de reserva** - Incluye asesor en detalles

---

## 📱 **Experiencia del usuario:**

1. **Cliente selecciona asesor** → Dropdown con opciones claras
2. **Formulario valida** → Campo requerido
3. **Se guarda en BD** → Columna `asesor_preferido`
4. **Admin ve la preferencia** → En panel administrativo
5. **Cliente recibe confirmación** → Con asesor seleccionado
