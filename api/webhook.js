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
    const sig = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event

    // Para desarrollo, si no hay webhook secret, parsear directamente
    if (!webhookSecret) {
      console.log('⚠️  Webhook secret no configurado, parseando directamente')
      event = req.body
    } else {
      // Para producción, verificar la firma
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    }

    console.log('📨 Webhook recibido:', event.type, event.id)

    // Manejar el evento
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      console.log('✅ Pago completado:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        metadata: session.metadata
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
          console.error('Error actualizando cita en Supabase:', error)
          return res.status(500).json({ error: 'Error actualizando cita' })
        } else {
          console.log('✅ Cita actualizada en Supabase:', data)
        }

      } catch (err) {
        console.error('Error procesando webhook:', err)
        return res.status(500).json({ error: 'Error procesando webhook' })
      }
    }

    res.json({ received: true })

  } catch (err) {
    console.error('Error general en webhook:', err)
    res.status(400).json({ error: err.message })
  }
}

// Configuración para Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
