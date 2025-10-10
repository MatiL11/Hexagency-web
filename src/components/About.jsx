import { Users, Crown, Briefcase, Code, Shield, Palette, Database, PenTool, Camera, Video } from 'lucide-react'
import FernandoRamirezImg from '../assets/FernandoRamirez.jpeg'
import YzakGarciaImg from '../assets/YzakGarcía.jpeg'
import AleshAnciraImg from '../assets/AleshAncira.jpeg'
import EnriqueRamirezImg from '../assets/EnriqueRamirez.jpeg'

const About = () => {
  const teamMembers = [
    {
      name: "Fernando Ramírez",
      position: "Director - Estratega Financiero & Especialista en Modelos Digitales",
      icon: Crown,
      image: FernandoRamirezImg,
      isDirector: true
    },
    {
      name: "Alesh Ancira",
      position: "Consultora en Posicionamiento Digital & Asesora de Imagen",
      icon: Camera,
      image: AleshAnciraImg
    },
    {
      name: "Yzak García",
      position: "Consultor en Real Estate & Asesor Bursátil",
      icon: Briefcase,
      image: YzakGarciaImg
    },
    {
      name: "Maximiliano Arroyo",
      position: "Ingeniero en Software & Desarrollador Full Stack",
      icon: Code
    },
    {
      name: "Tadeo Barrera",
      position: "Programador Analista & Diseñador Web",
      icon: Code
    },
    {
      name: "Adrián Téllez",
      position: "Ingeniero en Ciberseguridad & Especialista en Protección de Datos",
      icon: Shield
    },
    {
      name: "Jesús Arias N.",
      position: "Contador Público & Consultor Fiscal",
      icon: Briefcase
    },
    {
      name: "Leonardo Ramírez B.",
      position: "Programador, Operador de Drones & Productor Audiovisual",
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
          </p>
        </div>

        {/* Director Section */}
        <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md p-4 sm:p-5 hover:shadow-lg transition-shadow duration-300 w-full max-w-sm min-h-[160px] flex flex-col">
            {/* Director Image */}
            <div className="flex-shrink-0">
              <img 
                src={FernandoRamirezImg} 
                alt="Fernando Ramírez" 
                className="w-18 h-18 sm:w-16 sm:w-18 sm:h-18 mx-auto mb-3 rounded-full object-cover border border-gray-300"
              />
            </div>
            
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3 className="text-xs sm:text-sm font-bold text-black mb-2">
                {teamMembers[0].name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {teamMembers[0].position}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-black text-center mb-3 sm:mb-4">
            EQUIPO DIRECTIVO Y CONSULTORES ESPECIALIZADOS
          </h3>
          
          {/* Vista para Móviles - Grid único sin espacios vacíos */}
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 lg:hidden gap-2 sm:gap-3">
            {teamMembers.slice(1).map((member, index) => {
              const IconComponent = member.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-2 sm:p-3 hover:shadow-lg transition-shadow duration-300 min-h-[120px] flex flex-col">
                  {/* Team Member Image or Icon */}
                  <div className="flex-shrink-0">
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
                  </div>
                  
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <h4 className="text-xs sm:text-sm font-bold text-black mb-1">
                      {member.name}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {member.position}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Vista para Monitores - Distribución 3-4 */}
          <div className="hidden lg:flex lg:flex-col gap-2 sm:gap-3 flex-1">
            {/* Primera fila - 3 empleados */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 justify-items-center max-w-5xl mx-auto">
              {teamMembers.slice(1, 4).map((member, index) => {
                const IconComponent = member.icon
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 w-full max-w-xs min-h-[140px] flex flex-col">
                    {/* Team Member Image or Icon */}
                    <div className="flex-shrink-0">
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
                    </div>
                    
                    <div className="text-center flex-1 flex flex-col justify-center">
                      <h4 className="text-xs sm:text-sm font-bold text-black mb-2">
                        {member.name}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {member.position}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Segunda fila - 4 empleados */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 justify-items-center">
              {teamMembers.slice(4).map((member, index) => {
                const IconComponent = member.icon
                return (
                  <div key={index + 3} className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 w-full max-w-sm min-h-[140px] flex flex-col">
                    {/* Team Member Image or Icon */}
                    <div className="flex-shrink-0">
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
                    </div>
                    
                    <div className="text-center flex-1 flex flex-col justify-center">
                      <h4 className="text-xs sm:text-sm font-bold text-black mb-2">
                        {member.name}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
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
