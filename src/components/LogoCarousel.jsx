import { useState, useEffect } from 'react'
import BloombergLogo from '../assets/BloombergLogo.png'
import EntrepreneurLogo from '../assets/EntrepreneurLogo.png'
import ForbesLogo from '../assets/forbesLogo.png'
import GQLogo from '../assets/GQLogo.png'
import TWSJLogo from '../assets/TWSJLogo.png'

const LogoCarousel = ({ 
  title = "Confían en nosotros", 
  speed = 30, 
  showTitle = true,
  className = "",
  logoHeight = "h-8",
  gap = "gap-12 md:gap-16"
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const logos = [
    { src: BloombergLogo, alt: "Bloomberg" },
    { src: EntrepreneurLogo, alt: "Entrepreneur" },
    { src: ForbesLogo, alt: "Forbes" },
    { src: GQLogo, alt: "GQ" },
    { src: TWSJLogo, alt: "TWSJ" },
  ]

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${className}`}>
      {showTitle && (
        <p className="text-sm text-gray-500 mb-8">{title}</p>
      )}
      
      {/* Contenedor del carrusel con efecto de desvanecimiento */}
      <div className="relative overflow-hidden">
        {/* Gradientes de desvanecimiento */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        {/* Carrusel infinito */}
        <div 
          className="flex animate-scroll-infinite"
          style={{ '--scroll-duration': `${speed}s` }}
        >
          {/* Primera fila de logos */}
          <div className={`flex items-center ${gap} flex-shrink-0`}>
            {logos.map((logo, index) => (
              <div key={`first-${index}`} className={`${logoHeight} flex items-center opacity-70 hover:opacity-100 transition-opacity duration-300`}>
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`${logoHeight} w-auto object-contain filter brightness-0 invert`}
                />
              </div>
            ))}
          </div>
          
          {/* Segunda fila de logos (duplicada para efecto infinito) */}
          <div className={`flex items-center ${gap} flex-shrink-0 ml-12 md:ml-16`}>
            {logos.map((logo, index) => (
              <div key={`second-${index}`} className={`${logoHeight} flex items-center opacity-70 hover:opacity-100 transition-opacity duration-300`}>
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`${logoHeight} w-auto object-contain filter brightness-0 invert`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoCarousel
