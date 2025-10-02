import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const [currentText, setCurrentText] = useState(0)
  
  const heroTexts = [
    "HEXAGENCY",
    "El poder de la estrategia",
    "para tu negocio digital"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
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
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight">
            {heroTexts[currentText]}
          </h1>
          <div className="h-2 w-24 bg-white mx-auto mb-8"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-white mb-8 font-light">
          Transformamos tu modelo de negocio físico en una estrategia digital rentable y escalable
        </p>
        
        <div className="space-y-4">
          <button className="bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Descubre nuestra metodología
          </button>
          
          <div className="flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>


      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroTexts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentText(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentText === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
