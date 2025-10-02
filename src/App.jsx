import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import ContactForm from './components/ContactForm'
import AdminPanel from './components/AdminPanel'

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <ContactForm />
      
      {/* Selector de idioma */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span>ES</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
    </div>
  )
}

export default App
