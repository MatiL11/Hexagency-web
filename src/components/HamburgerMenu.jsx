import { useState } from 'react'
import { X } from 'lucide-react'

const HamburgerMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: '¿TE INTERESA HEXAGENCY?', href: '#contacto' },
    { name: 'AVISO LEGAL', href: '#legal' },
    { name: 'POLÍTICA DE PRIVACIDAD', href: '#privacy' },
    { name: 'TÉRMINOS DEL SERVICIO', href: '#terms' }
  ]

  const footerLinks = [
    'NO DUDES EN CONTACTARNOS',
    'HEXAGENCY',
    'C/ de la Carrera de la Cruz 2, 41012 Sevilla',
    'Teléfono: +34 666 666 666',
    'Email: info@hexagency.com'
  ]

  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <div className={`fixed inset-0 z-50 bg-white transition-all duration-500 ease-in-out transform ${
      isOpen 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      {/* Header del menú */}
      <div className="flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-black">HEXAGENCY</h2>
        <button
          onClick={onClose}
          className="text-black hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Contenido principal del menú */}
      <div className={`flex h-full transition-all duration-700 ease-out delay-100 ${
        isOpen 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}>
        {/* Menú principal - lado izquierdo */}
        <div className="flex-1 p-4 sm:p-8">
          <nav className="space-y-1 sm:space-y-2">
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className={`block py-3 sm:py-4 px-4 sm:px-6 text-2xl sm:text-4xl md:text-6xl font-bold transition-all duration-300 ${
                    hoveredItem === index
                      ? 'bg-black text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
        </div>

        {/* Lado derecho - enlaces secundarios */}
        <div className="hidden sm:block w-80 p-4 sm:p-8 border-l border-gray-200">
          <div className="space-y-3 sm:space-y-4">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="block text-xs sm:text-sm text-black hover:text-gray-600 transition-colors py-1"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu
