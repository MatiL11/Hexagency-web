import { X } from 'lucide-react'

const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            ¿Por qué somos diferentes?
          </h2>
          <div className="h-1 w-24 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No solo diseñamos sitios web o ecommerce. Analizamos tu modelo de negocio completo 
            para construir una estrategia digital que realmente funcione.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Problem */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-4">
                El problema con otras agencias
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <X className="text-red-500 mr-3 w-5 h-5 flex-shrink-0 mt-0.5" />
                  Solo crean sitios web sin entender tu negocio
                </li>
                <li className="flex items-start">
                  <X className="text-red-500 mr-3 w-5 h-5 flex-shrink-0 mt-0.5" />
                  No analizan tu modelo de negocio actual
                </li>
                <li className="flex items-start">
                  <X className="text-red-500 mr-3 w-5 h-5 flex-shrink-0 mt-0.5" />
                  No consideran rentabilidad ni escalabilidad
                </li>
                <li className="flex items-start">
                  <X className="text-red-500 mr-3 w-5 h-5 flex-shrink-0 mt-0.5" />
                  Soluciones genéricas que no se adaptan a ti
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Our Solution */}
          <div className="space-y-8">
            <div className="bg-black text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                Nuestra metodología
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Análisis del modelo físico</h4>
                    <p className="text-gray-300 text-sm">
                      Evaluamos ventas, costos, egresos, roles administrativos y flujo de caja
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Construcción del modelo digital</h4>
                    <p className="text-gray-300 text-sm">
                      Creamos un modelo digital personalizado basado en tu análisis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Optimización y escalabilidad</h4>
                    <p className="text-gray-300 text-sm">
                      Hacemos tu negocio más rentable y escalable digitalmente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">100%</div>
            <div className="text-gray-600">Personalizado</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">+50%</div>
            <div className="text-gray-600">Aumento promedio en rentabilidad</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">24/7</div>
            <div className="text-gray-600">Soporte continuo</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
