import { useState, useEffect } from 'react'
import { ChevronUp, Zap, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const ContactForm = ({ onHideContactForm }) => {
  const [formData, setFormData] = useState({
    empresa: '',
    telefono: '',
    codigoPais: '+52',
    tipoNegocio: '',
    empleados: '',
    fechaHoraPreferida: '',
    asesor: '',
    problema: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Estado para el contador del banner
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    minutes: 59,
    seconds: 22
  })

  // Efecto para el contador regresivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 }
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }
        } else if (prevTime.days > 0) {
          return { days: prevTime.days - 1, minutes: 59, seconds: 59 }
        } else {
          // Reiniciar el contador cuando llegue a cero
          return { days: 0, minutes: 59, seconds: 22 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Configurar EmailJS cuando el cliente esté listo
      // const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
      // const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      // const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      
      // Preparar mensaje para WhatsApp con los datos del formulario
      const whatsappMessage = `¡Hola! Me interesa el asesoramiento de Hexagency.

📋 *Información de mi empresa:*
🏢 *Empresa:* ${formData.empresa}
📱 *Teléfono:* ${formData.codigoPais} ${formData.telefono}
🏪 *Tipo de negocio:* ${formData.tipoNegocio}
👥 *Empleados:* ${formData.empleados}
📅 *Fecha/hora preferida:* ${formData.fechaHoraPreferida}
👨‍💼 *Asesor preferido:* ${formData.asesor}

💬 *Problema a solucionar:*
${formData.problema}

¿Podrían contactarme para una consulta personalizada?`

      // Redirigir a WhatsApp con el mensaje pre-llenado
      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappURL = `https://wa.me/523511240636?text=${encodedMessage}`
      
      // Abrir WhatsApp en una nueva pestaña
      window.open(whatsappURL, '_blank')
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Limpiar formulario
      setFormData({
        empresa: '',
        telefono: '',
        codigoPais: '+52',
        tipoNegocio: '',
        empleados: '',
        fechaHoraPreferida: '',
        asesor: '',
        problema: ''
      })
      
    } catch (error) {
      console.error('Error procesando formulario:', error)
      setIsSubmitting(false)
      
      // Mostrar mensaje de error al usuario
      alert('Hubo un error al procesar el formulario. Por favor, inténtalo de nuevo.')
    }
  }

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-black mb-4">
              ¡Redirigiendo a WhatsApp!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Se ha abierto WhatsApp con tu mensaje pre-llenado. Envía el mensaje para que nos pongamos en contacto contigo.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  empresa: '',
                  telefono: '',
                  codigoPais: '+52',
                  tipoNegocio: '',
                  empleados: '',
                  fechaHoraPreferida: '',
                  asesor: '',
                  problema: ''
                })
              }}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Hacer otra consulta
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="min-h-screen bg-white flex items-center justify-center relative py-8 sm:py-12">
      {/* Banner de WhatsApp - Contenedor centrado */}
      <div className="absolute top-16 z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-lg p-3 sm:p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-6">
            {/* Sección izquierda - Icono y texto */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="text-white font-medium text-xs sm:text-sm md:text-base">
                ¡Agenda tu asesoramiento express! Es por tiempo limitado:
              </span>
            </div>
            
            {/* Sección central - Contador */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center">
                <div className="text-white text-sm sm:text-lg font-bold">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-white text-xs">DÍAS</div>
              </div>
              <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center">
                <div className="text-white text-sm sm:text-lg font-bold">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-white text-xs">MIN</div>
              </div>
              <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center">
                <div className="text-white text-sm sm:text-lg font-bold">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-white text-xs">SEG</div>
              </div>
            </div>
            
            {/* Sección derecha - Botón de WhatsApp */}
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors"
              onClick={() => {
                const message = encodeURIComponent('Hola! Estoy interesado en el asesoramiento express de Hexagency. ¿Podrían contactarme?')
                window.open(`https://wa.me/523511240636?text=${message}`, '_blank')
              }}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-xs sm:text-sm">Contáctanos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Botón para móviles - Esquina inferior derecha */}
      <button
        onClick={() => {
          // Primero hacer scroll suave
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          
          // Después de un delay, ocultar el formulario
          setTimeout(() => {
            onHideContactForm && onHideContactForm()
          }, 800)
        }}
        className="lg:hidden fixed bottom-4 right-4 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg z-50"
        title="Volver al inicio"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Botón para desktop - Parte superior derecha */}
      <button
        onClick={() => {
          // Primero hacer scroll suave
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          
          // Después de un delay, ocultar el formulario
          setTimeout(() => {
            onHideContactForm && onHideContactForm()
          }, 800)
        }}
        className="hidden lg:block absolute top-16 right-4 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg z-10"
        title="Volver al inicio"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Formulario completo */}
          <form onSubmit={handleSubmit} className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Contenedor agrupado: Texto + Formulario + Botón */}
            <div className="lg:col-span-4">
              {/* Texto centrado arriba del formulario */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3">
                  Consulta Gratuita
                </h2>
                <div className="h-1 w-16 sm:w-24 bg-black mx-auto mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
                  Completa este formulario y te contactaremos para una consulta personalizada sobre tu negocio
                </p>
              </div>
              {/* Formulario */}
              <div className="bg-black p-4 sm:p-6 rounded-lg shadow-lg border border-gray-800">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full mr-3 sm:mr-4"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Información de Contacto</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Campo 1 - Nombre de tu empresa */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Nombre de tu empresa *
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  {/* Campo 2 - Número con código de país */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Número de teléfono *
                    </label>
                    <div className="flex space-x-2">
                      {/* Selector de país */}
                      <select
                        name="codigoPais"
                        value={formData.codigoPais}
                        onChange={handleChange}
                        className="w-24 px-2 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                      >
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+1">🇨🇦 +1</option>
                        <option value="+54">🇦🇷 +54</option>
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+56">🇨🇱 +56</option>
                        <option value="+57">🇨🇴 +57</option>
                        <option value="+51">🇵🇪 +51</option>
                        <option value="+58">🇻🇪 +58</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+82">🇰🇷 +82</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+90">🇹🇷 +90</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+27">🇿🇦 +27</option>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+234">🇳🇬 +234</option>
                        <option value="+254">🇰🇪 +254</option>
                        <option value="+212">🇲🇦 +212</option>
                        <option value="+213">🇩🇿 +213</option>
                        <option value="+216">🇹🇳 +216</option>
                        <option value="+218">🇱🇾 +218</option>
                        <option value="+220">🇬🇲 +220</option>
                        <option value="+221">🇸🇳 +221</option>
                        <option value="+222">🇲🇷 +222</option>
                        <option value="+223">🇲🇱 +223</option>
                        <option value="+224">🇬🇳 +224</option>
                        <option value="+225">🇨🇮 +225</option>
                        <option value="+226">🇧🇫 +226</option>
                        <option value="+227">🇳🇪 +227</option>
                        <option value="+228">🇹🇬 +228</option>
                        <option value="+229">🇧🇯 +229</option>
                        <option value="+230">🇲🇺 +230</option>
                        <option value="+231">🇱🇷 +231</option>
                        <option value="+232">🇸🇱 +232</option>
                        <option value="+233">🇬🇭 +233</option>
                        <option value="+234">🇳🇬 +234</option>
                        <option value="+235">🇹🇩 +235</option>
                        <option value="+236">🇨🇫 +236</option>
                        <option value="+237">🇨🇲 +237</option>
                        <option value="+238">🇨🇻 +238</option>
                        <option value="+239">🇸🇹 +239</option>
                        <option value="+240">🇬🇶 +240</option>
                        <option value="+241">🇬🇦 +241</option>
                        <option value="+242">🇨🇬 +242</option>
                        <option value="+243">🇨🇩 +243</option>
                        <option value="+244">🇦🇴 +244</option>
                        <option value="+245">🇬🇼 +245</option>
                        <option value="+246">🇮🇴 +246</option>
                        <option value="+247">🇦🇨 +247</option>
                        <option value="+248">🇸🇨 +248</option>
                        <option value="+249">🇸🇩 +249</option>
                        <option value="+250">🇷🇼 +250</option>
                        <option value="+251">🇪🇹 +251</option>
                        <option value="+252">🇸🇴 +252</option>
                        <option value="+253">🇩🇯 +253</option>
                        <option value="+254">🇰🇪 +254</option>
                        <option value="+255">🇹🇿 +255</option>
                        <option value="+256">🇺🇬 +256</option>
                        <option value="+257">🇧🇮 +257</option>
                        <option value="+258">🇲🇿 +258</option>
                        <option value="+260">🇿🇲 +260</option>
                        <option value="+261">🇲🇬 +261</option>
                        <option value="+262">🇷🇪 +262</option>
                        <option value="+263">🇿🇼 +263</option>
                        <option value="+264">🇳🇦 +264</option>
                        <option value="+265">🇲🇼 +265</option>
                        <option value="+266">🇱🇸 +266</option>
                        <option value="+267">🇧🇼 +267</option>
                        <option value="+268">🇸🇿 +268</option>
                        <option value="+269">🇰🇲 +269</option>
                        <option value="+290">🇸🇭 +290</option>
                        <option value="+291">🇪🇷 +291</option>
                        <option value="+297">🇦🇼 +297</option>
                        <option value="+298">🇫🇴 +298</option>
                        <option value="+299">🇬🇱 +299</option>
                        <option value="+350">🇬🇮 +350</option>
                        <option value="+351">🇵🇹 +351</option>
                        <option value="+352">🇱🇺 +352</option>
                        <option value="+353">🇮🇪 +353</option>
                        <option value="+354">🇮🇸 +354</option>
                        <option value="+355">🇦🇱 +355</option>
                        <option value="+356">🇲🇹 +356</option>
                        <option value="+357">🇨🇾 +357</option>
                        <option value="+358">🇫🇮 +358</option>
                        <option value="+359">🇧🇬 +359</option>
                        <option value="+370">🇱🇹 +370</option>
                        <option value="+371">🇱🇻 +371</option>
                        <option value="+372">🇪🇪 +372</option>
                        <option value="+373">🇲🇩 +373</option>
                        <option value="+374">🇦🇲 +374</option>
                        <option value="+375">🇧🇾 +375</option>
                        <option value="+376">🇦🇩 +376</option>
                        <option value="+377">🇲🇨 +377</option>
                        <option value="+378">🇸🇲 +378</option>
                        <option value="+380">🇺🇦 +380</option>
                        <option value="+381">🇷🇸 +381</option>
                        <option value="+382">🇲🇪 +382</option>
                        <option value="+383">🇽🇰 +383</option>
                        <option value="+385">🇭🇷 +385</option>
                        <option value="+386">🇸🇮 +386</option>
                        <option value="+387">🇧🇦 +387</option>
                        <option value="+389">🇲🇰 +389</option>
                        <option value="+420">🇨🇿 +420</option>
                        <option value="+421">🇸🇰 +421</option>
                        <option value="+423">🇱🇮 +423</option>
                        <option value="+500">🇫🇰 +500</option>
                        <option value="+501">🇧🇿 +501</option>
                        <option value="+502">🇬🇹 +502</option>
                        <option value="+503">🇸🇻 +503</option>
                        <option value="+504">🇭🇳 +504</option>
                        <option value="+505">🇳🇮 +505</option>
                        <option value="+506">🇨🇷 +506</option>
                        <option value="+507">🇵🇦 +507</option>
                        <option value="+508">🇵🇲 +508</option>
                        <option value="+509">🇭🇹 +509</option>
                        <option value="+590">🇬🇵 +590</option>
                        <option value="+591">🇧🇴 +591</option>
                        <option value="+592">🇬🇾 +592</option>
                        <option value="+593">🇪🇨 +593</option>
                        <option value="+594">🇬🇫 +594</option>
                        <option value="+595">🇵🇾 +595</option>
                        <option value="+596">🇲🇶 +596</option>
                        <option value="+597">🇸🇷 +597</option>
                        <option value="+598">🇺🇾 +598</option>
                        <option value="+599">🇧🇶 +599</option>
                        <option value="+670">🇹🇱 +670</option>
                        <option value="+672">🇦🇶 +672</option>
                        <option value="+673">🇧🇳 +673</option>
                        <option value="+674">🇳🇷 +674</option>
                        <option value="+675">🇵🇬 +675</option>
                        <option value="+676">🇹🇴 +676</option>
                        <option value="+677">🇸🇧 +677</option>
                        <option value="+678">🇻🇺 +678</option>
                        <option value="+679">🇫🇯 +679</option>
                        <option value="+680">🇵🇼 +680</option>
                        <option value="+681">🇼🇫 +681</option>
                        <option value="+682">🇨🇰 +682</option>
                        <option value="+683">🇳🇺 +683</option>
                        <option value="+684">🇦🇸 +684</option>
                        <option value="+685">🇼🇸 +685</option>
                        <option value="+686">🇰🇮 +686</option>
                        <option value="+687">🇳🇨 +687</option>
                        <option value="+688">🇹🇻 +688</option>
                        <option value="+689">🇵🇫 +689</option>
                        <option value="+690">🇹🇰 +690</option>
                        <option value="+691">🇫🇲 +691</option>
                        <option value="+692">🇲🇭 +692</option>
                        <option value="+850">🇰🇵 +850</option>
                        <option value="+852">🇭🇰 +852</option>
                        <option value="+853">🇲🇴 +853</option>
                        <option value="+855">🇰🇭 +855</option>
                        <option value="+856">🇱🇦 +856</option>
                        <option value="+880">🇧🇩 +880</option>
                        <option value="+886">🇹🇼 +886</option>
                        <option value="+960">🇲🇻 +960</option>
                        <option value="+961">🇱🇧 +961</option>
                        <option value="+962">🇯🇴 +962</option>
                        <option value="+963">🇸🇾 +963</option>
                        <option value="+964">🇮🇶 +964</option>
                        <option value="+965">🇰🇼 +965</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+967">🇾🇪 +967</option>
                        <option value="+968">🇴🇲 +968</option>
                        <option value="+970">🇵🇸 +970</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+972">🇮🇱 +972</option>
                        <option value="+973">🇧🇭 +973</option>
                        <option value="+974">🇶🇦 +974</option>
                        <option value="+975">🇧🇹 +975</option>
                        <option value="+976">🇲🇳 +976</option>
                        <option value="+977">🇳🇵 +977</option>
                        <option value="+992">🇹🇯 +992</option>
                        <option value="+993">🇹🇲 +993</option>
                        <option value="+994">🇦🇿 +994</option>
                        <option value="+995">🇬🇪 +995</option>
                        <option value="+996">🇰🇬 +996</option>
                        <option value="+998">🇺🇿 +998</option>
                      </select>
                      {/* Campo de número */}
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                        placeholder="55 1234 5678"
                      />
                    </div>
                  </div>

                  {/* Campo 3 - Tipo de negocio */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Tipo de negocio *
                    </label>
                    <select
                      name="tipoNegocio"
                      value={formData.tipoNegocio}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Selecciona tu tipo de negocio</option>
                      <option value="retail">Retail / Tienda física</option>
                      <option value="servicios">Servicios profesionales</option>
                      <option value="restaurante">Restaurante / Gastronomía</option>
                      <option value="salud">Salud / Bienestar</option>
                      <option value="educacion">Educación</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Campo 4 - Número de empleados */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Número de empleados *
                    </label>
                    <select
                      name="empleados"
                      value={formData.empleados}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Cantidad de empleados</option>
                      <option value="1-5">1-5 empleados</option>
                      <option value="6-20">6-20 empleados</option>
                      <option value="21-50">21-50 empleados</option>
                      <option value="50+">50+ empleados</option>
                    </select>
                  </div>

                  {/* Campo 5 - Fecha y hora preferida */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Fecha y hora preferida *
                    </label>
                    <input
                      type="datetime-local"
                      name="fechaHoraPreferida"
                      value={formData.fechaHoraPreferida}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    />
                  </div>

                  {/* Campo 6 - Asesor preferido */}
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Asesor preferido *
                    </label>
                    <select
                      name="asesor"
                      value={formData.asesor}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black text-sm sm:text-base"
                    >
                      <option value="">Selecciona un asesor</option>
                      <option value="Fernando Ramírez">Fernando Ramírez - CEO & Fundador</option>
                      <option value="Enrique Ramírez">Enrique Ramírez - Director de Estrategia</option>
                      <option value="Alesh Ancira">Alesh Ancira - Director de Operaciones</option>
                      <option value="Yzak García">Yzak García - Director de Desarrollo</option>
                      <option value="Sin preferencia">Sin preferencia (Te asignaremos el mejor asesor)</option>
                    </select>
                  </div>

                  {/* Campo 7 - Problema a solucionar */}
                  <div className="group sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 group-focus-within:text-white transition-colors">
                      Problema a solucionar *
                    </label>
                    <textarea
                      name="problema"
                      value={formData.problema}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 text-black placeholder-gray-500 resize-none text-sm sm:text-base"
                      placeholder="Describe el problema principal que necesitas solucionar en tu negocio..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Botón de envío justo debajo del formulario */}
              <div className="mt-2 sm:mt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {isSubmitting ? 'Redirigiendo...' : 'Enviar a WhatsApp'}
                </button>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                  * Campos obligatorios
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
