import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faPlus,
  faTrashAlt,
  faCheckSquare,
  faSearch,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'

const lessonsList = [
  'الإشارات الطرقية', 'لوحات الخطر', 'اللوحات ذات الإشارات البسيطة',
  'اشارات اثبات الطريق', 'مراجعة عامة وتمارين', 'الاشارات المتعلقة بملتقيات الطرق ونظم الاولوية',
  'اللويحات', 'الاشارات الضوئية واشارات اعوان والنظام العام', 'الاشارات الافقية',
  'ملتقيات الطرق', 'المعالم', 'حالات سحب رخص السياقة', 'الطريق السيار',
  'وقاية وامن الطرقات', 'السياقة الوقائية اثناء الشتاء', 'إشكال التعارض',
  'المركبة', 'البيئة الطرقية', 'علم الحوادث', 'الإسعافية'
]

const TrafficLawsModal = ({
  session,
  onClose,
  onSave,
  groups = [],
  clients = [],
  existingLessons = []
}) => {
  const [formData, setFormData] = useState({
    date: session?.date || '',
    selectedGroup: '',
    clients: session?.clients || [],
    lessons: session?.lessons || [],
    time: ''
  })
  const [availableClients, setAvailableClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredClients, setFilteredClients] = useState([])

  useEffect(() => {
    const selectedGroup = groups.find(g => g._id === formData.selectedGroup)
    setAvailableClients(
      selectedGroup ? selectedGroup.clientIds.map(id => clients.find(c => c._id === id)) : clients
    )
  }, [formData.selectedGroup, groups, clients])

  useEffect(() => {
    const clientsWithLessons = new Set(existingLessons.map(lesson => lesson.clientID))
    setFilteredClients(availableClients.filter(client => client && !clientsWithLessons.has(client._id)))
  }, [availableClients, existingLessons])

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleGroupChange = (e) => setFormData(prev => ({ ...prev, selectedGroup: e.target.value, clients: [] }))
  const handleClientAction = (action, clientId) => {
    const client = availableClients.find(c => c._id === clientId)
    if (action === 'add' && client && !formData.clients.some(c => c._id === client._id)) {
      setFormData(prev => ({ ...prev, clients: [...prev.clients, { ...client, checkIn: formData.time }] }))
    } else if (action === 'remove') {
      setFormData(prev => ({ ...prev, clients: prev.clients.filter(c => c._id !== clientId) }))
    }
  }
  const handleClientTimeChange = (clientId, value) => {
    setFormData(prev => ({
      ...prev,
      clients: prev.clients.map(client => client._id === clientId ? { ...client, checkIn: value } : client)
    }))
  }
  const handleLessonChange = (lesson) => {
    setFormData(prev => ({
      ...prev,
      lessons: prev.lessons.includes(lesson) ? prev.lessons.filter(item => item !== lesson) : [...prev.lessons, lesson]
    }))
  }
  const handleSelectAllLessons = () => {
    setFormData(prev => ({ ...prev, lessons: formData.lessons.length === lessonsList.length ? [] : lessonsList }))
  }

  const formatTime = (time) => {
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const lessonData = formData.clients.map(client => ({
        _id: session?._id || uuidv4(),
        clientID: client._id,
        date: formData.date,
        time: formatTime(client.checkIn),
        lessons: formData.lessons,
        type: 'lesson'
      }))
      if (!lessonData.length) throw new Error('No clients selected for the lesson.')
      onSave(lessonData)
      onClose()
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSetAllTimes = () => {
    if (formData.time) {
      setFormData(prev => ({
        ...prev,
        clients: prev.clients.map(client => ({ ...client, checkIn: formData.time }))
      }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            {session ? 'تعديل الحصة' : 'إضافة حصة'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-8">
          {/* Session Details */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">تفاصيل الحصة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <select
                name="selectedGroup"
                value={formData.selectedGroup}
                onChange={handleGroupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">كل المجموعات</option>
                {groups.map(group => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleSetAllTimes}
                  className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FontAwesomeIcon icon={faClock} />
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">الحضور والغياب</h3>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث عن العملاء"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Present Clients */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">الحاضرون</h4>
                <ul className="bg-gray-50 rounded-lg shadow-inner overflow-y-auto max-h-80 divide-y divide-gray-200">
                  {formData.clients.map((client) => (
                    <li
                      key={client._id}
                      className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <span className="font-medium text-gray-800">{client.nom}</span>
                        <span className="text-sm text-gray-500 block">
                          {groups.find((g) => g._id === client.groupId)?.name || 'غير معروف'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={client.checkIn}
                          onChange={(e) =>
                            handleClientTimeChange(client._id, e.target.value)
                          }
                          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => handleClientAction('remove', client._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Absent Clients */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">الغائبون</h4>
                <ul className="bg-gray-50 rounded-lg shadow-inner overflow-y-auto max-h-80 divide-y divide-gray-200">
                  {filteredClients
                    .filter(
                      (client) =>
                        !formData.clients.some(
                          (selectedClient) => selectedClient._id === client._id
                        )
                    )
                    .map((client) => (
                      <li
                        key={client._id}
                        className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <span className="font-medium text-gray-800">{client.nom}</span>
                          <span className="text-sm text-gray-500 block">
                            {groups.find((g) => g._id === client.groupId)?.name || 'غير معروف'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleClientAction('add', client._id)}
                          className="text-green-500 hover:text-green-700 transition-colors"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Lessons Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">الدروس</h3>
            <button
              type="button"
              onClick={handleSelectAllLessons}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center mb-4"
            >
              <FontAwesomeIcon icon={faCheckSquare} className="mr-2" />
              <span>تحديد الكل</span>
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lessonsList.map((lesson, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`lesson-${index}`}
                    checked={formData.lessons.includes(lesson)}
                    onChange={() => handleLessonChange(lesson)}
                    className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`lesson-${index}`}
                    className="text-sm font-semibold text-gray-700"
                  >
                    {lesson}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="border-t p-6 bg-gray-50">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrafficLawsModal
