import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TrafficLawsFilters = ({ onAddSession, groups }) => {
  return (
    <div className="mb-6 flex justify-between items-center flex-wrap bg-white p-4 rounded-lg shadow-lg over">
      <div className="flex items-center w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
        <select className="form-control mb-2 px-4 py-2 w-full border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
          <option value="">اختر مجموعة...</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded-r-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="flex items-center">
        <button
          onClick={onAddSession}
          className="bg-green-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> إضافة حصة
        </button>
      </div>
    </div>
  )
}

export default TrafficLawsFilters
