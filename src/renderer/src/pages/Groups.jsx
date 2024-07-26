import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar'
import ClientModal from '../modals/ClientModal' // Updated import path

const Groups = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'مجموعة 01', clients: [1] },
    { id: 2, name: 'مجموعة 02', clients: [] }
  ])
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      setGroups([...groups, { id: groups.length + 1, name: newGroupName, clients: [] }])
      setNewGroupName('')
    }
  }

  const handleDeleteGroup = (id) => {
    setGroups(groups.filter((group) => group.id !== id))
  }

  const handleShowClientModal = (groupId) => {
    setSelectedGroupId(groupId)
    setShowClientModal(true)
  }

  const handleSaveClients = (groupId, selectedClients) => {
    setGroups(
      groups.map((group) => (group.id === groupId ? { ...group, clients: selectedClients } : group))
    )
  }

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-br from-teal-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <NavBar />
        <div className="bg-purple-600 py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">
            <FontAwesomeIcon icon={faUsers} className="mr-2" /> إدارة المجموعات
          </h1>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">إنشاء مجموعة جديدة</h2>
          <div className="mb-6 flex flex-col md:flex-row items-center">
            <input
              type="text"
              placeholder="اسم المجموعة"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="form-control mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
            <button
              onClick={handleAddGroup}
              className="bg-purple-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> إضافة مجموعة
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">قائمة المجموعات</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200">ID</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">اسم المجموعة</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">عدد المترشحين</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">إجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {groups.map((group) => (
                  <tr key={group.id} className="hover:bg-teal-50">
                    <td className="px-6 py-4 border-b border-gray-200">{group.id}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{group.name}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{group.clients.length}</td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <button
                        onClick={() => handleShowClientModal(group.id)}
                        className="bg-blue-600 text-white px-4 py-1 mr-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> إضافة مترشح
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="bg-red-600 text-white px-4 py-1 rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showClientModal && (
        <ClientModal
          groupId={selectedGroupId}
          groupClients={groups.find((group) => group.id === selectedGroupId).clients}
          allGroups={groups}
          onClose={() => setShowClientModal(false)}
          onSave={handleSaveClients}
        />
      )}
    </div>
  )
}

export default Groups
