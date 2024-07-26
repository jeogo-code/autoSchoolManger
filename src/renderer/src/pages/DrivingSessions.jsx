import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons'
import DrivingSessionsFilters from '../components/DrivingSessionsComponents/DrivingSessionsFilters'
import DrivingSessionsTable from '../components/DrivingSessionsComponents/DrivingSessionsTable'
import DrivingSessionModal from '../modals/DrivingSessionModal'
import DrivingSessionViewModal from '../modals/DrivingSessionViewModal'
import NavBar from '../components/NavBar'

const DrivingSessions = () => {
  const [sessions, setSessions] = useState([])
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
    // Fetch driving sessions data from API or state management
    const fetchSessions = async () => {
      // Simulating API call
      const data = [
        {
          id: 1,
          group: 'المجموعة 1',
          date: '2024-08-01',
          clients: [
            { id: 1, name: 'العميل 1', time: '10:00', status: 'ناجح' },
            { id: 2, name: 'العميل 2', time: '10:15', status: 'يعيد' },
            { id: 3, name: 'العميل 3', time: '10:30', status: 'غير محدد' }
          ]
        },
        {
          id: 2,
          group: 'المجموعة 2',
          date: '2024-08-15',
          clients: [
            { id: 4, name: 'العميل 4', time: '14:00', status: 'ناجح' },
            { id: 5, name: 'العميل 5', time: '14:15', status: 'ناجح' }
          ]
        }
      ]
      setSessions(data)
      setFilteredSessions(data)
    }
    fetchSessions()
  }, [])

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
    (sessionData) => {
      setSessions((prevSessions) => {
        if (sessionData.id) {
          return prevSessions.map((session) =>
            session.id === sessionData.id ? { ...session, ...sessionData } : session
          )
        } else {
          return [...prevSessions, { ...sessionData, id: prevSessions.length + 1 }]
        }
      })
      setIsModalOpen(false)
      handleFilterChange(filters) // Re-apply filters after saving
    },
    [filters]
  )

  const handleRemoveSession = useCallback(
    (id) => {
      setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id))
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

      const filtered = sessions.filter((session) => {
        const sessionDate = new Date(session.date)
        const matchMonth = month ? sessionDate.getMonth() + 1 === parseInt(month) : true
        const matchYear = year ? sessionDate.getFullYear() === parseInt(year) : true
        const matchSearch = searchTerm
          ? session.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.clients.some((client) =>
              client.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : true

        return matchMonth && matchYear && matchSearch
      })

      setFilteredSessions(filtered)
    },
    [sessions]
  )

  return (
    <div dir="rtl" className="w-full bg-gradient-to-b from-blue-50 to-blue-100">
      <NavBar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faCar} className="ml-2" />
              حصص السياقة
            </h1>
            <button
              onClick={handleAddSession}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
              إضافة حصة جديدة
            </button>
          </div>
          <div className="p-8">
            <DrivingSessionsFilters onFilterChange={handleFilterChange} initialFilters={filters} />
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
        />
      )}
      {isShowModalOpen && (
        <DrivingSessionViewModal session={selectedSession} onClose={handleCloseShowModal} />
      )}
    </div>
  )
}

export default DrivingSessions
