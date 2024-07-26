import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const lessonsList = [
  { id: 4155, name: 'الإشارات الطرقية' },
  { id: 4156, name: 'لوحات الخطر' },
  { id: 4157, name: 'اللوحات ذات الإشارات البسيطة' },
  { id: 4158, name: 'اشارات اثبات الطريق' },
  { id: 4159, name: 'مراجعة عامة وتمارين' },
  { id: 4160, name: 'الاشارات المتعلقة بملتقيات الطرق ونظم الاولوية' },
  { id: 4161, name: 'اللويحات' },
  { id: 4162, name: 'الاشارات الضوئية واشارات اعوان والنظام العام' },
  { id: 4163, name: 'الاشارات الافقية' },
  { id: 4164, name: 'الاشارات الافقية' },
  { id: 4165, name: 'ملتقيات الطرق' },
  { id: 4166, name: 'المعالم' },
  { id: 4167, name: 'مراجعة عامة وتمارين' },
  { id: 4168, name: 'التنظيم' },
  { id: 4169, name: 'التنظيم' },
  { id: 4170, name: 'حالات سحب رخص السياقة' },
  { id: 4171, name: 'الطريق السيار' },
  { id: 4172, name: 'وقاية وامن الطرقات' },
  { id: 4173, name: 'السياقة الوقائية اثناء الشتاء' },
  { id: 4174, name: 'إشكال التعارض' },
  { id: 4175, name: 'المركبة' },
  { id: 4176, name: 'البيئة الطرقية' },
  { id: 4177, name: 'علم الحوادث' },
  { id: 4178, name: 'الإسعافية' },
  { id: 4179, name: 'مراجعة عامة وتمارين' }
]

const TrafficLawsModal = ({ session, onClose, onSave, groups }) => {
  const [groupId, setGroupId] = useState(session ? session.groupId : '')
  const [date, setDate] = useState(session ? session.date : '')
  const [time, setTime] = useState(session ? session.time : '')
  const [lessons, setLessons] = useState(session ? session.lessons : [])
  const [presentClients, setPresentClients] = useState(session ? session.attendance.present : [])
  const [absentClients, setAbsentClients] = useState(session ? session.attendance.absent : [])
  const [availableClients, setAvailableClients] = useState([])

  useEffect(() => {
    if (groupId) {
      const group = groups.find((g) => g.id === parseInt(groupId))
      setAvailableClients(group ? group.clients : [])
    } else {
      setAvailableClients([])
    }
  }, [groupId, groups])

  const handleLessonChange = (lessonId) => {
    setLessons(
      lessons.includes(lessonId) ? lessons.filter((id) => id !== lessonId) : [...lessons, lessonId]
    )
  }

  const handleClientAttendance = (clientId, isPresent) => {
    if (isPresent) {
      setPresentClients([...presentClients, clientId])
      setAbsentClients(absentClients.filter((id) => id !== clientId))
    } else {
      setAbsentClients([...absentClients, clientId])
      setPresentClients(presentClients.filter((id) => id !== clientId))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const sessionData = {
      groupId,
      date,
      time,
      lessons,
      attendance: { present: presentClients, absent: absentClients }
    }
    onSave(sessionData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{session ? 'تعديل الحصة' : 'إضافة حصة'}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                المجموعة
              </label>
              <select
                id="group"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              >
                <option value="">اختر مجموعة</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                تاريخ
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                التوقيت
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">الدروس</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
              {lessonsList.map((lesson) => (
                <div key={lesson.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`lesson-${lesson.id}`}
                    checked={lessons.includes(lesson.id)}
                    onChange={() => handleLessonChange(lesson.id)}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor={`lesson-${lesson.id}`} className="ml-2 text-sm text-gray-700">
                    {lesson.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">الحضور</label>
            <div className="mt-1 overflow-y-auto max-h-40">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-200">ID</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">اسم المترشح</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">الحضور</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {availableClients.length > 0 ? (
                    availableClients.map((client) => (
                      <tr key={client.id} className="hover:bg-teal-50">
                        <td className="px-4 py-2 border-b border-gray-200">{client.id}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{client.name}</td>
                        <td className="px-4 py-2 border-b border-gray-200">
                          <select
                            value={presentClients.includes(client.id) ? 'present' : 'absent'}
                            onChange={(e) =>
                              handleClientAttendance(client.id, e.target.value === 'present')
                            }
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          >
                            <option value="present">حاضر</option>
                            <option value="absent">غائب</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-2">
                        <div role="alert" className="alert alert-secondary">
                          <h2 className="text-center">لا يوجد مترشحون</h2>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TrafficLawsModal
