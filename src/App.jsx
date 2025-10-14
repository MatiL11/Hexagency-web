import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Globe, ChevronDown } from 'lucide-react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import MediaSection from './components/MediaSection'
import ContactForm from './components/ContactForm'
import AdminPanel from './components/AdminPanel'
import BookingPage from './pages/BookingPage'
import BookingSuccess from './pages/BookingSuccess'
import BookingCanceled from './pages/BookingCanceled'

const MainApp = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCanceledModal, setShowCanceledModal] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const location = useLocation()

  // Verificar si hay parámetros de éxito o cancelación en la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    
    if (urlParams.get('success') === 'true') {
      setBookingData({
        plan: urlParams.get('plan') || 'No especificado',
        email: urlParams.get('email') || 'No especificado',
        fecha: urlParams.get('fecha') || 'No especificada',
        hora: urlParams.get('hora') || 'No especificada',
        citaId: urlParams.get('citaId') || 'No especificado'
      })
      setShowSuccessModal(true)
    } else if (urlParams.get('canceled') === 'true') {
      setBookingData({
        plan: urlParams.get('plan') || 'No especificado',
        email: urlParams.get('email') || 'No especificado',
        fecha: urlParams.get('fecha') || 'No especificada',
        hora: urlParams.get('hora') || 'No especificada'
      })
      setShowCanceledModal(true)
    }
  }, [location])

  // Controlar scrollbar cuando se muestra el formulario
  useEffect(() => {
    if (showContactForm) {
      document.body.classList.add('show-form')
      document.documentElement.classList.add('show-form')
    } else {
      document.body.classList.remove('show-form')
      document.documentElement.classList.remove('show-form')
    }

    // Cleanup al desmontar
    return () => {
      document.body.classList.remove('show-form')
      document.documentElement.classList.remove('show-form')
    }
  }, [showContactForm])
  const scrollContainerRef = useRef(null)
  const [currentSection, setCurrentSection] = useState(0)
  const totalSections = 4

  // Convertir scroll vertical en horizontal
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isScrolling = false

    const handleWheel = (e) => {
      e.preventDefault()
      
      if (isScrolling) return
      
      isScrolling = true
      
      if (e.deltaY > 0) {
        // Scroll hacia abajo - ir a la siguiente sección
        setCurrentSection(prev => {
          const next = Math.min(prev + 1, totalSections - 1)
          return next
        })
      } else {
        // Scroll hacia arriba - ir a la sección anterior
        setCurrentSection(prev => {
          const prevSection = Math.max(prev - 1, 0)
          return prevSection
        })
      }
      
      // Permitir scroll después de un delay más largo
      setTimeout(() => {
        isScrolling = false
      }, 800)
    }

    // Añadir listener al documento para capturar el scroll en toda la página
    document.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Scroll a la sección actual
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollToSection = () => {
      const sectionWidth = window.innerWidth
      container.scrollTo({
        left: currentSection * sectionWidth,
        behavior: 'smooth'
      })
    }

    // Pequeño delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(scrollToSection, 10)
    
    return () => clearTimeout(timeoutId)
  }, [currentSection])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onOpenAdminPanel={() => setShowAdminPanel(true)} />
    
      {/* Contenedor horizontal con scroll */}
      <div 
        ref={scrollContainerRef}
        className="flex h-screen pt-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        <div className="flex-shrink-0 w-full h-full snap-center">
          <Hero onShowContactForm={() => setShowContactForm(true)} />
        </div>
        <div className="flex-shrink-0 w-full h-full snap-center">
          <Services />
        </div>
        <div className="flex-shrink-0 w-full h-full snap-center">
          <About />
        </div>
        <div className="flex-shrink-0 w-full h-full snap-center">
          <MediaSection />
        </div>
      </div>
      
      {/* Formulario de contacto que aparece al hacer scroll hacia abajo */}
      {showContactForm && (
        <div className="w-full bg-white">
          <ContactForm onHideContactForm={() => setShowContactForm(false)} />
        </div>
      )}
      
      {/* Indicadores de sección - Solo se muestran cuando NO está el formulario */}
      {!showContactForm && (
        <div className="fixed bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
                currentSection === index 
                  ? (currentSection === 0 ? 'bg-white scale-125' : 'bg-black scale-125') // Hero: blanco, otras: negro
                  : (currentSection === 0 ? 'bg-white bg-opacity-50 hover:bg-opacity-75' : 'bg-black bg-opacity-50 hover:bg-opacity-75')
              }`}
            />
          ))}
        </div>
      )}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
      
      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BookingSuccess 
              bookingData={bookingData}
              onClose={() => setShowSuccessModal(false)}
            />
          </div>
        </div>
      )}

      {/* Modal de cancelación */}
      {showCanceledModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BookingCanceled 
              bookingData={bookingData}
              onClose={() => setShowCanceledModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
            <Routes>
              <Route path="/" element={<MainApp />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/booking/success" element={<BookingSuccess />} />
              <Route path="/booking/canceled" element={<BookingCanceled />} />
            </Routes>
        
        {/* Modales fuera del contenedor principal para evitar problemas de overflow */}
        <div id="modal-root"></div>
      </AuthProvider>
    </Router>
  )
}

export default App
