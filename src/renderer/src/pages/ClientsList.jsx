import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/ClientsComponents/Header'
import SearchBar from '../components/ClientsComponents/SearchBar'
import ClientTable from '../components/ClientsComponents/ClientTable'
import Pagination from '../components/ClientsComponents/Pagination'
import ClientModel from '../Modals/ClientModel'

const ClientsList = () => {
  const [clients, setClients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('0')
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    // Sample client data
    setClients([
      {
        id: 1,
        photo: '/path/to/photo1.jpg', // URL to the client's photo; if empty, display a placeholder
        lastname: 'قنفود',
        firstname: 'أسامة',
        registrationDate: '2024-07-24',
        phone: '0644394032',
        group: 'بدون مجموعة',
        identifier: '12345',
        gender: '1', // '1' for 'السيد', '2' for 'السيدة', '3' for 'الأنسة'
        prenom_fr: 'Oussama',
        nom_fr: 'Kenfoud',
        date_naissance: '1990-05-14',
        unknown_birth_date: false,
        place_naissance: 'الجزائر',
        blood_type: 'O+',
        id_card_number: '123456789',
        adresse: 'حي بئر مراد رايس، الجزائر',
        date_insert: '2024-07-20', // Date of file submission
        date_inscription: '2024-07-22', // Registration date
        amount_paid: 1000 // Amount paid
      }

      // Additional sample clients
    ])
  }, [])

  const handleSearch = (query, group) => {
    setSearchQuery(query)
    setSelectedGroup(group)
  }

  const handleUpdateClient = (updatedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
    )
    setSelectedClient(null)
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearchQuery =
      client.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGroup = selectedGroup === '0' || client.group === selectedGroup
    return matchesSearchQuery && matchesGroup
  })

  return (
    <div
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <Header />
        <div className="p-4">
          <SearchBar clients={clients} onSearch={handleSearch} onFilter={handleSearch} />
          <ClientTable clients={filteredClients} onEditClient={setSelectedClient} />
          <Pagination />
        </div>
      </div>
      {selectedClient && (
        <ClientModel
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onSave={handleUpdateClient}
        />
      )}
    </div>
  )
}

export default ClientsList
