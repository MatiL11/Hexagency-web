import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import LogoCarousel from './LogoCarousel'

const HERO_TEXTS = [
  "Transformamos tu negocio tradicional en digital",
  "Nosotros lo desarrollamos de 0",
  "Reserva tu cita con Hexagency"
]

const Hero = ({ onShowContactForm }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const current = HERO_TEXTS[currentText]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayText(current.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2800)
        }
      } else if (charIndex > 0) {
        setDisplayText(current.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else {
        setIsTransitioning(true)
        setTimeout(() => {
          const nextIndex = (currentText + 1) % HERO_TEXTS.length
          setCurrentText(nextIndex)
          setCharIndex(0)
          setIsDeleting(false)
          setDisplayText('')
          setIsTransitioning(false)
        }, 260)
      }
    }, isDeleting ? 55 : 95)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentText])

  return (
    <section
      id="inicio"
      className="flex h-full w-full flex-col justify-center bg-black px-4 pb-16 pt-4 text-white sm:px-8 sm:pt-6 md:pb-20 md:pt-10"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center sm:gap-8 lg:max-w-6xl">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <h1
              className={`max-w-3xl px-2 text-3xl font-bold leading-tight transition-all duration-500 ease-in-out sm:px-0 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              ${isTransitioning ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </h1>
            <span className="h-1 w-14 bg-white sm:h-1.5 sm:w-20 md:w-24"></span>
          </div>
        </div>

        <div
          className={`max-w-3xl transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="px-2 text-sm text-gray-300 sm:px-0 sm:text-lg md:text-xl">
            Somos especialistas en transformar negocios físicos en negocios rentables digitales. El trabajo lo hacemos a través de{' '}
            <span className="text-white font-semibold">sistemas</span>,{' '}
            <span className="text-white font-semibold">estrategias digitales</span> y{' '}
            <span className="text-white font-semibold">software</span> rentables, combinando{' '}
            <span className="text-white font-semibold">estrategia</span>,{' '}
            <span className="text-white font-semibold">innovación</span> y{' '}
            <span className="text-white font-semibold">acompañamiento personal</span> a tu equipo.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ease-out delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
            className="group mx-auto flex items-center space-x-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-white/20 sm:px-8 sm:py-4 sm:text-lg"
          >
            <span>Evalúa tu negocio</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="w-full pt-4 sm:pt-6 md:pt-8">
          <LogoCarousel title="Confían en nosotros" speed={30} showTitle className="delay-500" />
        </div>
      </div>
    </section>
  )
}

export default Hero
