import { X } from 'lucide-react'

const About = () => {
  return (
    <section id="nosotros" className="h-full py-8 sm:py-20 bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-6">
            ¿Por qué somos diferentes?
          </h2>
          <div className="h-1 w-12 sm:w-24 bg-black mx-auto mb-4 sm:mb-8"></div>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            No solo diseñamos sitios web o ecommerce. Analizamos tu modelo de negocio completo 
            para construir una estrategia digital que realmente funcione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-16 items-center">
          {/* Left side - Problem */}
          <div className="space-y-4 sm:space-y-8">
            <div className="bg-gray-50 p-4 sm:p-8 rounded-lg">
              <h3 className="text-lg sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                El problema con otras agencias
              </h3>
              <ul className="space-y-2 sm:space-y-4 text-gray-600">
                <li className="flex items-start">
                  <X className="text-red-500 mr-2 sm:mr-3 w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-base">Solo crean sitios web sin entender tu negocio</span>
                </li>
                <li className="flex items-start">
                  <X className="text-red-500 mr-2 sm:mr-3 w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-base">No analizan tu modelo de negocio actual</span>
                </li>
                <li className="flex items-start">
                  <X className="text-red-500 mr-2 sm:mr-3 w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-base">No consideran rentabilidad ni escalabilidad</span>
                </li>
                <li className="flex items-start">
                  <X className="text-red-500 mr-2 sm:mr-3 w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-base">Soluciones genéricas que no se adaptan a ti</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Our Solution */}
          <div className="space-y-4 sm:space-y-8">
            <div className="bg-black text-white p-4 sm:p-8 rounded-lg">
              <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">
                Nuestra metodología
              </h3>
              <div className="space-y-3 sm:space-y-6">
                <div className="flex items-start">
                  <div className="bg-white text-black w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold mr-2 sm:mr-4 flex-shrink-0 text-xs sm:text-base">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base">Análisis del modelo físico</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Evaluamos ventas, costos, egresos, roles administrativos y flujo de caja
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white text-black w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold mr-2 sm:mr-4 flex-shrink-0 text-xs sm:text-base">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base">Construcción del modelo digital</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Creamos un modelo digital personalizado basado en tu análisis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white text-black w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold mr-2 sm:mr-4 flex-shrink-0 text-xs sm:text-base">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base">Optimización y escalabilidad</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Hacemos tu negocio más rentable y escalable digitalmente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 sm:mt-20 grid grid-cols-3 gap-2 sm:gap-8">
          <div className="text-center">
            <div className="text-lg sm:text-4xl font-bold text-black mb-1 sm:mb-2">100%</div>
            <div className="text-gray-600 text-xs sm:text-base">Personalizado</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-4xl font-bold text-black mb-1 sm:mb-2">+50%</div>
            <div className="text-gray-600 text-xs sm:text-base">Aumento promedio en rentabilidad</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-4xl font-bold text-black mb-1 sm:mb-2">24/7</div>
            <div className="text-gray-600 text-xs sm:text-base">Soporte continuo</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
