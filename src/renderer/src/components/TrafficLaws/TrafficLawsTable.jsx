import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TrafficLawsTable = ({ lessons, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-green-600 text-white">
          <tr>
            <TableCell>ID الدرس</TableCell>
            <TableCell>التاريخ</TableCell>
            <TableCell>اسم المجموعة</TableCell>
            <TableCell>ID المتدرب</TableCell>
            <TableCell>اسم المتدرب</TableCell>
            <TableCell>وقت الحضور</TableCell>
            <TableCell>إجراءات</TableCell>
          </tr>
        </thead>
        <tbody className="bg-white">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonRow
                key={lesson.lessonID}
                lesson={lesson}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
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

const LessonRow = ({ lesson, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-teal-50 transition duration-150 ease-in-out">
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.lessonID}</td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.date}</td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.groupName}</td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.clientID}</td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.clientName}</td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lesson.time}</td>
      {/* <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
        {lesson.lessons ? lesson.lessons.join(', ') : ''}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
        <div className="flex justify-center items-center gap-5">
          <ActionButton onClick={() => onEdit(lesson)} icon={faEdit} color="blue" tooltip="تعديل" />
          <DeleteButton lessonId={lesson.lessonID} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  )
}

const ActionButton = ({ onClick, icon, color, tooltip }) => (
  <button
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 shadow-md`}
    title={tooltip}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
  </button>
)

const DeleteButton = ({ lessonId, onDelete }) => (
  <button
    type="button"
    className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-red-100 hover:bg-red-200 shadow-md"
    title="حذف"
    onClick={() => onDelete(lessonId)}
  >
    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
  </button>
)

export default TrafficLawsTable
