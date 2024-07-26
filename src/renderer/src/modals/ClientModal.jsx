import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ClientModal = ({ groupId, groupClients, allGroups, onClose, onSave }) => {
  const [clients, setClients] = useState([])
  const [selectedClients, setSelectedClients] = useState(groupClients)

  useEffect(() => {
    // Fetch clients from API or state management
    setClients([
      { id: 1, name: 'اسامة قنفود' },
      { id: 2, name: 'محمد علي' }
      // Add more sample clients here
    ])
  }, [])

  const handleSelectClient = (clientId) => {
    setSelectedClients((prevSelected) =>
      prevSelected.includes(clientId)
        ? prevSelected.filter((id) => id !== clientId)
        : [...prevSelected, clientId]
    )
  }

  const handleSave = () => {
    onSave(groupId, selectedClients)
    onClose()
  }

  const getClientGroup = (clientId) => {
    for (let group of allGroups) {
      if (group.clients.includes(clientId)) {
        return group.name
      }
    }
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">إضافة مترشح إلى المجموعة</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        <div className="mt-4">
          <ul className="space-y-2">
            {clients.map((client) => {
              const clientGroup = getClientGroup(client.id)
              const isClientInAnotherGroup =
                clientGroup && clientGroup !== allGroups.find((group) => group.id === groupId).name
              return (
                <li
                  key={client.id}
                  className="flex items-center justify-between border p-2 rounded-md"
                >
                  <span>{client.name}</span>
                  <button
                    onClick={() => handleSelectClient(client.id)}
                    disabled={isClientInAnotherGroup}
                    className={`px-4 py-1 rounded-md shadow-lg transition duration-150 ease-in-out ${
                      selectedClients.includes(client.id)
                        ? 'bg-red-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {isClientInAnotherGroup
                      ? `موجود في ${clientGroup}`
                      : selectedClients.includes(client.id)
                        ? 'إزالة'
                        : 'إضافة'}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-teal-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientModal
