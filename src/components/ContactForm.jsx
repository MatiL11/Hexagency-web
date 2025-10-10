import { useState, useEffect } from 'react'
import { ChevronUp, Zap, MessageCircle } from 'lucide-react'

const ContactForm = ({ onHideContactForm }) => {
  const [formData, setFormData] = useState({
    empresa: '',
    telefono: '',
    tipoNegocio: '',
    empleados: '',
    fechaHoraPreferida: '',
    problema: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Estado para el contador del banner
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    minutes: 59,
    seconds: 22
  })

  // Efecto para el contador regresivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 }
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }
        } else if (prevTime.days > 0) {
          return { days: prevTime.days - 1, minutes: 59, seconds: 59 }
        } else {
          // Reiniciar el contador cuando llegue a cero
          return { days: 0, minutes: 59, seconds: 22 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos del formulario:', formData)
  }

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-black mb-4">
              ¡Gracias por tu interés!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Hemos recibido tu información y nos pondremos en contacto contigo en las próximas 24 horas.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  empresa: '',
                  telefono: '',
                  tipoNegocio: '',
                  empleados: '',
                  fechaHoraPreferida: '',
                  problema: ''
                })
              }}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Enviar otra consulta
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="min-h-screen bg-white flex items-center justify-center relative py-8 sm:py-12">
      {/* Banner de WhatsApp - Contenedor centrado */}
      <div className="absolute top-16 z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-lg p-3 sm:p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-6">
            {/* Sección izquierda - Icono y texto */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="text-white font-medium text-xs sm:text-sm md:text-base">
                ¡Agenda tu asesoramiento express! Es por tiempo limitado:
              </span>
            </div>
            
            {/* Sección central - Contador */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center">
                <div className="text-white text-sm sm:text-lg font-bold">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-white text-xs">DÍAS</div>
              </div>
              <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center">
                <div className="text-white text-sm sm:text-lg font-bold">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-white text-xs">MIN</div>
              </div>
              <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center">
                <div className="text-white text-sm sm:text-lg font-bold">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-white text-xs">SEG</div>
              </div>
            </div>
            
            {/* Sección derecha - Botón de WhatsApp */}
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors"
              onClick={() => {
                const message = encodeURIComponent('Hola! Estoy interesado en el asesoramiento express de Hexagency. ¿Podrían contactarme?')
                window.open(`https://wa.me/523511240636?text=${message}`, '_blank')
              }}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-xs sm:text-sm">Contáctanos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flecha para volver al hero */}
      <button
        onClick={() => {
          // Primero hacer scroll suave
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          
          // Después de un delay, ocultar el formulario
          setTimeout(() => {
            onHideContactForm && onHideContactForm()
          }, 800)
        }}
        className="fixed bottom-4 right-4 sm:absolute sm:top-16 sm:right-4 bg-black text-white p-3 sm:p-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg z-50"
        title="Volver al inicio"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Formulario completo */}
          <form onSubmit={handleSubmit} className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Header a la izquierda */}
            <div className="lg:col-span-1 flex flex-col justify-center mb-6 lg:mb-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3">
                Consulta Gratuita
              </h2>
              <div className="h-1 w-16 sm:w-24 bg-black mb-4"></div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Completa este formulario y te contactaremos para una consulta personalizada sobre tu negocio
              </p>
              
              {/* Botón de envío destacado */}
              <div className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
                </button>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">
                  * Campos obligatorios
                </p>
              </div>
            </div>

            {/* Formulario en un solo contenedor */}
            <div className="lg:col-span-3">
              <div className="bg-black p-4 sm:p-6 rounded-lg shadow-lg border border-gray-800">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Información de Contacto</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Campo 1 - Nombre de tu empresa */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Nombre de tu empresa *
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  {/* Campo 2 - Número */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Número *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>

                  {/* Campo 3 - Tipo de negocio */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Tipo de negocio *
                    </label>
                    <select
                      name="tipoNegocio"
                      value={formData.tipoNegocio}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Selecciona tu tipo de negocio</option>
                      <option value="retail">Retail / Tienda física</option>
                      <option value="servicios">Servicios profesionales</option>
                      <option value="restaurante">Restaurante / Gastronomía</option>
                      <option value="salud">Salud / Bienestar</option>
                      <option value="educacion">Educación</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Campo 4 - Número de empleados */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Número de empleados *
                    </label>
                    <select
                      name="empleados"
                      value={formData.empleados}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Cantidad de empleados</option>
                      <option value="1-5">1-5 empleados</option>
                      <option value="6-20">6-20 empleados</option>
                      <option value="21-50">21-50 empleados</option>
                      <option value="50+">50+ empleados</option>
                    </select>
                  </div>

                  {/* Campo 5 - Fecha y hora preferida */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Fecha y hora preferida *
                    </label>
                    <input
                      type="datetime-local"
                      name="fechaHoraPreferida"
                      value={formData.fechaHoraPreferida}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    />
                  </div>

                  {/* Campo 6 - Problema a solucionar */}
                  <div className="group sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Problema a solucionar *
                    </label>
                    <textarea
                      name="problema"
                      value={formData.problema}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 resize-none text-sm sm:text-base"
                      placeholder="Describe el problema principal que necesitas solucionar en tu negocio..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
