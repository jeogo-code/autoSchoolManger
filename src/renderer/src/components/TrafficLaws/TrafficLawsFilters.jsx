import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faFilter, faCalendar, faUsers } from '@fortawesome/free-solid-svg-icons'

const TrafficLawsFilters = ({ onAddLesson, groups, onFilter }) => {
  const [groupId, setGroupId] = useState('')
  const [date, setDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilter = () => {
    onFilter(groupId, date, searchTerm)
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label
              htmlFor="group-select"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              المجموعة
            </label>
            <div className="relative">
              <select
                id="group-select"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out appearance-none"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              >
                <option value="">اختر مجموعة...</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faUsers}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="date-input" className="block text-sm font-semibold text-gray-700 mb-2">
              التاريخ
            </label>
            <div className="relative">
              <input
                id="date-input"
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label
              htmlFor="search-input"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              البحث
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث هنا..."
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleFilter}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            <span>تصفية</span>
          </button>
          <button
            onClick={onAddLesson}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <span>إضافة حصة</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrafficLawsFilters
