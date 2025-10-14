import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const AdminPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Verificar autenticación
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  // Cargar citas reales de Supabase
  useEffect(() => {
    if (user) {
      fetchAppointments()
    }
  }, [user])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('citas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error cargando citas:', error)
        return
      }

      // Transformar datos de Supabase al formato esperado
      const transformedAppointments = data.map(cita => ({
        id: cita.id,
        nombre: cita.nombre,
        email: cita.email,
        telefono: cita.telefono,
        empresa: cita.empresa || 'No especificada',
        plan: cita.plan,
        fechaPreferida: cita.fecha_preferida,
        horaPreferida: cita.hora_preferida,
        motivoConsulta: cita.motivo_consulta,
        status: cita.status,
        paymentStatus: cita.payment_status,
        fechaCreacion: cita.created_at,
        stripePaymentIntentId: cita.stripe_payment_intent_id,
        stripeSessionId: cita.stripe_session_id,
        amountPaid: cita.amount_paid
      }))

      setAppointments(transformedAppointments)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('citas')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) {
        console.error('Error actualizando cita:', error)
        return
      }

      // Actualizar la lista local
      setAppointments(appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: newStatus }
          : appointment
      ))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const updatePaymentStatus = async (id, newPaymentStatus) => {
    try {
      const { error } = await supabase
        .from('citas')
        .update({ payment_status: newPaymentStatus })
        .eq('id', id)

      if (error) {
        console.error('Error actualizando pago:', error)
        return
      }

      // Actualizar la lista local
      setAppointments(appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, paymentStatus: newPaymentStatus }
          : appointment
      ))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === 'all' || appointment.status === filter
    const matchesSearch = appointment.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente'
      case 'confirmed': return 'Confirmada'
      case 'completed': return 'Completada'
      case 'cancelled': return 'Cancelada'
      default: return status
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Volver al inicio</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-black">Panel de Administración</h1>
            </div>
            <button
              onClick={fetchAppointments}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              🔄 Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por nombre, empresa o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">Todas las citas</option>
                <option value="pending">Pendientes</option>
                <option value="confirmed">Confirmadas</option>
                <option value="completed">Completadas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-black">{appointments.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {appointments.filter(apt => apt.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Confirmadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {appointments.filter(apt => apt.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {appointments.filter(apt => apt.paymentStatus === 'completed').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pagadas</div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-500">Cargando citas...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No hay citas que coincidan con los filtros</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-black">{appointment.nombre}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div><strong>Empresa:</strong> {appointment.empresa}</div>
                      <div><strong>Email:</strong> {appointment.email}</div>
                      <div><strong>Teléfono:</strong> {appointment.telefono}</div>
                      <div><strong>Plan:</strong> {appointment.plan}</div>
                      <div><strong>Fecha:</strong> {appointment.fechaPreferida}</div>
                      <div><strong>Hora:</strong> {appointment.horaPreferida}</div>
                      <div className="md:col-span-2 lg:col-span-3"><strong>Motivo:</strong> {appointment.motivoConsulta}</div>
                      <div><strong>Registro:</strong> {new Date(appointment.fechaCreacion).toLocaleDateString()}</div>
                      <div><strong>Pago:</strong> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          appointment.paymentStatus === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.paymentStatus === 'completed' ? '✅ Pagado' : '⏳ Pendiente'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:min-w-[180px]">
                    {appointment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          ✓ Confirmar
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          ✗ Cancelar
                        </button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        ✓ Completar
                      </button>
                    )}
                    <button
                      onClick={() => window.open(`mailto:${appointment.email}`, '_blank')}
                      className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      📧 Email
                    </button>
                    
                    {/* Botones de estado de pago */}
                    {appointment.paymentStatus === 'pending' && (
                      <button
                        onClick={() => updatePaymentStatus(appointment.id, 'completed')}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        title="Marcar como pagado (transferencia bancaria)"
                      >
                        💰 Marcar Pagado
                      </button>
                    )}
                    {appointment.paymentStatus === 'completed' && (
                      <button
                        onClick={() => updatePaymentStatus(appointment.id, 'pending')}
                        className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                        title="Marcar como pendiente de pago"
                      >
                        ⏳ Marcar Pendiente
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Información de pago adicional */}
                {appointment.paymentStatus === 'completed' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-800">
                      <strong>💰 Pago Completado:</strong> ${appointment.amountPaid ? (appointment.amountPaid / 100).toFixed(2) : '100.00'} USD
                      <br />
                      {appointment.stripePaymentIntentId ? (
                        <>
                          <strong>💳 Método:</strong> Stripe (Tarjeta)
                          <br />
                          <strong>🔗 Stripe ID:</strong> {appointment.stripePaymentIntentId}
                          {appointment.stripeSessionId && (
                            <><br /><strong>📋 Sesión:</strong> {appointment.stripeSessionId}</>
                          )}
                        </>
                      ) : (
                        <>
                          <strong>🏦 Método:</strong> Transferencia Bancaria (Manual)
                          <br />
                          <strong>📅 Registrado:</strong> {new Date().toLocaleDateString()}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              Mostrando <strong>{filteredAppointments.length}</strong> de <strong>{appointments.length}</strong> citas
            </div>
            <div>
              Última actualización: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage

