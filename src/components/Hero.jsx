import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import LogoCarousel from './LogoCarousel'

const Hero = ({ onShowContactForm }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const heroTexts = [
    "Cualquier modelo de negocio puede ser digital.",
    "Te asesoramos para que ganes de ello.",
    "Transformamos tu negocio tradicional en digital."
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const current = heroTexts[currentText]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayText(current.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 3000)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(current.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsTransitioning(true)
          setTimeout(() => {
            const nextIndex = (currentText + 1) % heroTexts.length
            setCurrentText(nextIndex)
            setCharIndex(0)
            setIsDeleting(false)
            setDisplayText('')
            setIsTransitioning(false)
          }, 300)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentText, heroTexts])

  return (
    <section id="inicio" className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-black">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-px h-32 bg-white"></div>
            <div className="absolute bottom-1/3 left-1/3 w-32 h-px bg-white"></div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-8 md:px-4 max-w-md sm:max-w-4xl md:max-w-6xl mx-auto">
        {/* Mensaje principal */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="min-h-[100px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[300px] flex items-center justify-center w-full max-w-full overflow-hidden">
              <h1
                className={`text-center font-bold text-white leading-tight transition-all duration-500 ease-in-out break-words
                ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
                text-[1.6rem] sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl px-4 sm:px-0`}
              >
                {displayText}
                <span className="animate-pulse">|</span>
              </h1>
            </div>
            <div className="h-1 sm:h-2 w-12 sm:w-16 md:w-24 bg-white mx-auto mb-4 sm:mb-6 md:mb-8 transition-all duration-500 ease-in-out"></div>
          </div>
        </div>

        {/* Descripción */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Somos especialistas en transformar negocios tradicionales en estrategias digitales 
            rentables. Nuestro enfoque combina <span className="text-white font-semibold">estrategia</span>, 
            <span className="text-white font-semibold"> innovación</span> y 
            <span className="text-white font-semibold"> acompañamiento</span> para generar 
            <span className="text-white font-semibold"> resultados reales</span>.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-1000 ease-out delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => {
              onShowContactForm()
              setTimeout(() => {
                const formElement = document.getElementById('contacto')
                if (formElement) {
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
            className="group bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-105 rounded-lg shadow-2xl hover:shadow-white/15 flex items-center mx-auto space-x-2"
          >
            <span>Evalúa tu negocio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Logo carousel */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8">
          <LogoCarousel
            title="Confían en nosotros"
            speed={30}
            showTitle={true}
            className="delay-1000"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
