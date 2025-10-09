import { Check, MessageCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CreditCard, Calendar } from 'lucide-react'
import { useState } from 'react'

const About = () => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const plans = [
    {
      id: 1,
      name: "Profesional",
      subtitle: "Diagnóstico de negocio físico + Formación financiera y digital + Sitio web",
      duration: "3 meses",
      sessions: "hasta 8",
      price: "$3,000",
      currency: "USD",
      payment: "tarjeta | 3, 6 o 9 meses sin intereses",
      description: "Ideal para emprendedores y negocios que buscan orden, estrategia y presencia digital sólida",
      features: [
        "Análisis completo del modelo de negocio físico o marca personal",
        "Formación financiera y digital personalizada",
        "Asesoría y ayuda para facturar como persona física o moral, con contadores de Hexagency",
        "Diseño y desarrollo de sitio web o landing page profesional (marca personal, negocio o ecommerce)",
        "Acompañamiento semanal y seguimiento de tareas"
      ],
      buttonText: "Comenzar Ahora",
      popular: false
    },
    {
      id: 2,
      name: "Premium",
      subtitle: "Estrategia Digital + Desarrollo de Plataformas",
      duration: "3 meses",
      sessions: "hasta 20",
      price: "$8,500",
      currency: "USD",
      payment: "tarjeta | 3, 6 o 9 meses sin intereses",
      description: "Ideal para empresas que desean automatizar su modelo de negocio y escalar digitalmente",
      features: [
        "Diseño de arquitectura digital personalizada",
        "Estrategia de monetización y crecimiento",
        "Desarrollo de plataformas profesionales (sitio web, ecommerce o software interno)",
        "Automatización de procesos (pagos, CRM, dashboards)",
        "Capacitación práctica (20 sesiones)",
        "Landing page profesional incluida",
        "Acompañamiento contable y fiscal"
      ],
      buttonText: "Elegir Plan",
      popular: false
    },
    {
      id: 3,
      name: "Élite",
      subtitle: "Mentoría Ejecutiva Personalizada",
      duration: "4 meses",
      sessions: "hasta 40",
      hours: "100 horas totales",
      price: "$15,000",
      currency: "USD",
      payment: "tarjeta | 3, 6 o 9 meses sin intereses",
      description: "Ideal para empresas consolidadas que buscan automatizar ventas, reducir costos y posicionarse globalmente",
      features: [
        "Mentoría directa con Fernando Ramírez, Director Ejecutivo y Estratega de Innovación Empresarial",
        "Rediseño financiero y operativo completo",
        "Asesoría fiscal con contadores del equipo",
        "Desarrollo de software y CRM personalizados",
        "Seguimiento de clientes, ventas, facturación y métricas",
        "Plataformas de venta automatizadas a largo plazo",
        "Sistemas que venden 24/7 con procesos automáticos y cobros digitales",
        "Landing page y sitio web internacional",
        "Posicionamiento en medios internacionales",
        "Soporte diario y comunicación directa con el equipo ejecutivo"
      ],
      buttonText: "Contactar Ventas",
      popular: false
    }
  ]

  const planFaqs = {
    1: [
      {
        id: 1,
        question: "¿Qué incluye el análisis del modelo de negocio físico?",
        answer: "Analizamos tu modelo actual: ventas, costos, egresos, roles administrativos, flujo de caja y estructura organizacional para identificar oportunidades de mejora."
      },
      {
        id: 2,
        question: "¿Cómo funciona la formación financiera personalizada?",
        answer: "Te enseñamos conceptos financieros básicos, cómo interpretar estados financieros, manejo de flujo de caja y estrategias para optimizar la rentabilidad de tu negocio."
      },
      {
        id: 3,
        question: "¿Qué tipo de sitio web incluye este plan?",
        answer: "Incluye un sitio web profesional responsivo, optimizado para SEO, con formulario de contacto y hasta 5 páginas. Puede ser para marca personal, negocio o ecommerce básico."
      },
      {
        id: 4,
        question: "¿Cómo es el acompañamiento semanal?",
        answer: "Sesiones de seguimiento semanales donde revisamos el progreso, resolvemos dudas, ajustamos estrategias y te guiamos en la implementación de las mejoras."
      }
    ],
    2: [
      {
        id: 1,
        question: "¿Qué es la arquitectura digital personalizada?",
        answer: "Diseñamos la estructura completa de tu presencia digital: sitio web, ecommerce, CRM, sistemas de pago y automatizaciones específicas para tu modelo de negocio."
      },
      {
        id: 2,
        question: "¿Qué tipo de automatización incluye este plan?",
        answer: "Automatización de pagos, gestión de clientes (CRM), dashboards de métricas, procesos de venta, seguimiento de inventario y sistemas de notificaciones."
      },
      {
        id: 3,
        question: "¿Cómo son las 20 sesiones de capacitación?",
        answer: "Sesiones prácticas donde te enseñamos a usar todas las herramientas digitales, interpretar métricas, optimizar procesos y mantener tu sistema funcionando."
      },
      {
        id: 4,
        question: "¿Qué incluye el acompañamiento contable y fiscal?",
        answer: "Asesoría para facturación digital, manejo de impuestos, optimización fiscal y cumplimiento de obligaciones contables según tu régimen."
      }
    ],
    3: [
      {
        id: 1,
        question: "¿Cómo funciona la mentoría con Fernando Ramírez?",
        answer: "Sesiones directas y personalizadas con Fernando, Director Ejecutivo, donde te guía en la transformación completa de tu empresa hacia un modelo digital escalable."
      },
      {
        id: 2,
        question: "¿Qué incluye el rediseño financiero y operativo?",
        answer: "Reestructuración completa de costos, optimización de procesos, mejora de flujo de caja y diseño de un modelo operativo más eficiente y rentable."
      },
      {
        id: 3,
        question: "¿Cómo funcionan los sistemas de venta 24/7?",
        answer: "Desarrollamos plataformas automatizadas que venden sin intervención manual: ecommerce avanzado, sistemas de suscripción, cobros automáticos y seguimiento de clientes."
      },
      {
        id: 4,
        question: "¿Qué incluye el posicionamiento en medios internacionales?",
        answer: "Estrategia de marketing internacional, presencia en medios digitales globales, networking internacional y posicionamiento de marca en mercados extranjeros."
      }
    ]
  }

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  const selectPlan = (planId) => {
    setSelectedPlan(planId)
    setExpandedFaq(null) // Reset FAQ when changing plan
  }

  const nextPlan = () => {
    const newIndex = (currentPlanIndex + 1) % plans.length
    setCurrentPlanIndex(newIndex)
    setSelectedPlan(plans[newIndex].id)
    setExpandedFaq(null) // Reset FAQ when changing plan
  }

  const prevPlan = () => {
    const newIndex = (currentPlanIndex - 1 + plans.length) % plans.length
    setCurrentPlanIndex(newIndex)
    setSelectedPlan(plans[newIndex].id)
    setExpandedFaq(null) // Reset FAQ when changing plan
  }

  const goToPlan = (index) => {
    setCurrentPlanIndex(index)
    setSelectedPlan(plans[index].id)
    setExpandedFaq(null) // Reset FAQ when changing plan
  }

  return (
    <section id="nosotros" className="h-full bg-white flex flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-3">
            Nuestros Programas
          </h2>
          <div className="h-1 w-12 sm:w-24 bg-black mx-auto mb-2 sm:mb-3"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-2">
            Nuestros programas están diseñados para ayudarte a alcanzar tus objetivos de negocio de manera eficiente y sostenible.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Plans Carousel */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-black mb-4 text-center sm:text-left">Selecciona un Plan</h3>
            
            {/* Carousel Container */}
            <div className="flex items-center gap-4">
              {/* Left Arrow */}
              <button
                onClick={prevPlan}
                className="flex-shrink-0 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Plan Display */}
              <div className="flex-1 overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentPlanIndex * 100}%)` }}
                >
                  {plans.map((plan) => (
                    <div key={plan.id} className="w-full flex-shrink-0 px-2">
                      <div 
                        onClick={() => selectPlan(plan.id)}
                        className={`relative bg-white rounded-lg shadow-lg border-2 p-4 sm:p-6 lg:p-8 cursor-pointer transition-all duration-200 h-[560px] sm:h-[580px] ${
                          selectedPlan === plan.id 
                            ? 'border-black ring-2 ring-black ring-opacity-20' 
                            : plan.popular 
                              ? 'border-gray-300 hover:border-gray-400' 
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Más Popular
                            </span>
                          </div>
                        )}
                        
                        <div className="text-center mb-2 sm:mb-3">
                          <h4 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-1">{plan.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium leading-tight">{plan.subtitle}</p>
                          
                          <div className="mb-2">
                            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">{plan.price}</span>
                            <span className="text-gray-600 ml-1 text-sm">{plan.currency}</span>
                          </div>
                          
                          <div className="space-y-0.5 mb-2 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Duración:</span>
                              <span className="font-semibold">{plan.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sesiones:</span>
                              <span className="font-semibold">{plan.sessions}</span>
                            </div>
                            {plan.hours && (
                              <div className="flex justify-between">
                                <span>Horas:</span>
                                <span className="font-semibold">{plan.hours}</span>
                              </div>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              {plan.payment}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-xs sm:text-sm leading-tight mb-2 sm:mb-3">{plan.description}</p>
                        </div>

                        <ul className={`space-y-1 sm:space-y-1.5 mb-4 sm:mb-5 max-h-28 sm:max-h-32 overflow-y-auto`}>
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="text-green-500 mr-2 w-3 h-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-xs leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Botones de Acción */}
                        <div className="space-y-2 mb-2 sm:mb-4">
                          <button className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors hover:bg-gray-800 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Comprar el plan completo
                          </button>
                          
                          <button className="w-full bg-gray-100 text-black py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors hover:bg-gray-200 flex items-center justify-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Reservar una cita por $100 USD
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextPlan}
                className="flex-shrink-0 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPlan(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPlanIndex === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - FAQ for Selected Plan (Desktop Only) */}
          <div className="hidden lg:block">
            <h3 className="text-lg sm:text-xl font-bold text-black mb-4">
              Preguntas Frecuentes - {plans.find(p => p.id === selectedPlan)?.name}
            </h3>
            
            <div className="space-y-3">
              {planFaqs[selectedPlan].map((faq) => (
                <div key={faq.id} className="bg-gray-50 rounded-lg border border-gray-200">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-black text-sm pr-3">
                      {faq.question}
                    </span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-3">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Texto Informativo */}
            <div className="mt-6 p-4 bg-white">
              <p className="text-sm text-gray-700 leading-relaxed text-center">
                Puedes iniciar con una cita de diagnóstico por $100 USD o adquirir directamente el programa completo.
                <br />
                ¡La cita se resta del plan que elijas si decides optar por nosotros!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section for Mobile - Below Plans */}
        <div className="lg:hidden mt-6">
          <h3 className="text-base sm:text-lg font-bold text-black mb-3 text-center">
            Preguntas Frecuentes - {plans.find(p => p.id === selectedPlan)?.name}
          </h3>
          
          <div className="space-y-2">
            {planFaqs[selectedPlan].map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-black text-xs pr-2">
                    {faq.question}
                  </span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-3 pb-2.5">
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Texto Informativo Mobile */}
          <div className="mt-4 p-3 bg-white">
            <p className="text-xs text-gray-700 leading-relaxed text-center">
              Puedes iniciar con una cita de diagnóstico por $100 USD o adquirir directamente el programa completo.
              <br />
              ¡La cita se resta del plan que elijas si decides optar por nosotros!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
