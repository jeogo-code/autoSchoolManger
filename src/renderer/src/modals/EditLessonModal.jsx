import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'

const lessonsList = [
  'الإشارات الطرقية',
  'لوحات الخطر',
  'اللوحات ذات الإشارات البسيطة',
  'اشارات اثبات الطريق',
  'مراجعة عامة وتمارين',
  'الاشارات المتعلقة بملتقيات الطرق ونظم الاولوية',
  'اللويحات',
  'الاشارات الضوئية واشارات اعوان والنظام العام',
  'الاشارات الافقية',
  'ملتقيات الطرق',
  'المعالم',
  'حالات سحب رخص السياقة',
  'الطريق السيار',
  'وقاية وامن الطرقات',
  'السياقة الوقائية اثناء الشتاء',
  'إشكال التعارض',
  'المركبة',
  'البيئة الطرقية',
  'علم الحوادث',
  'الإسعافية'
]

const EditLessonModal = ({ session, clients, groups, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: session?.date || '',
    time: session?.time || '',
    lessons: session?.lessons || []
  })

  useEffect(() => {
    if (session) {
      setFormData({
        date: session.date || '',
        time: session.time || '',
        lessons: session.lessons || []
      })
    }
  }, [session])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLessonChange = (lesson) => {
    setFormData((prev) => ({
      ...prev,
      lessons: prev.lessons.includes(lesson)
        ? prev.lessons.filter((item) => item !== lesson)
        : [...prev.lessons, lesson]
    }))
  }

  const handleSelectAllLessons = () => {
    setFormData((prev) => ({
      ...prev,
      lessons: formData.lessons.length === lessonsList.length ? [] : lessonsList
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const updatedSession = {
        _id: session?._id || uuidv4(),
        type: 'lesson',
        clientID: session?.clientID || '',
        date: formData.date,
        time: formData.time,
        lessons: formData.lessons
      }
      onSave(updatedSession)
      onClose()
    } catch (error) {
      alert('Error saving lesson:', error.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl overflow-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {session ? 'تعديل الحصة' : 'إضافة حصة'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <div>
            <div className="flex flex-col mb-4">
              <label className="block text-sm font-medium text-gray-600">الاسم</label>
              <div className="p-3 border border-gray-300 rounded bg-gray-100">
                {clients.find((client) => client._id === session?.clientID)?.name || 'غير معروف'}
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="block text-sm font-medium text-gray-600">الاسم بالعربية</label>
              <div className="p-3 border border-gray-300 rounded bg-gray-100">
                {clients.find((client) => client._id === session?.clientID)?.nom || 'غير معروف'}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-600">التاريخ</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-600">الوقت</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">الدروس</label>
            <button
              type="button"
              onClick={handleSelectAllLessons}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition w-full mb-3 mt-2 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faCheckSquare} className="mr-2" />
              <span>تحديد الكل</span>
            </button>
            <div className="grid grid-cols-2 gap-4">
              {lessonsList.map((lesson, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.lessons.includes(lesson)}
                    onChange={() => handleLessonChange(lesson)}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{lesson}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditLessonModal
