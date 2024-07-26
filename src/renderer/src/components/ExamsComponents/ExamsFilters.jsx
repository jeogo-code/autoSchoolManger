import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ExamsFilters = ({ onAddExam, selectedType, setSelectedType }) => {
  return (
    <div className="mb-6 flex justify-between items-center flex-wrap bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="form-control mb-2 px-4 py-2 w-full border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600"
        >
          <option value="">اختر نوع الامتحان...</option>
          <option value="قانون المرور">قانون المرور</option>
          <option value="مناورات">مناورات</option>
          <option value="سياقة">سياقة</option>
        </select>
      </div>
      <div className="flex items-center">
        <button
          onClick={onAddExam}
          className="bg-yellow-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> إضافة إمتحان
        </button>
      </div>
    </div>
  )
}

export default ExamsFilters
