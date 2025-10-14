export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('📨 Webhook recibido:', req.body.type || 'unknown')
    
    // Para desarrollo, solo logear el evento
    if (req.body.type === 'checkout.session.completed') {
      const session = req.body.data.object
      console.log('✅ Pago completado:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        metadata: session.metadata
      })
    }

    res.json({ received: true })

  } catch (err) {
    console.error('Error en webhook:', err)
    res.status(400).json({ error: err.message })
  }
}
