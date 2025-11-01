import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Menu, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import HamburgerMenu from './HamburgerMenu'
import LoginModal from './LoginModal'
import HexagencyLogo from '../assets/HexaLogo.png'

const Header = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleUserIconClick = () => {
    if (user) {
      // Si está autenticado, cerrar sesión
      signOut()
    } else {
      // Si no está autenticado, abrir modal de login
      setIsLoginModalOpen(true)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="w-full px-4 sm:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src={HexagencyLogo} 
                  alt="Hexagency" 
                  className="h-14 sm:h-20 w-auto object-contain drop-shadow-sm"
                />
              </button>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Panel Admin - Solo visible si está autenticado */}
              {user && (
                <button 
                  onClick={() => navigate('/admin')}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs sm:text-sm font-medium"
                  title="Panel Administrativo"
                >
                  <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}

              {/* Usuario / Logout */}
              <button 
                onClick={handleUserIconClick}
                className="text-black hover:text-gray-600 transition-colors relative group"
                title={user ? 'Cerrar sesión' : 'Iniciar sesión'}
              >
                {user ? (
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
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

      {/* Modal de Login */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(data) => {
          console.log('Login exitoso:', data)
          // Aquí puedes manejar el estado de autenticación
        }}
      />
    </>
  )
}

export default Header
