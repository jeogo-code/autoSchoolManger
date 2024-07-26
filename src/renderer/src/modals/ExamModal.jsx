import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ExamModal = ({ exam, onClose, onSave, groups }) => {
  const [groupId, setGroupId] = useState(exam ? exam.groupId : '')
  const [date, setDate] = useState(exam ? exam.date : '')
  const [time, setTime] = useState(exam ? exam.time : '')
  const [clients, setClients] = useState(exam ? exam.clients : [])
  const [availableClients, setAvailableClients] = useState([])

  useEffect(() => {
    if (groupId) {
      const group = groups.find((g) => g.id === parseInt(groupId))
      setAvailableClients(group ? group.clients : [])
    } else {
      setAvailableClients([])
    }
  }, [groupId, groups])

  const handleAddClient = (clientId) => {
    const client = availableClients.find((c) => c.id === parseInt(clientId))
    if (client && !clients.some((c) => c.id === client.id)) {
      setClients([...clients, { ...client, result: 'not determined' }])
    }
  }

  const handleRemoveClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId))
  }

  const handleClientResultChange = (clientId, result) => {
    setClients(clients.map((client) => (client.id === clientId ? { ...client, result } : client)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const examData = { groupId, date, time, clients }
    onSave(examData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{exam ? 'تعديل الامتحان' : 'إضافة امتحان'}</h2>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                required
              >
                <option value="">اختر مجموعة</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                تاريخ
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                التوقيت
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">إضافة مترشح</label>
            <div className="flex items-center space-x-2">
              <select
                className="form-control px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                onChange={(e) => handleAddClient(e.target.value)}
              >
                <option value="">اختر مترشحاً</option>
                {availableClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">نتائج المترشحين</label>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-yellow-600 text-white">
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-200">ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-200">اسم المترشح</th>
                    <th className="px-6 py-3 border-b-2 border-gray-200">النتيجة</th>
                    <th className="px-6 py-3 border-b-2 border-gray-200">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <tr key={client.id} className="hover:bg-teal-50">
                        <td className="px-6 py-4 border-b border-gray-200">{client.id}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{client.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <select
                            value={client.result}
                            onChange={(e) => handleClientResultChange(client.id, e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                          >
                            <option value="pass">ناجح</option>
                            <option value="fail">راسب</option>
                            <option value="retake">يعيد</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <button
                            onClick={() => handleRemoveClient(client.id)}
                            className="bg-red-600 text-white px-4 py-1 rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <div role="alert" className="alert alert-secondary">
                          <h2 className="text-center">لا يوجد مترشحون</h2>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExamModal
