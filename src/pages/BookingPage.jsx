import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, CreditCard, Check } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from '../lib/supabase'

// Inicializar Stripe con tu clave pública
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const CheckoutForm = ({ selectedPlan, formData, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise

      // Validar datos requeridos
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.fechaPreferida || !formData.horaPreferida || !formData.motivoConsulta) {
        setError('Por favor completa todos los campos requeridos')
        setLoading(false)
        return
      }

      // Guardar la cita en Supabase primero
      const { data: cita, error: supabaseError } = await supabase
        .from('citas')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            empresa: formData.empresa || null,
            plan: selectedPlan,
            fecha_preferida: formData.fechaPreferida,
            hora_preferida: formData.horaPreferida,
            motivo_consulta: formData.motivoConsulta,
            payment_status: 'pending',
            status: 'pending'
          }
        ])
        .select()
        .single()

      if (supabaseError) {
        console.error('Error guardando cita:', supabaseError)
        setError('Error guardando la cita. Por favor, intenta de nuevo.')
        setLoading(false)
        return
      }

      console.log('Cita guardada en Supabase:', cita)

      // Crear sesión de Stripe Checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: 'price_1SI9TLHsK7GwtAM5EAgYPRr6',
          quantity: 1,
          plan: selectedPlan,
          bookingData: formData,
          citaId: cita.id
        }),
      })

      const session = await response.json()

      if (session.error) {
        setError(session.error)
        setLoading(false)
        return
      }

      // Redirigir a Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
      }

      setLoading(false)

    } catch (err) {
      console.error('Error:', err)
      setError('Error procesando el pago. Por favor, intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Resumen */}
      <div className="bg-black text-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Plan seleccionado:</span>
          <span>{selectedPlan}</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total a pagar:</span>
          <span>$100 USD</span>
        </div>
        <p className="text-xs text-gray-300 mt-3">
          * Este pago se descontará del precio total del plan si decides continuar
        </p>
      </div>

      {/* Información de Checkout */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <CreditCard className="w-6 h-6 mr-3 text-blue-700" />
          <h4 className="text-lg font-semibold text-blue-900">Pago Seguro con Stripe Checkout</h4>
        </div>
        <p className="text-sm text-blue-800 mb-4">
          Al hacer clic en "Proceder al Pago", serás redirigido a una página segura de Stripe donde podrás completar tu pago de forma segura.
        </p>
        <div className="space-y-2 text-sm text-blue-700">
          <p>✅ Pago 100% seguro</p>
          <p>✅ Acepta todas las tarjetas principales</p>
          <p>✅ Protección contra fraudes</p>
          <p>✅ Confirmación inmediata</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={loading}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Procesando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Proceder al Pago - $100 USD
            </>
          )}
        </button>
      </div>
    </div>
  )
}

const BookingPage = () => {
  const navigate = useNavigate()
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    fechaPreferida: '',
    horaPreferida: '',
    motivoConsulta: ''
  })

  useEffect(() => {
    // Obtener el plan de la URL o localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const plan = urlParams.get('plan') || localStorage.getItem('selectedPlan') || 'Profesional'
    setSelectedPlan(plan)
    
    // Verificar si el pago fue exitoso (viene de Stripe Checkout)
    const urlParams2 = new URLSearchParams(window.location.search)
    if (urlParams2.get('success') === 'true') {
      setPaymentSuccess(true)
      setBookingData({
        plan: plan,
        bookingData: {
          fechaPreferida: urlParams2.get('fecha') || 'No especificada',
          horaPreferida: urlParams2.get('hora') || 'No especificada',
          email: urlParams2.get('email') || 'No especificado'
        }
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSuccess = (data) => {
    setBookingData(data)
    setPaymentSuccess(true)
  }

  const handleCloseSuccess = () => {
    setPaymentSuccess(false)
    setBookingData(null)
    navigate('/')
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              ¡Pago Exitoso!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu cita ha sido reservada correctamente.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
              <h3 className="font-semibold text-black mb-2">Detalles de tu reserva:</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Plan:</span> {bookingData?.plan}</p>
                <p><span className="font-medium">Fecha:</span> {bookingData?.bookingData.fechaPreferida}</p>
                <p><span className="font-medium">Hora:</span> {bookingData?.bookingData.horaPreferida}</p>
                <p><span className="font-medium">Email:</span> {bookingData?.bookingData.email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Recibirás un correo de confirmación con todos los detalles de tu cita.
            </p>

            <button
              onClick={handleCloseSuccess}
              className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-black">Reservar Cita</h1>
                  <p className="text-sm text-gray-600">Plan: {selectedPlan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Información Importante */}
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-sm text-blue-800">
              💡 <strong>Importante:</strong> El pago de $100 USD por la cita de diagnóstico se descontará del precio total del plan si decides continuar con nosotros.
            </p>
          </div>
        </div>

        {/* Formulario de Información */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-black mb-6">Información de la Reserva</h3>
          
          <form className="space-y-6">
            {/* Información Personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="juan@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="+52 55 1234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="Mi Empresa SA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Preferida *
                </label>
                <input
                  type="date"
                  name="fechaPreferida"
                  value={formData.fechaPreferida}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora Preferida *
                </label>
                <select
                  name="horaPreferida"
                  value={formData.horaPreferida}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                >
                  <option value="">Selecciona una hora</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Motivo de la Consulta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de la Consulta *
              </label>
              <textarea
                name="motivoConsulta"
                value={formData.motivoConsulta}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                placeholder="Describe brevemente qué te gustaría tratar en la cita..."
              />
            </div>
          </form>
        </div>

        {/* Sección de Pago */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-black mb-6">Proceder al Pago</h3>
          <CheckoutForm 
            selectedPlan={selectedPlan}
            formData={formData}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  )
}

export default BookingPage
