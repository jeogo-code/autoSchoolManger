import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ExamsTable = ({ exams, onEdit, onDelete }) => {
  return (
    <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-yellow-600 text-white">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200">ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-200">التاريخ</th>
            <th className="px-6 py-3 border-b-2 border-gray-200">التوقيت</th>
            <th className="px-6 py-3 border-b-2 border-gray-200">المجموعة</th>
            <th className="px-6 py-3 border-b-2 border-gray-200">عدد المترشحين</th>
            <th className="px-6 py-3 border-b-2 border-gray-200">إجراءات</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-teal-50">
                <td className="px-6 py-4 border-b border-gray-200">{exam.id}</td>
                <td className="px-6 py-4 border-b border-gray-200">{exam.date}</td>
                <td className="px-6 py-4 border-b border-gray-200">{exam.time}</td>
                <td className="px-6 py-4 border-b border-gray-200">{exam.group}</td>
                <td className="px-6 py-4 border-b border-gray-200">{exam.clients.length}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => onEdit(exam)}
                    className="bg-blue-600 text-white px-4 py-1 mr-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> تعديل
                  </button>
                  <button
                    onClick={() => onDelete(exam.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                <div role="alert" className="alert alert-secondary">
                  <h2 className="text-center">لا توجد امتحانات</h2>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ExamsTable
