import { BarChart3, Target, Monitor, Handshake, Check } from 'lucide-react'

const Services = () => {
  const services = [
    {
      title: "Análisis de Modelo de Negocio",
      description: "Evaluamos tu modelo actual: ventas, costos, egresos, roles y flujo de caja para entender tu negocio completo.",
      icon: BarChart3,
      features: [
        "Auditoría completa del modelo físico",
        "Análisis de rentabilidad actual",
        "Identificación de oportunidades",
        "Mapeo de procesos internos"
      ]
    },
    {
      title: "Estrategia Digital Personalizada",
      description: "Construimos un modelo digital específico para tu negocio que maximice la rentabilidad y escalabilidad.",
      icon: Target,
      features: [
        "Diseño de arquitectura digital",
        "Estrategia de monetización",
        "Plan de implementación",
        "Métricas de seguimiento"
      ]
    },
    {
      title: "Desarrollo de Plataformas",
      description: "Creamos sitios web, ecommerce y aplicaciones que se integran perfectamente con tu modelo de negocio.",
      icon: Monitor,
      features: [
        "Desarrollo web personalizado",
        "Ecommerce optimizado",
        "Aplicaciones móviles",
        "Integración de sistemas"
      ]
    },
    {
      title: "Consultoría Estratégica",
      description: "Te acompañamos en la transformación digital con consultoría continua y soporte especializado.",
      icon: Handshake,
      features: [
        "Consultoría especializada",
        "Capacitación del equipo",
        "Soporte técnico 24/7",
        "Optimización continua"
      ]
    }
  ]

  return (
    <section id="servicios" className="h-full bg-white flex flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 flex flex-col">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-6">
            Nuestros Servicios
          </h2>
          <div className="h-1 w-12 sm:w-24 bg-black mx-auto mb-4 sm:mb-8"></div>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Una metodología completa que va más allá del diseño web tradicional
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="bg-white p-4 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-2 sm:mb-4">
                  <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-black mb-2 sm:mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-3 sm:mb-6 text-xs sm:text-base">{service.description}</p>
                
                <ul className="space-y-1 sm:space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-xs sm:text-sm text-gray-600">
                      <Check className="text-green-500 mr-1 sm:mr-2 w-2 h-2 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
