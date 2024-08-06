import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import TrafficLawsTable from '../components/TrafficLaws/TrafficLawsTable'
import TrafficLawsPagination from '../components/TrafficLaws/TrafficLawsPagination'
import TrafficLawsFilters from '../components/TrafficLaws/TrafficLawsFilters'
import TrafficLawsModal from '../Modals/TrafficLawsModal'
import EditLessonModal from '../Modals/EditLessonModal'

const TrafficLaws = () => {
  const [lessons, setLessons] = useState([])
  const [clients, setClients] = useState([])
  const [groups, setGroups] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lessonsPerPage] = useState(10)
  const [showAddLessonModal, setShowAddLessonModal] = useState(false)
  const [showEditLessonModal, setShowEditLessonModal] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(null)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [fetchedLessons, fetchedClients, fetchedGroups] = await Promise.all([
        window.api.getAllLessons(),
        window.api.getAllClients(),
        window.api.getAllGroups()
      ])

      // Prepare lessons with necessary details
      const enrichedLessons = enrichLessons(fetchedLessons, fetchedClients, fetchedGroups)

      setLessons(enrichedLessons)
      setClients(fetchedClients)
      setGroups(fetchedGroups)
      setFilteredLessons(enrichedLessons)
    } catch (error) {
      console.error('Error fetching initial data:', error)
    }
  }

  const enrichLessons = (lessons, clients, groups) => {
    return lessons.map((lesson) => {
      const client = clients.find((c) => c._id === lesson.clientID)
      const group = client ? groups.find((g) => g._id === client.groupId) : null
      return {
        ...lesson,
        clientName: client ? `${client.nom} ${client.prenom_fr}` : 'غير معروف',
        groupName: group ? group.name : 'غير معروف',
        date: lesson.date || 'غير معروف',
        time: lesson.time || 'غير معروف'
      }
    })
  }

  const handleFilter = (groupId, date, searchTerm) => {
    let filtered = lessons
    if (groupId) {
      filtered = filtered.filter((lesson) => {
        const client = clients.find((c) => c._id === lesson.clientID)
        return client && client.groupId === groupId
      })
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

  const handleAddLesson = () => {
    setCurrentLesson(null)
    setShowAddLessonModal(true)
  }

  const handleEditLesson = (lesson) => {
    setCurrentLesson(lesson)
    setShowEditLessonModal(true)
  }

  const handleDeleteLesson = async (lessonId) => {
    try {
      await window.api.deleteLesson(lessonId)
      const updatedLessons = lessons.filter((lesson) => lesson._id !== lessonId)
      setLessons(updatedLessons)
      setFilteredLessons(updatedLessons)
    } catch (error) {
      console.error('Error deleting lesson:', error)
    }
  }

  const handleSaveLesson = async (lessonData) => {
    try {
      if (!lessonData.clientID) {
        throw new Error('Invalid lesson data: Missing clientID')
      }
      if (!lessonData.date) {
        throw new Error('Invalid lesson data: Missing date')
      }

      if (currentLesson) {
        // Update existing lesson
        await window.api.updateLesson(lessonData)
        const updatedLessons = lessons.map((lesson) =>
          lesson._id === lessonData._id ? lessonData : lesson
        )
        setLessons(enrichLessons(updatedLessons, clients, groups))
        setFilteredLessons(enrichLessons(updatedLessons, clients, groups))
        setShowEditLessonModal(false)
      } else {
        // Add new lesson
        const { _id } = await window.api.addLesson(lessonData)
        lessonData._id = _id
        const newLessons = [...lessons, lessonData]
        setLessons(enrichLessons(newLessons, clients, groups))
        setFilteredLessons(enrichLessons(newLessons, clients, groups))
        setShowAddLessonModal(false)
      }
    } catch (error) {
      console.error('Error saving lesson:', error)
      alert(`Error saving lesson: ${error.message}`)
    }
  }

  const indexOfLastLesson = currentPage * lessonsPerPage
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage
  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <div className="bg-green-600 py-6 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center">حصص قانون المرور</h1>
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
      {showAddLessonModal && (
        <TrafficLawsModal
          session={currentLesson}
          onClose={() => setShowAddLessonModal(false)}
          onSave={handleSaveLesson}
          clients={clients}
          groups={groups}
        />
      )}
      {showEditLessonModal && (
        <EditLessonModal
          session={currentLesson}
          clients={clients}
          onClose={() => setShowEditLessonModal(false)}
          onSave={handleSaveLesson}
        />
      )}
    </div>
  )
}

export default TrafficLaws
  