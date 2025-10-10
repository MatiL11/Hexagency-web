import { Users, Crown, Briefcase, Code, Shield, Palette, Database, PenTool, Camera, Video } from 'lucide-react'
import FernandoRamirezImg from '../assets/FernandoRamirez.jpeg'
import YzakGarciaImg from '../assets/YzakGarcía.jpeg'
import AleshAnciraImg from '../assets/AleshAncira.jpeg'
import EnriqueRamirezImg from '../assets/EnriqueRamirez.jpeg'

const About = () => {
  const teamMembers = [
    {
      name: "Fernando Ramírez",
      position: "Director - Estratega Financiero e Innovación Empresarial",
      icon: Crown,
      image: FernandoRamirezImg,
      isDirector: true
    },
    {
      name: "Yzak García",
      position: "Asesor Bursátil e Inmobiliario",
      icon: Briefcase,
      image: YzakGarciaImg
    },
    {
      name: "Jesús Arias",
      position: "Asesor SAT y Contaduría Pública",
      icon: Briefcase
    },
    {
      name: "Andre De Alba",
      position: "Asesor Bursátil",
      icon: Briefcase
    },
    {
      name: "Tadeo B.",
      position: "Programador Analista / Diseñador Web",
      icon: Code
    },
    {
      name: "Adrián T.",
      position: "Ingeniero en Ciberseguridad",
      icon: Shield
    },
    {
      name: "Maximiliano Arroyo",
      position: "Ingeniero en Software",
      icon: Code
    },
    {
      name: "Carlos J.",
      position: "Diseñador UX/UI",
      icon: Palette
    },
    {
      name: "Luna A.",
      position: "Estratega de Contenido Digital",
      icon: PenTool
    },
    {
      name: "Alesh Ancira",
      position: "Asesor en Imagen y Presencia Digital",
      icon: Camera,
      image: AleshAnciraImg
    },
    {
      name: "L. Enrique Ramírez",
      position: "Event Project Manager - Administrador",
      icon: Users,
      image: EnriqueRamirezImg
    },
    {
      name: "Leonardo Ramírez V",
      position: "Drone Operator & Video Producer",
      icon: Video
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
              {/* Director Image */}
              <img 
                src={FernandoRamirezImg} 
                alt="Fernando Ramírez" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0 border-2 border-gray-300"
              />
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2">
                  Fernando Ramírez
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">
                  Director - Estratega Financiero e Innovación Empresarial
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
          
          {/* Vista para Móviles - Grid único sin espacios vacíos */}
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 lg:hidden gap-2 sm:gap-3">
            {teamMembers.slice(1).map((member, index) => {
              const IconComponent = member.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-2 sm:p-3 hover:shadow-lg transition-shadow duration-300">
                  {/* Team Member Image or Icon */}
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                    </div>
                  )}
                  
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

          {/* Vista para Monitores - Dos filas separadas (5 + 6) */}
          <div className="hidden lg:flex lg:flex-col gap-2 sm:gap-3 flex-1">
            {/* Primera fila - 5 empleados */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {teamMembers.slice(1, 6).map((member, index) => {
                const IconComponent = member.icon
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-2 sm:p-3 hover:shadow-lg transition-shadow duration-300">
                    {/* Team Member Image or Icon */}
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                      </div>
                    )}
                    
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

            {/* Segunda fila - 6 empleados */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {teamMembers.slice(6).map((member, index) => {
                const IconComponent = member.icon
                return (
                  <div key={index + 5} className="bg-white rounded-lg shadow-md p-2 sm:p-3 hover:shadow-lg transition-shadow duration-300">
                    {/* Team Member Image or Icon */}
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                      </div>
                    )}
                    
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
