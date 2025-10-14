import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AdminPanel = ({ onClose }) => {
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Cargar citas reales de Supabase
  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
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
      default: return 'Desconocido'
    }
  }

  const getTipoNegocioText = (tipo) => {
    const tipos = {
      'retail': 'Retail',
      'servicios': 'Servicios',
      'restaurante': 'Restaurante',
      'salud': 'Salud',
      'educacion': 'Educación',
      'tecnologia': 'Tecnología',
      'otro': 'Otro'
    }
    return tipos[tipo] || tipo
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-black">Panel de Administración - Citas</h2>
          <div className="flex gap-3">
            <button
              onClick={fetchAppointments}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Actualizar
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b bg-gray-50">
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
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">{appointments.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {appointments.filter(apt => apt.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600">Confirmadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(apt => apt.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {appointments.filter(apt => apt.paymentStatus === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Pagadas</div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="overflow-y-auto max-h-96">
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay citas que coincidan con los filtros
            </div>
          ) : (
            <div className="divide-y">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-black">{appointment.nombre}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div><strong>Empresa:</strong> {appointment.empresa}</div>
                        <div><strong>Email:</strong> {appointment.email}</div>
                        <div><strong>Teléfono:</strong> {appointment.telefono}</div>
                        <div><strong>Plan:</strong> {appointment.plan}</div>
                        <div><strong>Fecha:</strong> {appointment.fechaPreferida}</div>
                        <div><strong>Hora:</strong> {appointment.horaPreferida}</div>
                        <div><strong>Motivo:</strong> {appointment.motivoConsulta}</div>
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
                    
                    <div className="mt-4 lg:mt-0 lg:ml-4">
                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                          >
                            Marcar Completada
                          </button>
                        )}
                        <button
                          onClick={() => window.open(`mailto:${appointment.email}`, '_blank')}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                        >
                          Email
                        </button>
                        
                        {/* Botones de estado de pago */}
                        {appointment.paymentStatus === 'pending' && (
                          <button
                            onClick={() => updatePaymentStatus(appointment.id, 'completed')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            title="Marcar como pagado (transferencia bancaria)"
                          >
                            💰 Marcar Pagado
                          </button>
                        )}
                        {appointment.paymentStatus === 'completed' && (
                          <button
                            onClick={() => updatePaymentStatus(appointment.id, 'pending')}
                            className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                            title="Marcar como pendiente de pago"
                          >
                            ⏳ Marcar Pendiente
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Información de pago adicional */}
                  {appointment.paymentStatus === 'completed' && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
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
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {filteredAppointments.length} de {appointments.length} citas
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cerrar Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
