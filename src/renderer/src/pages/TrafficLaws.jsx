import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrafficLight } from '@fortawesome/free-solid-svg-icons'
import TrafficLawsTable from '../components/TrafficLaws/TrafficLawsTable'
import TrafficLawsPagination from '../components/TrafficLaws/TrafficLawsPagination'
import NavBar from '../components/NavBar'
import TrafficLawsModal from '../Modals/TrafficLawsModal'
import TrafficLawsFilters from '../components/TrafficLaws/TrafficLawsFilters'

const TrafficLaws = () => {
  const [lessons, setLessons] = useState([])
  const [groups, setGroups] = useState([])
  const [clients, setClients] = useState([])
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [filteredLessons, setFilteredLessons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lessonsPerPage] = useState(10)

  useEffect(() => {
    fetchGroupsAndClients()
  }, [])

  const fetchGroupsAndClients = async () => {
    const fetchedGroups = [
      {
        id: 1,
        name: 'مجموعة 01',
        clients: [1, 2]
      },
      {
        id: 2,
        name: 'مجموعة 02',
        clients: [3, 4]
      }
    ]

    const fetchedClients = [
      {
        id: 1,
        name: 'Client 1',
        groupId: 1
      },
      {
        id: 2,
        name: 'Client 2',
        groupId: 1
      },
      {
        id: 3,
        name: 'Client 3',
        groupId: 2
      },
      {
        id: 4,
        name: 'Client 4',
        groupId: 2
      }
    ]

    setGroups(fetchedGroups)
    setClients(fetchedClients)

    const fetchedLessons = [
      {
        id: 1,
        date: '2024-08-01',
        groupId: 1,
        clientId: 1,
        time: '10:00'
      },
      {
        id: 2,
        date: '2024-08-15',
        groupId: 2,
        clientId: 3,
        time: '14:00'
      }
    ]

    const formattedLessons = fetchedLessons.map((lesson) => {
      const client = fetchedClients.find((client) => client.id === lesson.clientId)
      const group = fetchedGroups.find((group) => group.id === lesson.groupId)
      return {
        lessonID: lesson.id,
        clientID: client.id,
        clientName: client.name,
        groupID: group.id,
        groupName: group.name,
        date: lesson.date,
        time: lesson.time
      }
    })

    setLessons(formattedLessons)
    setFilteredLessons(formattedLessons)
  }

  const handleAddLesson = () => {
    setCurrentLesson(null)
    setShowLessonModal(true)
  }

  const handleEditLesson = (lesson) => {
    setCurrentLesson(lesson)
    setShowLessonModal(true)
  }

  const handleDeleteLesson = (lessonId) => {
    const updatedLessons = lessons.filter((lesson) => lesson.lessonID !== lessonId)
    setLessons(updatedLessons)
    setFilteredLessons(updatedLessons)
  }

  const handleSaveLesson = (lessonData) => {
    const newLessons = lessonData.clients.map((client, index) => ({
      lessonID: lessons.length + index + 1,
      clientID: client.id,
      clientName: client.name,
      groupID: client.groupId,
      groupName: groups.find((group) => group.id === client.groupId)?.name || 'غير معروف',
      date: lessonData.date,
      time: client.checkIn,
      lessons: lessonData.lessons
    }))

    const updatedLessons = [...lessons, ...newLessons]
    setLessons(updatedLessons)
    setFilteredLessons(updatedLessons)
    setShowLessonModal(false)
  }

  const handleFilter = (groupId, date, searchTerm) => {
    let filtered = lessons
    if (groupId && groupId !== 'all') {
      filtered = filtered.filter((lesson) => lesson.groupID === parseInt(groupId))
    }
    if (date) {
      filtered = filtered.filter((lesson) => lesson.date === date)
    }
    if (searchTerm) {
      filtered = filtered.filter((lesson) =>
        lesson.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredLessons(filtered)
    setCurrentPage(1)
  }

  const indexOfLastLesson = currentPage * lessonsPerPage
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage
  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <div className="bg-green-600 py-6 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faTrafficLight} className="mr-3 text-3xl" />
              حصص قانون المرور
            </h1>
          </div>
        </div>
        <div className="p-8">
          <TrafficLawsFilters
            onFilter={handleFilter}
            groups={groups}
            onAddLesson={handleAddLesson}
          />
          <TrafficLawsTable
            lessons={currentLessons}
            onEdit={handleEditLesson}
            onDelete={handleDeleteLesson}
          />
          <TrafficLawsPagination
            lessonsPerPage={lessonsPerPage}
            totalLessons={filteredLessons.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      {showLessonModal && (
        <TrafficLawsModal
          session={currentLesson}
          onClose={() => setShowLessonModal(false)}
          onSave={handleSaveLesson}
          groups={groups}
          clients={clients}
        />
      )}
    </div>
  )
}

export default TrafficLaws
