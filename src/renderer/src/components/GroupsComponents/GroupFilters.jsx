import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const GroupFilters = ({ newGroupName, setNewGroupName, handleAddGroup }) => {
  return (
    <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-inner">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">إنشاء مجموعة جديدة</h2>
      <div className="flex flex-col md:flex-row items-center">
        <input
          type="text"
          placeholder="اسم المجموعة"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="flex-grow mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
        <button
          onClick={handleAddGroup}
          className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> إضافة مجموعة
        </button>
      </div>
    </div>
  )
}

export default GroupFilters
