import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const DrivingSessionModal = ({ session, onClose, onSave }) => {
  const [groupId, setGroupId] = useState(session ? session.group : '')
  const [clients, setClients] = useState([])
  const [selectedClients, setSelectedClients] = useState(session ? session.clients : [])

  const availableGroups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' }
  ]

  const availableClients = [
    { id: 1, name: 'Client 1', groupId: 1 },
    { id: 2, name: 'Client 2', groupId: 1 },
    { id: 3, name: 'Client 3', groupId: 2 },
    { id: 4, name: 'Client 4', groupId: 2 },
    { id: 5, name: 'Client 5', groupId: 3 }
  ]

  useEffect(() => {
    if (groupId) {
      setClients(availableClients.filter((client) => client.groupId === parseInt(groupId)))
    }
  }, [groupId])

  const handleSubmit = (e) => {
    e.preventDefault()
    const sessionData = {
      group: groupId,
      clients: selectedClients,
      clientCount: selectedClients.length
    }
    onSave(sessionData)
    onClose()
  }

  const handleClientChange = (clientId, field, value) => {
    setSelectedClients((prevClients) =>
      prevClients.map((client) => (client.id === clientId ? { ...client, [field]: value } : client))
    )
  }

  const handleClientToggle = (client) => {
    setSelectedClients((prevClients) =>
      prevClients.some((c) => c.id === client.id)
        ? prevClients.filter((c) => c.id !== client.id)
        : [...prevClients, { ...client, date: '', time: '', status: 'غير محدد' }]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {session ? 'تعديل الحصة' : 'إضافة حصة'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                المجموعة
              </label>
              <select
                id="group"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">اختر مجموعة</option>
                {availableGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {groupId && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">المترشحون</label>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map((client) => (
                  <div key={client.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id={`client-${client.id}`}
                        checked={selectedClients.some((c) => c.id === client.id)}
                        onChange={() => handleClientToggle(client)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`client-${client.id}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {client.name}
                      </label>
                    </div>
                    {selectedClients.some((c) => c.id === client.id) && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`client-date-${client.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            تاريخ
                          </label>
                          <input
                            type="date"
                            id={`client-date-${client.id}`}
                            value={selectedClients.find((c) => c.id === client.id)?.date || ''}
                            onChange={(e) => handleClientChange(client.id, 'date', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`client-time-${client.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            التوقيت
                          </label>
                          <input
                            type="time"
                            id={`client-time-${client.id}`}
                            value={selectedClients.find((c) => c.id === client.id)?.time || ''}
                            onChange={(e) => handleClientChange(client.id, 'time', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`client-status-${client.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            الحالة
                          </label>
                          <select
                            id={`client-status-${client.id}`}
                            value={
                              selectedClients.find((c) => c.id === client.id)?.status || 'غير محدد'
                            }
                            onChange={(e) =>
                              handleClientChange(client.id, 'status', e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="غير محدد">غير محدد</option>
                            <option value="ناجح">ناجح</option>
                            <option value="يعيد">يعيد</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DrivingSessionModal
