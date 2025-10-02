import { useState } from 'react'
import { ChevronUp } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoNegocio: '',
    ventasMensuales: '',
    empleados: '',
    desafios: '',
    objetivos: '',
    presupuesto: '',
    fechaPreferida: '',
    horaPreferida: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
                  nombre: '',
                  email: '',
                  telefono: '',
                  empresa: '',
                  tipoNegocio: '',
                  ventasMensuales: '',
                  empleados: '',
                  desafios: '',
                  objetivos: '',
                  presupuesto: '',
                  fechaPreferida: '',
                  horaPreferida: ''
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
      {/* Flecha para volver al hero */}
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }}
        className="absolute top-16 right-4 bg-black text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg z-10"
        title="Volver al inicio"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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

            {/* Formulario en las 3 columnas restantes */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Columna Izquierda - Información Personal */}
            <div className="sm:col-span-1 lg:col-span-1 flex">
              <div className="bg-black p-3 sm:p-4 rounded-lg shadow-lg border border-gray-800 flex-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Información Personal</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Central - Información del Negocio */}
            <div className="sm:col-span-1 lg:col-span-1 flex">
              <div className="bg-black p-3 sm:p-4 rounded-lg shadow-lg border border-gray-800 flex-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Información del Negocio</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
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
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Ventas mensuales
                    </label>
                    <select
                      name="ventasMensuales"
                      value={formData.ventasMensuales}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Rango de ventas mensuales</option>
                      <option value="0-5k">$0 - $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Número de empleados
                    </label>
                    <select
                      name="empleados"
                      value={formData.empleados}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Cantidad de empleados</option>
                      <option value="1-5">1-5 empleados</option>
                      <option value="6-20">6-20 empleados</option>
                      <option value="21-50">21-50 empleados</option>
                      <option value="50+">50+ empleados</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Presupuesto estimado
                    </label>
                    <select
                      name="presupuesto"
                      value={formData.presupuesto}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Presupuesto para el proyecto</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-30k">$15,000 - $30,000</option>
                      <option value="30k-50k">$30,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Preferencias y Envío */}
            <div className="sm:col-span-2 lg:col-span-1 flex">
              <div className="bg-black p-3 sm:p-4 rounded-lg shadow-lg border border-gray-800 flex-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Preferencias de Contacto</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Fecha preferida
                    </label>
                    <input
                      type="date"
                      name="fechaPreferida"
                      value={formData.fechaPreferida}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Hora preferida
                    </label>
                    <select
                      name="horaPreferida"
                      value={formData.horaPreferida}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Horario de preferencia</option>
                      <option value="9-12">9:00 AM - 12:00 PM</option>
                      <option value="12-15">12:00 PM - 3:00 PM</option>
                      <option value="15-18">3:00 PM - 6:00 PM</option>
                      <option value="18-20">6:00 PM - 8:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

              {/* Sección de mensajes largos - Ancho completo */}
              <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-black p-3 sm:p-4 rounded-lg shadow-lg border border-gray-800 flex flex-col">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">Desafíos Actuales</h3>
                  </div>
                  <div className="group flex-1 flex flex-col">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      ¿Cuáles son los principales desafíos de tu negocio?
                    </label>
                    <textarea
                      name="desafios"
                      value={formData.desafios}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 resize-none flex-1 text-sm sm:text-base"
                      placeholder="Describe los principales problemas o limitaciones que enfrenta tu negocio actualmente..."
                    />
                  </div>
                </div>

                <div className="bg-black p-3 sm:p-4 rounded-lg shadow-lg border border-gray-800 flex flex-col">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">Objetivos</h3>
                  </div>
                  <div className="group flex-1 flex flex-col">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      ¿Qué objetivos quieres lograr?
                    </label>
                    <textarea
                      name="objetivos"
                      value={formData.objetivos}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 resize-none flex-1 text-sm sm:text-base"
                      placeholder="Describe qué esperas lograr con nuestra ayuda y cómo te gustaría que sea tu negocio en el futuro..."
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
