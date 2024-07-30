import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import DrivingSessionsFilters from '../components/DrivingSessionsComponents/DrivingSessionsFilters'
import DrivingSessionsTable from '../components/DrivingSessionsComponents/DrivingSessionsTable'
import DrivingSessionModal from '../Modals/DrivingSessionModal'
import DrivingSessionViewModal from '../Modals/DrivingSessionViewModal'
import NavBar from '../components/NavBar'

const DrivingSessions = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Client 1', groupId: 1 },
    { id: 2, name: 'Client 2', groupId: 1 },
    { id: 3, name: 'Client 3', groupId: 2 },
    { id: 4, name: 'Client 4', groupId: 2 },
    { id: 5, name: 'Client 5', groupId: null } // Client without group
  ])

  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1', clientIds: [1, 2] },
    { id: 2, name: 'Group 2', clientIds: [3, 4] }
    // No group for client 5
  ])

  const [drivingSessions, setDrivingSessions] = useState([])
  const [filteredSessions, setFilteredSessions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [isShowModalOpen, setIsShowModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    month: '',
    year: new Date().getFullYear().toString(),
    searchTerm: ''
  })

  useEffect(() => {
    // Generate driving sessions data from clients and groups
    const sessionsData = clients.map((client) => {
      const group = groups.find((group) => group.id === client.groupId)
      return {
        id: `${client.id}`, // Unique driving lesson ID based on client ID
        group: group ? group.name : 'No Group',
        client: client.name,
        date: '', // Placeholder for date
        time: '', // Placeholder for time
        clientId: client.id
      }
    })

    setDrivingSessions(sessionsData)
    setFilteredSessions(sessionsData)
  }, [clients, groups])

  const handleAddSession = useCallback(() => {
    setSelectedSession(null)
    setIsModalOpen(true)
  }, [])

  const handleEditSession = useCallback((session) => {
    setSelectedSession(session)
    setIsModalOpen(true)
  }, [])

  const handleShowSession = useCallback((session) => {
    setSelectedSession(session)
    setIsShowModalOpen(true)
  }, [])

  const handleSaveSession = useCallback(
    (newSessions) => {
      setDrivingSessions((prevSessions) => {
        // Replace or add new sessions
        return prevSessions
          .filter((s) => !newSessions.some((ns) => ns.id === s.id))
          .concat(newSessions)
      })
      setIsModalOpen(false)
      handleFilterChange(filters) // Re-apply filters after saving
    },
    [filters]
  )

  const handleRemoveSession = useCallback(
    (id) => {
      setDrivingSessions((prevSessions) => prevSessions.filter((session) => session.id !== id))
      handleFilterChange(filters) // Re-apply filters after removing
    },
    [filters]
  )

  const handleCloseModal = useCallback(() => setIsModalOpen(false), [])
  const handleCloseShowModal = useCallback(() => setIsShowModalOpen(false), [])

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters)
      const { month, year, searchTerm } = newFilters

      const filtered = drivingSessions.filter((session) => {
        const sessionDate = new Date(session.date)
        const matchMonth = month ? sessionDate.getMonth() + 1 === parseInt(month) : true
        const matchYear = year ? sessionDate.getFullYear() === parseInt(year) : true
        const matchSearch = searchTerm
          ? session.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.client.toLowerCase().includes(searchTerm.toLowerCase())
          : true

        return matchMonth && matchYear && matchSearch
      })

      setFilteredSessions(filtered)
    },
    [drivingSessions]
  )

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <NavBar />
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faCar} className="ml-2" />
              حصص السياقة
            </h1>
          </div>
          <div className="p-8">
            <DrivingSessionsFilters
              onFilterChange={handleFilterChange}
              initialFilters={filters}
              onAddSession={handleAddSession}
            />
            <DrivingSessionsTable
              sessions={filteredSessions}
              onEdit={handleEditSession}
              onRemove={handleRemoveSession}
              onShow={handleShowSession}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DrivingSessionModal
          session={selectedSession}
          onClose={handleCloseModal}
          onSave={handleSaveSession}
          clients={clients}
          groups={groups}
        />
      )}
      {isShowModalOpen && (
        <DrivingSessionViewModal session={selectedSession} onClose={handleCloseShowModal} />
      )}
    </div>
  )
}

export default DrivingSessions
