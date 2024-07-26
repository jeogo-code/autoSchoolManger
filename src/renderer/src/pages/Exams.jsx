import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import ExamsFilters from '../components/ExamsComponents/ExamsFilters'
import ExamsTable from '../components/ExamsComponents/ExamsTable'
import ExamsPagination from '../components/ExamsComponents/ExamsPagination'
import NavBar from '../components/NavBar'
import ExamModal from '../modals/ExamModal'

const Exams = () => {
  const [exams, setExams] = useState([])
  const [groups, setGroups] = useState([])
  const [showExamModal, setShowExamModal] = useState(false)
  const [currentExam, setCurrentExam] = useState(null)

  useEffect(() => {
    // Fetch exams and groups from API or state management
    setExams([
      {
        id: 1,
        date: '2024-08-01',
        time: '10:00 AM',
        groupId: 1,
        clients: [
          { id: 1, name: 'Client 1', result: 'pass' },
          { id: 2, name: 'Client 2', result: 'fail' }
        ]
      },
      {
        id: 2,
        date: '2024-08-15',
        time: '02:00 PM',
        groupId: 2,
        clients: [
          { id: 3, name: 'Client 3', result: 'pass' },
          { id: 4, name: 'Client 4', result: 'fail' }
        ]
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
  }

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-teal-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <NavBar />
      <div className="container mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-yellow-600 py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> إدارة الامتحانات
          </h1>
        </div>

        <div className="p-8">
          <ExamsFilters onAddExam={handleAddExam} groups={groups} />
          <ExamsTable exams={exams} onEdit={handleEditExam} onDelete={handleDeleteExam} />
          <ExamsPagination />
        </div>
      </div>

      {showExamModal && (
        <ExamModal
          exam={currentExam}
          onClose={() => setShowExamModal(false)}
          onSave={handleSaveExam}
          groups={groups}
        />
      )}
    </div>
  )
}

export default Exams
