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

  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    if (!webhookSecret) {
      console.log('⚠️  Webhook secret no configurado, saltando verificación')
      event = JSON.parse(req.body)
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    }
  } catch (err) {
    console.log(`❌ Error verificando webhook: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

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
      } else {
        console.log('✅ Cita actualizada en Supabase:', data)
      }

    } catch (err) {
      console.error('Error procesando webhook:', err)
    }
  }

  res.json({ received: true })
}

// Configuración para Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
