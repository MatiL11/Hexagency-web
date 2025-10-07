import { Users, Crown, Briefcase, Code, Shield, Palette, Database, PenTool } from 'lucide-react'

const About = () => {
  const teamMembers = [
    {
      name: "Fernando Ramírez",
      position: "Director Ejecutivo y Estratega de Innovación Empresarial",
      icon: Crown,
      isDirector: true
    },
    {
      name: "Yzak García",
      position: "Asesor Bursátil e Inmobiliario",
      icon: Briefcase
    },
    {
      name: "Jesús Arias",
      position: "Asesor en Contaduría Pública",
      icon: Briefcase
    },
    {
      name: "Andre De Alba",
      position: "Asesor Bursátil",
      icon: Briefcase
    },
    {
      name: "Tadeo B.",
      position: "Programador Analista",
      icon: Code
    },
    {
      name: "Adrián T.",
      position: "Programador y Especialista en Ciberseguridad",
      icon: Shield
    },
    {
      name: "Maximiliano Arroyo",
      position: "Programador Analista",
      icon: Code
    },
    {
      name: "Mariana R.",
      position: "Project Manager",
      icon: Users
    },
    {
      name: "Carlos J.",
      position: "Diseñador UX/UI",
      icon: Palette
    },
    {
      name: "Erick L.",
      position: "Desarrollador Back-End",
      icon: Database
    },
    {
      name: "Luna A.",
      position: "Estratega de Contenido Digital",
      icon: PenTool
    }
  ]

  return (
    <section id="nosotros" className="h-full bg-white flex flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:pt-4 sm:py-6 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-3">
            Quiénes Somos
          </h2>
          <div className="h-1 w-12 sm:w-24 bg-black mx-auto mb-3 sm:mb-2"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-4xl mx-auto px-2 mb-4 sm:mb-2">
            
              En Hexagency creemos que cualquier empresa puede evolucionar si combina estrategia, tecnología y visión.
            Transformamos negocios físicos en modelos digitales rentables, automatizados y listos para escalar.
            Nuestro trabajo une finanzas, software y estrategia real para lograr resultados medibles y sostenibles.
          </p>
        </div>

        {/* Director Section */}
        <div className="mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Placeholder for Director Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2">
                  Fernando Ramírez
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">
                  Director Ejecutivo y Estratega de Innovación Empresarial
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Líder visionario con más de una década de experiencia en transformación digital empresarial. 
                  Especialista en estrategias de crecimiento, automatización de procesos y optimización de modelos de negocio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-black text-center mb-3 sm:mb-4">
            EQUIPO HEXAGENCY
          </h3>
          
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {teamMembers.slice(1).map((member, index) => {
              const IconComponent = member.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-2 sm:p-3 hover:shadow-lg transition-shadow duration-300">
                  {/* Placeholder for Team Member Image */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-xs sm:text-sm font-bold text-black mb-1">
                      {member.name}
                    </h4>
                    <p className="text-xs text-gray-600 leading-tight">
                      {member.position}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Description */}
        <div className="text-center mt-3 sm:mt-4">
          <div className="bg-white rounded-lg p-3 sm:max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              <span className="text-green-600 font-semibold"></span> Parte del equipo de Hexagency: expertos en estrategia, finanzas, programación y automatización.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
