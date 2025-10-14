import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { price, quantity, plan, bookingData, citaId } = req.body

    console.log('Creando sesión de checkout para:', {
      plan,
      email: bookingData.email,
      citaId
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/booking?success=true&plan=${encodeURIComponent(plan)}&email=${encodeURIComponent(bookingData.email)}&fecha=${encodeURIComponent(bookingData.fechaPreferida)}&hora=${encodeURIComponent(bookingData.horaPreferida)}&citaId=${citaId}`,
      cancel_url: `${req.headers.origin}/booking?canceled=true`,
      customer_email: bookingData.email,
      client_reference_id: citaId,
      metadata: {
        plan: plan,
        nombre: bookingData.nombre,
        telefono: bookingData.telefono,
        empresa: bookingData.empresa || '',
        fechaPreferida: bookingData.fechaPreferida,
        horaPreferida: bookingData.horaPreferida,
        motivoConsulta: bookingData.motivoConsulta,
        tipo: 'booking_diagnosis',
        citaId: citaId
      }
    })

    console.log('Sesión creada exitosamente:', session.id)

    res.json({ id: session.id })

  } catch (error) {
    console.error('Error creando sesión de checkout:', error)
    res.status(500).json({ error: error.message })
  }
}
