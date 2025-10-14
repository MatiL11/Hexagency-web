import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, Calendar, CreditCard, User, Phone, Mail } from 'lucide-react'

const BookingSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [bookingData, setBookingData] = useState(null)

  useEffect(() => {
    // Extraer datos de la URL
    const urlParams = new URLSearchParams(location.search)
    
    if (urlParams.get('success') === 'true') {
      setBookingData({
        plan: urlParams.get('plan') || 'No especificado',
        email: urlParams.get('email') || 'No especificado',
        fecha: urlParams.get('fecha') || 'No especificada',
        hora: urlParams.get('hora') || 'No especificada',
        citaId: urlParams.get('citaId') || 'No especificado'
      })
    }
  }, [location])

  const handleBackToHome = () => {
    navigate('/')
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando confirmación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header de éxito */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-lg text-gray-600">
            Tu cita ha sido reservada y confirmada
          </p>
        </div>

        {/* Tarjeta de confirmación */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Detalles de tu Cita</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-lg font-semibold text-gray-900">{bookingData.plan}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha</p>
                  <p className="text-lg font-semibold text-gray-900">{bookingData.fecha}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Hora</p>
                  <p className="text-lg font-semibold text-gray-900">{bookingData.hora}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{bookingData.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Monto Pagado</p>
                  <p className="text-lg font-semibold text-green-600">$100.00 USD</p>
                </div>
              </div>

              <div className="flex items-center">
                <Check className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado</p>
                  <p className="text-lg font-semibold text-green-600">Confirmada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ID de la Cita:</strong> {bookingData.citaId}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Guarda este ID para futuras referencias.
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Qué sigue?</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  Recibirás un email de confirmación en las próximas horas.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  Nuestro equipo se pondrá en contacto contigo para coordinar los detalles finales.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  El pago de $100 USD se descontará del precio total del plan si decides continuar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Volver al Inicio
          </button>
          <a
            href="https://wa.me/523511240636"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccess
