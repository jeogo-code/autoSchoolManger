import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'

const DrivingSessionsTable = ({ sessions, onEdit, onRemove, onShow }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">المجموعة</th>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">المترشح</th>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">التاريخ</th>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">التوقيت</th>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">عملية</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <tr key={session.id} className="hover:bg-blue-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{session.group}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{session.client}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{session.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{session.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(session)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out ml-2"
                  >
                    <FontAwesomeIcon icon={faEdit} className="ml-1" />
                    <span className="hidden sm:inline">تعديل</span>
                  </button>
                  <button
                    onClick={() => onShow(session)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out ml-2"
                  >
                    <FontAwesomeIcon icon={faEye} className="ml-1" />
                    <span className="hidden sm:inline">عرض</span>
                  </button>
                  <button
                    onClick={() => onRemove(session.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="ml-1" />
                    <span className="hidden sm:inline">حذف</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
                  <p className="text-lg font-semibold">لا توجد أي حصة</p>
                  <p className="text-sm mt-1">قم بإضافة حصة جديدة للبدء</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DrivingSessionsTable
