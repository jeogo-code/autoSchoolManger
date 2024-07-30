import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

const ExamsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  filterGroup,
  setFilterGroup,
  groups,
  onAddExam
}) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleGroupChange = (e) => {
    setFilterGroup(e.target.value)
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  return (
    <div className="mb-6 flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md gap-4">
      <button
        onClick={onAddExam}
        className="w-full md:w-auto mb-4 md:mb-0 bg-yellow-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        aria-label="إضافة امتحان جديد"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> إضافة امتحان جديد
      </button>
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="بحث..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          aria-label="بحث"
        />
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
      </div>
      <div className="relative w-full md:w-auto flex items-center">
        <select
          value={filterGroup}
          onChange={handleGroupChange}
          className="form-select px-4 py-2 w-full md:w-auto border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          aria-label="تصفية حسب المجموعة"
        >
          <option value="">جميع المجموعات</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full md:w-auto flex items-center">
        <FontAwesomeIcon icon={faFilter} className="text-yellow-600 mr-2" />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="form-select px-4 py-2 w-full md:w-auto border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          aria-label="تصفية حسب نوع الامتحان"
        >
          <option value="">جميع أنواع الامتحانات</option>
          <option value="قانون المرور">قانون المرور</option>
          <option value="مناورات">مناورات</option>
          <option value="سياقة">سياقة</option>
        </select>
      </div>
    </div>
  )
}

export default ExamsFilters
