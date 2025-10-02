import { useState } from 'react'
import { User, Menu } from 'lucide-react'
import HamburgerMenu from './HamburgerMenu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white">
        <div className="w-full px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">HEXAGENCY</h1>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              {/* Usuario */}
              <button className="text-black hover:text-gray-600 transition-colors">
                <User className="w-6 h-6" />
              </button>

              {/* Menú hamburguesa */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-black hover:text-gray-600 transition-colors"
              >
                <Menu className="w-6 h-6" />
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
