import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ExamsTable = ({ exams, clients, groups, onEdit, onDelete }) => {
  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.id === groupId)
    return group ? group.name : 'غير معروف'
  }

  const getClientName = (clientId) => {
    const client = clients.find((c) => c.id === clientId)
    return client ? `${client.firstName} ${client.lastName}` : 'غير معروف'
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-yellow-600 text-white">
          <tr>
            <TableCell>ID</TableCell>
            <TableCell>التاريخ</TableCell>
            <TableCell>المجموعة</TableCell>
            <TableCell>المترشح</TableCell>
            <TableCell>الوقت</TableCell>
            <TableCell>الحالة</TableCell>
            <TableCell>نوع الامتحان</TableCell>
            <TableCell>إجراءات</TableCell>
          </tr>
        </thead>
        <tbody className="bg-white">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <ExamRow
                key={exam.id}
                exam={exam}
                getGroupName={getGroupName}
                getClientName={getClientName}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                <div
                  role="alert"
                  className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-3 rounded"
                >
                  <p className="font-bold">لا توجد امتحانات</p>
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

const ExamRow = ({ exam, getGroupName, getClientName, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-yellow-50 transition duration-150 ease-in-out">
      <td className="px-6 py-3 text-right border-b border-gray-200">{exam.id}</td>
      <td className="px-6 py-3 text-right border-b border-gray-200">{exam.date}</td>
      <td className="px-6 py-3 text-right border-b border-gray-200">
        {getGroupName(exam.groupId)}
      </td>
      <td className="px-6 py-3 text-right border-b border-gray-200">
        {getClientName(exam.clientId)}
      </td>
      <td className="px-6 py-3 text-right border-b border-gray-200">{exam.time}</td>
      <td className="px-6 py-3 text-right border-b border-gray-200">{exam.status}</td>
      <td className="px-6 py-3 text-right border-b border-gray-200">{exam.type}</td>
      <td className="px-6 py-3 text-right border-b border-gray-200">
        <div className="flex justify-center items-center gap-5">
          <ActionButton
            onClick={() => onEdit(exam)}
            icon={faEdit}
            color="blue"
            tooltip="تعديل"
            ariaLabel="تعديل الامتحان"
          />
          <DeleteButton onDelete={() => onDelete(exam.id)} ariaLabel="حذف الامتحان" />
        </div>
      </td>
    </tr>
  )
}

const ActionButton = ({ onClick, icon, color, tooltip, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 shadow-md`}
    title={tooltip}
    aria-label={ariaLabel}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
  </button>
)

const DeleteButton = ({ onDelete, ariaLabel }) => (
  <button
    type="button"
    className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-red-100 hover:bg-red-200 shadow-md"
    title="حذف"
    onClick={onDelete}
    aria-label={ariaLabel}
  >
    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
  </button>
)

export default ExamsTable
