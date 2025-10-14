import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { XCircle, Calendar, CreditCard, ArrowLeft, Phone, Mail } from 'lucide-react'

const BookingCanceled = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [bookingData, setBookingData] = useState(null)

  useEffect(() => {
    // Extraer datos de la URL si los hay
    const urlParams = new URLSearchParams(location.search)
    
    setBookingData({
      plan: urlParams.get('plan') || 'No especificado',
      email: urlParams.get('email') || 'No especificado',
      fecha: urlParams.get('fecha') || 'No especificada',
      hora: urlParams.get('hora') || 'No especificada'
    })
  }, [location])

  const handleTryAgain = () => {
    navigate('/booking')
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleContactWhatsApp = () => {
    const message = encodeURIComponent(`¡Hola! Cancelé mi pago por la cita de diagnóstico y me gustaría reagendarla:

📋 **Información de la Reserva:**
• Plan: ${bookingData.plan}
• Email: ${bookingData.email}
• Fecha preferida: ${bookingData.fecha}
• Hora preferida: ${bookingData.hora}

¿Podrían ayudarme a completar el proceso de reserva?`)
    
    window.open(`https://wa.me/523511240636?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header de cancelación */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pago Cancelado
          </h1>
          <p className="text-lg text-gray-600">
            No se ha procesado ningún cargo
          </p>
        </div>

        {/* Información de la reserva */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Detalles de la Reserva</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-lg font-semibold text-gray-900">{bookingData.plan}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha Preferida</p>
                  <p className="text-lg font-semibold text-gray-900">{bookingData.fecha}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Hora Preferida</p>
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
                  <p className="text-sm font-medium text-gray-500">Estado del Pago</p>
                  <p className="text-lg font-semibold text-red-600">Cancelado</p>
                </div>
              </div>

              <div className="flex items-center">
                <XCircle className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado de la Cita</p>
                  <p className="text-lg font-semibold text-red-600">No Confirmada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Tu cita no ha sido confirmada porque el pago fue cancelado. 
              No se ha realizado ningún cargo a tu tarjeta.
            </p>
          </div>
        </div>

        {/* Opciones disponibles */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Qué puedes hacer ahora?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  <strong>Intentar de nuevo:</strong> Puedes volver a completar el proceso de reserva y pago.
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
                  <strong>Contactar por WhatsApp:</strong> Nuestro equipo puede ayudarte a completar la reserva.
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
                  <strong>Cambiar de plan:</strong> Revisa nuestros otros planes disponibles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleTryAgain}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Intentar de Nuevo
          </button>
          <button
            onClick={handleContactWhatsApp}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            Contactar por WhatsApp
          </button>
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al Inicio
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ¿Tienes problemas con el pago? 
            <a href="mailto:soporte@hexagency.com" className="text-blue-600 hover:text-blue-800 ml-1">
              Contáctanos por email
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookingCanceled
