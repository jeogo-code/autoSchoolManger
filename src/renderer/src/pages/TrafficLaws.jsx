import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrafficLight } from '@fortawesome/free-solid-svg-icons'
import TrafficLawsTable from '../components/TrafficLaws/TrafficLawsTable'
import TrafficLawsPagination from '../components/TrafficLaws/TrafficLawsPagination'
import NavBar from '../components/NavBar'
import TrafficLawsModal from '../modals/TrafficLawsModal'
import TrafficLawsFilters from '../components/TrafficLaws/TrafficLawsFilters'

const TrafficLaws = () => {
  const [sessions, setSessions] = useState([])
  const [groups, setGroups] = useState([])
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [currentSession, setCurrentSession] = useState(null)

  useEffect(() => {
    // Fetch sessions and groups from API or state management
    setSessions([
      {
        id: 1,
        date: '2024-08-01',
        time: '10:00 AM',
        groupId: 1,
        lessons: [4155, 4156],
        attendance: { present: [1], absent: [2] }
      },
      {
        id: 2,
        date: '2024-08-15',
        time: '02:00 PM',
        groupId: 2,
        lessons: [4157, 4158],
        attendance: { present: [3], absent: [4] }
      }
    ])

    setGroups([
      {
        id: 1,
        name: 'مجموعة 01',
        clients: [
          { id: 1, name: 'Client 1' },
          { id: 2, name: 'Client 2' }
        ]
      },
      {
        id: 2,
        name: 'مجموعة 02',
        clients: [
          { id: 3, name: 'Client 3' },
          { id: 4, name: 'Client 4' }
        ]
      }
    ])
  }, [])

  const handleAddSession = () => {
    setCurrentSession(null)
    setShowSessionModal(true)
  }

  const handleEditSession = (session) => {
    setCurrentSession(session)
    setShowSessionModal(true)
  }

  const handleDeleteSession = (sessionId) => {
    setSessions(sessions.filter((session) => session.id !== sessionId))
  }

  const handleSaveSession = (sessionData) => {
    if (currentSession) {
      setSessions(
        sessions.map((session) =>
          session.id === currentSession.id ? { ...session, ...sessionData } : session
        )
      )
    } else {
      setSessions([...sessions, { id: sessions.length + 1, ...sessionData }])
    }
  }

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <NavBar />
      <div className="container mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-green-600 py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">
            <FontAwesomeIcon icon={faTrafficLight} className="mr-2" /> حصص قانون المرور
          </h1>
        </div>

        <div className="p-8">
          <TrafficLawsFilters onAddSession={handleAddSession} groups={groups} />
          <TrafficLawsTable
            sessions={sessions}
            onEdit={handleEditSession}
            onDelete={handleDeleteSession}
          />
          <TrafficLawsPagination />
        </div>
      </div>

      {showSessionModal && (
        <TrafficLawsModal
          session={currentSession}
          onClose={() => setShowSessionModal(false)}
          onSave={handleSaveSession}
          groups={groups}
        />
      )}
    </div>
  )
}

export default TrafficLaws
