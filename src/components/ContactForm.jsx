import { useState } from 'react'

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
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Consulta Gratuita
          </h2>
          <div className="h-1 w-24 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Completa este formulario y te contactaremos para una consulta personalizada sobre tu negocio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Personal */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Información Personal</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Información del Negocio */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Información del Negocio</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de negocio *
                </label>
                <select
                  name="tipoNegocio"
                  value={formData.tipoNegocio}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="retail">Retail / Tienda física</option>
                  <option value="servicios">Servicios profesionales</option>
                  <option value="restaurante">Restaurante / Gastronomía</option>
                  <option value="salud">Salud / Bienestar</option>
                  <option value="educacion">Educación</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ventas mensuales aproximadas
                </label>
                <select
                  name="ventasMensuales"
                  value={formData.ventasMensuales}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="0-5k">$0 - $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-50k">$15,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de empleados
                </label>
                <select
                  name="empleados"
                  value={formData.empleados}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1-5">1-5 empleados</option>
                  <option value="6-20">6-20 empleados</option>
                  <option value="21-50">21-50 empleados</option>
                  <option value="50+">50+ empleados</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto estimado
                </label>
                <select
                  name="presupuesto"
                  value={formData.presupuesto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desafíos y Objetivos */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Desafíos y Objetivos</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cuáles son los principales desafíos de tu negocio actual?
                </label>
                <textarea
                  name="desafios"
                  value={formData.desafios}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Describe los principales problemas o limitaciones que enfrenta tu negocio..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Qué objetivos quieres lograr con la transformación digital?
                </label>
                <textarea
                  name="objetivos"
                  value={formData.objetivos}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Describe qué esperas lograr con nuestra ayuda..."
                />
              </div>
            </div>
          </div>

          {/* Preferencias de Contacto */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Preferencias de Contacto</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha preferida para la consulta
                </label>
                <input
                  type="date"
                  name="fechaPreferida"
                  value={formData.fechaPreferida}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora preferida
                </label>
                <select
                  name="horaPreferida"
                  value={formData.horaPreferida}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="9-12">9:00 AM - 12:00 PM</option>
                  <option value="12-15">12:00 PM - 3:00 PM</option>
                  <option value="15-18">3:00 PM - 6:00 PM</option>
                  <option value="18-20">6:00 PM - 8:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-12 py-4 text-lg font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              * Campos obligatorios
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
