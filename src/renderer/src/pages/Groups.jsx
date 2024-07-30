import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faSearch } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar'
import GroupTable from '../components/GroupsComponents/GroupTable'
import GroupFilters from '../components/GroupsComponents/GroupFilters'
import ClientModal from '../Modals/ClientModal'
import GroupsPagination from '../components/GroupsComponents/GroupsPagination'

const GroupsPage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'مجموعة 01', clients: [1, 2, 3] },
    { id: 2, name: 'مجموعة 02', clients: [] },
    { id: 3, name: 'مجموعة 03', clients: [4, 5] }
  ])
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const groupsPerPage = 2

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

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * groupsPerPage,
    currentPage * groupsPerPage
  )

  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <div className="bg-purple-600 py-6 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faUsers} className="mr-3 text-3xl" />
              إدارة المجموعات
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="بحث عن مجموعة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <GroupFilters
            newGroupName={newGroupName}
            setNewGroupName={setNewGroupName}
            handleAddGroup={handleAddGroup}
          />
          <GroupTable
            groups={paginatedGroups}
            handleShowClientModal={handleShowClientModal}
            handleDeleteGroup={handleDeleteGroup}
          />
          <GroupsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showClientModal && (
        <ClientModal
          groupId={selectedGroupId}
          groupClients={groups.find((group) => group.id === selectedGroupId)?.clients || []}
          allGroups={groups}
          onClose={() => setShowClientModal(false)}
          onSave={handleSaveClients}
        />
      )}
    </div>
  )
}

export default GroupsPage
