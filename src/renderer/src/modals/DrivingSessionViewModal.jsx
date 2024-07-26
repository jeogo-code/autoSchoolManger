import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUser,
  faCalendarAlt,
  faClock,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

const DrivingSessionViewModal = ({ session, onClose }) => {
  if (!session) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">عرض الحصة</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المجموعة</label>
            <p className="mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-800">
              {session.group}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">المترشحون</label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {session.clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                    <p className="text-sm font-medium text-gray-800">{client.name}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500 mr-2" />
                    <p className="text-sm text-gray-600">{client.date}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faClock} className="text-yellow-500 mr-2" />
                    <p className="text-sm text-gray-600">{client.time}</p>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-purple-500 mr-2" />
                    <p className="text-sm text-gray-600">{client.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrivingSessionViewModal
