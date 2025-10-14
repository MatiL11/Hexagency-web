import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('📨 Webhook recibido')
    console.log('Headers:', req.headers)
    console.log('Body type:', typeof req.body)
    
    // Parsear el evento directamente sin verificación de firma por ahora
    const event = req.body
    
    console.log('📨 Event type:', event.type, 'ID:', event.id)

    // Manejar el evento
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      console.log('✅ Pago completado:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        metadata: session.metadata,
        citaId: session.metadata.citaId
      })

      try {
        // Actualizar la cita en Supabase
        const { data, error } = await supabase
          .from('citas')
          .update({
            payment_status: 'completed',
            status: 'confirmed',
            stripe_payment_intent_id: session.payment_intent,
            stripe_session_id: session.id,
            amount_paid: session.amount_total
          })
          .eq('id', session.metadata.citaId)
          .select()

        if (error) {
          console.error('❌ Error actualizando cita en Supabase:', error)
          return res.status(500).json({ error: 'Error actualizando cita' })
        } else {
          console.log('✅ Cita actualizada en Supabase:', data)
        }

      } catch (err) {
        console.error('❌ Error procesando webhook:', err)
        return res.status(500).json({ error: 'Error procesando webhook' })
      }
    }

    console.log('✅ Webhook procesado exitosamente')
    res.json({ received: true })

  } catch (err) {
    console.error('❌ Error general en webhook:', err)
    res.status(400).json({ error: err.message })
  }
}

// Configuración para Vercel
export const config = {
  api: {
    bodyParser: true, // Permitir que Vercel parsee el body
  },
}