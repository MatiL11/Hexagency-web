import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = ({ onShowContactForm }) => {
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const heroTexts = [
    "HEXAGENCY",
    "El poder de la estrategia",
    "para tu negocio digital"
  ]

  useEffect(() => {
    const current = heroTexts[currentText]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (charIndex < current.length) {
          setDisplayText(current.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          // Pausa antes de borrar
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Borrando
        if (charIndex > 0) {
          setDisplayText(current.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          // Cambiar al siguiente texto con transición suave
          setIsTransitioning(true)
          setTimeout(() => {
            const nextIndex = (currentText + 1) % heroTexts.length
            setCurrentText(nextIndex)
            setCharIndex(0)
            setIsDeleting(false)
            setDisplayText('')
            setIsTransitioning(false)
          }, 300) // Pequeña pausa para suavizar el cambio
        }
      }
    }, isDeleting ? 50 : 100) // Más rápido al borrar

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentText, heroTexts])

  return (
    <section id="inicio" className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Patrón de fondo minimalista */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Content */}
             <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
               <div className="mb-6 sm:mb-8">
                 <div className="min-h-[150px] sm:min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                   <h1 className={`text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-tight transition-all duration-500 ease-in-out ${
                     isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                   }`}>
                     {displayText}
                     <span className="animate-pulse">|</span>
                   </h1>
                 </div>
                 <div className="h-1 sm:h-2 w-16 sm:w-24 bg-white mx-auto mb-6 sm:mb-8 transition-all duration-500 ease-in-out"></div>
               </div>
               
               <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 font-light px-2">
                 Transformamos tu modelo de negocio físico en una estrategia digital rentable y escalable
               </p>
        
        <div className="space-y-3 sm:space-y-4">
          <button 
            onClick={() => {
              onShowContactForm()
              // Scroll hacia abajo para mostrar el formulario
              setTimeout(() => {
                const formElement = document.getElementById('contacto')
                if (formElement) {
                  // En móviles, usar scrollTo para evitar problemas de posicionamiento
                  if (window.innerWidth < 768) {
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: 'smooth'
                    })
                  } else {
                    formElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                } else {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  })
                }
              }, 100)
            }}
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 rounded-lg"
          >
            Descubre nuestra metodología
          </button>
          
          <div className="flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}

export default Hero
