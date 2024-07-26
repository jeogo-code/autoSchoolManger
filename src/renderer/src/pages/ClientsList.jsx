import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/ClientsComponents/Header'
import SearchBarContainer from '../components/ClientsComponents/SearchBarContainer'
import ClientTable from '../components/ClientsComponents/ClientTable'
import Pagination from '../components/ClientsComponents/Pagination'

const ClientsList = () => {
  const [clients, setClients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch clients from API or state management
    setClients([
      {
        id: 1,
        photo: '/path/to/photo1.jpg',
        lastname: 'قنفود',
        firstname: 'اسامة',
        registrationDate: '2024-07-24',
        phone: '0644394032',
        group: 'بدون مجموعة',
        identifier: '12345'
      }
      // Add more sample clients here
    ])
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const filteredClients = clients.filter(
    (client) =>
      client.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <Header />
        <SearchBarContainer onSearch={handleSearch} />
        <ClientTable clients={filteredClients} />
        <Pagination />
      </div>
    </div>
  )
}

export default ClientsList
