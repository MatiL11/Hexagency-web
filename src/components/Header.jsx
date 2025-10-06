import { useState } from 'react'
import { User, Menu } from 'lucide-react'
import HamburgerMenu from './HamburgerMenu'
import HexagencyLogo from '../assets/HexagencyLogo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white">
        <div className="w-full px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src={HexagencyLogo} 
                  alt="Hexagency" 
                  className="h-12 sm:h-12 w-auto object-contain"
                />
              </button>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Usuario */}
              <button className="text-black hover:text-gray-600 transition-colors">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Menú hamburguesa */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-black hover:text-gray-600 transition-colors"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú hamburguesa */}
      <HamburgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  )
}

export default Header
