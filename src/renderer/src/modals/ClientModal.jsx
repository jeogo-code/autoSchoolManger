import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faSearch,
  faUserPlus,
  faUserMinus,
  faUserCheck
} from '@fortawesome/free-solid-svg-icons'

const ClientModal = ({ groupId, groupClients, allGroups, onClose, onSave }) => {
  const [clients, setClients] = useState([])
  const [selectedClients, setSelectedClients] = useState(groupClients)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch clients from API or state management
    setClients([
      { id: 1, name: 'اسامة قنفود' },
      { id: 2, name: 'محمد علي' },
      { id: 3, name: 'فاطمة الزهراء' },
      { id: 4, name: 'عبد الرحمن محمود' },
      { id: 5, name: 'زينب أحمد' }
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

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-3xl" dir="rtl">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">إضافة مترشح إلى المجموعة</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition duration-150"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        <div className="mt-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث عن مترشح..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="mt-4 max-h-96 overflow-y-auto">
          <ul className="space-y-2">
            {filteredClients.map((client) => {
              const clientGroup = getClientGroup(client.id)
              const isClientInAnotherGroup =
                clientGroup && clientGroup !== allGroups.find((group) => group.id === groupId).name
              return (
                <li
                  key={client.id}
                  className="flex items-center justify-between border p-3 rounded-md hover:bg-gray-50 transition duration-150"
                >
                  <span className="font-medium">{client.name}</span>
                  <button
                    onClick={() => handleSelectClient(client.id)}
                    disabled={isClientInAnotherGroup}
                    className={`px-4 py-2 rounded-md shadow-lg transition duration-150 ease-in-out flex items-center ${
                      isClientInAnotherGroup
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : selectedClients.includes(client.id)
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        isClientInAnotherGroup
                          ? faUserCheck
                          : selectedClients.includes(client.id)
                            ? faUserMinus
                            : faUserPlus
                      }
                      className="mr-2"
                    />
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
            className="bg-purple-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientModal
