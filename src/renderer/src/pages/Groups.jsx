import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faSearch } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar'
import GroupTable from '../components/GroupsComponents/GroupTable'
import GroupFilters from '../components/GroupsComponents/GroupFilters'
import ClientModal from '../Modals/ClientModal'

const GroupsPage = () => {
  const [groups, setGroups] = useState([])
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      const groupData = await window.api.getAllGroups()
      setGroups(groupData || [])
    } catch (error) {
      console.error('Failed to fetch groups:', error)
    }
  }

  const handleAddGroup = async () => {
    if (newGroupName.trim()) {
      try {
        await window.api.addGroup({ name: newGroupName, description: '' })
        setNewGroupName('')
        fetchGroups()
      } catch (error) {
        console.error('Failed to create group:', error)
      }
    } else {
      console.error('Group name is required')
    }
  }

  const handleDeleteGroup = async (id) => {
    try {
      await window.api.deleteGroup(id)
      fetchGroups()
    } catch (error) {
      console.error('Failed to delete group:', error)
    }
  }

  const handleShowClientModal = (groupId) => {
    setSelectedGroupId(groupId)
    setShowClientModal(true)
  }

  const handleSaveClients = async (groupId, selectedClients) => {
    try {
      // Update group in the database
      await window.api.updateGroup(groupId, selectedClients)

      // Fetch all clients to update their groupId
      const allClients = await window.api.getAllClients()

      // Update the groupId for the selected clients
      const updatedClients = allClients.map((client) => {
        if (selectedClients.includes(client._id)) {
          return { ...client, groupId }
        } else if (client.groupId === groupId) {
          return { ...client, groupId: '' }
        }
        return client
      })

      // Update clients in the database
      await Promise.all(updatedClients.map((client) => window.api.updateClient(client)))

      fetchGroups()
      setShowClientModal(false)
    } catch (error) {
      console.error('Failed to update group:', error)
    }
  }

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            groups={filteredGroups}
            handleShowClientModal={handleShowClientModal}
            handleDeleteGroup={handleDeleteGroup}
          />
        </div>
      </div>
      {showClientModal && (
        <ClientModal
          groupId={selectedGroupId}
          groupClients={groups.find((group) => group._id === selectedGroupId)?.clientIds || []}
          allGroups={groups}
          onClose={() => setShowClientModal(false)}
          onSave={handleSaveClients}
        />
      )}
    </div>
  )
}

export default GroupsPage
