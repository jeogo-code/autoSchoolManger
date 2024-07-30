import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import ExamsTable from '../components/ExamsComponents/ExamsTable'
import ExamsPagination from '../components/ExamsComponents/ExamsPagination'
import NavBar from '../components/NavBar'
import ExamModal from '../Modals/ExamModal'
import ExamsFilters from '../components/ExamsComponents/ExamsFilters'

const Exams = () => {
  const [exams, setExams] = useState([])
  const [groups, setGroups] = useState([])
  const [clients, setClients] = useState([])
  const [showExamModal, setShowExamModal] = useState(false)
  const [currentExam, setCurrentExam] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGroup, setFilterGroup] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const examsPerPage = 10

  useEffect(() => {
    // Fetch data for exams, groups, and clients from an API or state management
    setGroups([
      { id: 1, name: 'مجموعة 1' },
      { id: 2, name: 'مجموعة 2' }
    ])
    setClients([
      { id: 1, firstName: 'أحمد', lastName: 'محمد', groupId: 1 },
      { id: 2, firstName: 'فاطمة', lastName: 'علي', groupId: 1 },
      { id: 3, firstName: 'محمود', lastName: 'عبد الله', groupId: 2 },
      { id: 4, firstName: 'زينب', lastName: 'أحمد', groupId: 2 },
      { id: 5, firstName: 'محمد', lastName: 'علي', groupId: null } // Client without a group
    ])
    setExams([
      {
        id: 1,
        date: '2024-08-01',
        type: 'قانون المرور',
        clientId: 1,
        groupId: 1,
        status: 'ناجح',
        time: '10:00'
      },
      {
        id: 2,
        date: '2024-08-01',
        type: 'قانون المرور',
        clientId: 2,
        groupId: 1,
        status: 'يعيد',
        time: '10:30'
      },
      {
        id: 3,
        date: '2024-08-15',
        type: 'مناورات',
        clientId: 3,
        groupId: 2,
        status: 'ناجح',
        time: '14:00'
      },
      {
        id: 4,
        date: '2024-08-15',
        type: 'مناورات',
        clientId: 4,
        groupId: 2,
        status: 'يعيد',
        time: '14:30'
      },
      {
        id: 5,
        date: '2024-09-01',
        type: 'سياقة',
        clientId: 5,
        groupId: null,
        status: 'ناجح',
        time: '08:00'
      }
    ])
  }, [])

  const handleAddExam = () => {
    setCurrentExam(null)
    setShowExamModal(true)
  }

  const handleEditExam = (exam) => {
    setCurrentExam(exam)
    setShowExamModal(true)
  }

  const handleDeleteExam = (examId) => {
    setExams(exams.filter((exam) => exam.id !== examId))
  }

  const handleSaveExam = (examData) => {
    if (currentExam) {
      setExams(exams.map((exam) => (exam.id === currentExam.id ? { ...exam, ...examData } : exam)))
    } else {
      setExams([...exams, { id: exams.length + 1, ...examData }])
    }
    setShowExamModal(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleFilterGroup = (group) => {
    setFilterGroup(group)
  }

  const handleSelectedType = (type) => {
    setSelectedType(type)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const filteredExams = exams.filter((exam) => {
    const client = clients.find((c) => c.id === exam.clientId)
    if (!client) return false
    return (
      (client.firstName.includes(searchQuery) || client.lastName.includes(searchQuery)) &&
      (filterGroup === '' || (exam.groupId && exam.groupId === parseInt(filterGroup))) &&
      (selectedType === '' || exam.type === selectedType)
    )
  })

  const paginatedExams = filteredExams.slice(
    (currentPage - 1) * examsPerPage,
    currentPage * examsPerPage
  )

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-yellow-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <NavBar />
        <div className="bg-yellow-600 py-6 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faClipboardList} className="mr-3 text-3xl" />
              إدارة الامتحانات
            </h1>
          </div>
        </div>
        <div className="p-8">
          <ExamsFilters
            searchQuery={searchQuery}
            setSearchQuery={handleSearch}
            selectedType={selectedType}
            setSelectedType={handleSelectedType}
            filterGroup={filterGroup}
            setFilterGroup={handleFilterGroup}
            groups={groups}
            onAddExam={handleAddExam}
          />
          <ExamsTable
            exams={paginatedExams}
            clients={clients}
            groups={groups}
            onEdit={handleEditExam}
            onDelete={handleDeleteExam}
          />
          <ExamsPagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredExams.length / examsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {showExamModal && (
        <ExamModal
          exam={currentExam}
          onClose={() => setShowExamModal(false)}
          onSave={handleSaveExam}
          groups={groups}
          clients={clients}
          exams={exams} // Pass the exams list for validation
        />
      )}
    </div>
  )
}

export default Exams
