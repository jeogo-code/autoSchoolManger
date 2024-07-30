import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch, faClock } from '@fortawesome/free-solid-svg-icons'

const DrivingSessionModal = ({ session, onClose, onSave, clients, groups }) => {
  const [groupId, setGroupId] = useState('all')
  const [date, setDate] = useState(session ? session.date : '')
  const [filteredClients, setFilteredClients] = useState(clients)
  const [selectedClients, setSelectedClients] = useState(session ? session.clients : [])
  const [searchTerm, setSearchTerm] = useState('')
  const [commonTime, setCommonTime] = useState('')

  useEffect(() => {
    // Filter clients based on group selection and search term
    let filtered = clients
    if (groupId !== 'all') {
      filtered = filtered.filter((client) => client.groupId === parseInt(groupId))
    }
    if (searchTerm) {
      filtered = filtered.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredClients(filtered)
  }, [groupId, searchTerm, clients])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!date) {
      console.error('Date is required')
      return
    }

    // Create new sessions array with valid client data
    const newSessions = selectedClients
      .map((client, index) => ({
        id: `${client.id}-${index + 1}`, // Unique driving lesson ID
        group: client.groupId
          ? groups.find((group) => group.id === client.groupId)?.name
          : 'No Group',
        client: client.name,
        date,
        time: client.time || commonTime,
        clientId: client.id
      }))
      .filter((session) => session.time) // Ensure time is defined

    if (newSessions.length > 0) {
      onSave(newSessions)
      onClose()
    } else {
      console.error('No valid sessions to save')
    }
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
        : [...prevClients, { ...client, date, time: commonTime, status: 'غير محدد' }]
    )
  }

  const handleApplySameTime = () => {
    if (commonTime) {
      setSelectedClients((prevClients) =>
        prevClients.map((client) => ({ ...client, time: commonTime }))
      )
    }
  }

  const handleSelectAll = () => {
    setSelectedClients(
      filteredClients.map((client) => ({ ...client, date, time: commonTime, status: 'غير محدد' }))
    )
  }

  const handleDeselectAll = () => {
    setSelectedClients([])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {session ? 'تعديل الحصة' : 'إضافة حصة'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                المجموعة
              </label>
              <select
                id="group"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">كل المجموعات</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                التاريخ
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="commonTime" className="block text-sm font-medium text-gray-700">
                التوقيت المشترك
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="time"
                  id="commonTime"
                  value={commonTime}
                  onChange={(e) => setCommonTime(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleApplySameTime}
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FontAwesomeIcon icon={faClock} />
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث عن المترشح..."
              className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
          </div>
          {filteredClients.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">المترشحون</label>
                <div className="space-x-2 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    تحديد الكل
                  </button>
                  <button
                    type="button"
                    onClick={handleDeselectAll}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    إلغاء تحديد الكل
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`client-${client.id}`}
                          checked={selectedClients.some((c) => c.id === client.id)}
                          onChange={() => handleClientToggle(client)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`client-${client.id}`}
                          className="ml-2 block text-sm font-medium text-gray-900"
                        >
                          {client.name}
                        </label>
                      </div>
                    </div>
                    {selectedClients.some((c) => c.id === client.id) && (
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor={`client-time-${client.id}`}
                            className="block text-xs font-medium text-gray-700"
                          >
                            التوقيت
                          </label>
                          <input
                            type="time"
                            id={`client-time-${client.id}`}
                            value={selectedClients.find((c) => c.id === client.id)?.time || ''}
                            onChange={(e) => handleClientChange(client.id, 'time', e.target.value)}
                            className="mt-1 block w-full px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`client-status-${client.id}`}
                            className="block text-xs font-medium text-gray-700"
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
                            className="mt-1 block w-full px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
