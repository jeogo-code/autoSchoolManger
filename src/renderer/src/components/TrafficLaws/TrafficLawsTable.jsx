import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TrafficLawsTable = ({ lessons, onEdit, onDelete }) => {
  const handleDeleteClick = (lesson) => {
    if (window.confirm(`Are you sure you want to delete the lesson with ID ${lesson._id}?`)) {
      onDelete(lesson._id)
    }
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-green-600 text-white">
          <tr>
            <TableCell>ID الدرس</TableCell>
            <TableCell>التاريخ</TableCell>
            <TableCell>اسم المتدرب</TableCell>
            <TableCell>اسم المجموعة</TableCell>
            <TableCell>وقت الحضور</TableCell>
            <TableCell>إجراءات</TableCell>
          </tr>
        </thead>
        <tbody className="bg-white">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonRow
                key={lesson._id}
                lesson={lesson}
                onEdit={onEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                <div role="alert" className="alert alert-secondary">
                  <h2 className="text-center">لا توجد حصص قانون المرور</h2>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const TableCell = ({ children }) => (
  <th className="px-6 py-3 text-right border-b-2 border-gray-200">{children}</th>
)

const LessonRow = ({ lesson, onEdit, onDelete }) => (
  <tr className="hover:bg-teal-50 transition duration-150 ease-in-out">
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson._id}</td>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.date}</td>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.clientName}</td>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.groupName}</td>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.time}</td>
    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
      <div className="flex justify-center items-center gap-5">
        <ActionButton onClick={() => onEdit(lesson)} icon={faEdit} color="blue" tooltip="تعديل" />
        <DeleteButton onClick={() => onDelete(lesson)} />
      </div>
    </td>
  </tr>
)

const ActionButton = ({ onClick, icon, color, tooltip }) => (
  <button
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 shadow-md`}
    title={tooltip}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
  </button>
)

const DeleteButton = ({ onClick }) => (
  <button
    type="button"
    className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-red-100 hover:bg-red-200 shadow-md"
    title="حذف"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
  </button>
)

export default TrafficLawsTable
