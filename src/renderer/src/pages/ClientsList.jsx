import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/ClientsComponents/Header'
import SearchBar from '../components/ClientsComponents/SearchBar'
import ClientTable from '../components/ClientsComponents/ClientTable'
import ClientModal from '../Modals/ClientModel'
import ConfirmationPopup from '../components/ClientsComponents/ConfirmationPopup'

const ClientsList = () => {
  const [clients, setClients] = useState([])
  const [groups, setGroups] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientToDelete, setClientToDelete] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('details')
  useEffect(() => {
    fetchClientsAndGroups()
  }, [])

  const fetchClientsAndGroups = async () => {
    try {
      const [allClients, allGroups] = await Promise.all([
        window.api.getAllClients(),
        window.api.getAllGroups()
      ])
      setClients(allClients)
      setGroups(allGroups)
    } catch (error) {
      console.error('Error fetching clients and groups:', error)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleUpdateClient = async (updatedClient) => {
    try {
      await window.api.updateClient(updatedClient)
      setClients((prevClients) =>
        prevClients.map((client) => (client._id === updatedClient._id ? updatedClient : client))
      )
      setSelectedClient(null)
      setIsModalVisible(false)
    } catch (error) {
      console.error('Error updating client:', error)
    }
  }

  const handleDeleteClient = async () => {
    if (!clientToDelete) return

    try {
      await window.api.deleteClient(clientToDelete._id)
      setClients((prevClients) => prevClients.filter((client) => client._id !== clientToDelete._id))
      setClientToDelete(null)
      setShowDeleteConfirmation(false)
    } catch (error) {
      console.error('Error deleting client:', error)
    }
  }

  const filteredClients = clients.filter((client) =>
    client.nom.toLowerCase().includes(searchQuery.toLowerCase())
  )
  console.log(groups)
  return (
    <div
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <Header />
        <div className="p-4">
          <SearchBar onSearch={handleSearch} />
          <ClientTable
            clients={filteredClients}
            getGroupNameById={(groupId) => {
              const group = groups.find((group) => group._id === groupId)
              return group ? group.name : 'بدون مجموعة'
            }}
            onEditClient={(client) => {
              setSelectedClient(client)
              setModalMode('edit')
              setIsModalVisible(true)
            }}
            onShowDetails={(client) => {
              setSelectedClient(client)
              setModalMode('details')
              setIsModalVisible(true)
            }}
            onDeleteClient={(client) => {
              setClientToDelete(client)
              setShowDeleteConfirmation(true)
            }}
          />
        </div>
      </div>
      {isModalVisible && selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setIsModalVisible(false)}
          onSave={handleUpdateClient}
          mode={modalMode}
        />
      )}
      {showDeleteConfirmation && clientToDelete && (
        <ConfirmationPopup
          message={`هل أنت متأكد من حذف العميل ${clientToDelete.nom} ${clientToDelete.prenom_fr}؟`}
          onConfirm={handleDeleteClient}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  )
}

export default ClientsList
