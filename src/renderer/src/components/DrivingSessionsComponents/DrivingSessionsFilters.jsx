import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'

const DrivingSessionsFilters = ({ onFilterChange, initialFilters }) => {
  const [month, setMonth] = useState(initialFilters.month)
  const [year, setYear] = useState(initialFilters.year)
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm)

  const months = [
    { value: '1', label: 'جانفي' },
    { value: '2', label: 'فيفري' },
    { value: '3', label: 'مارس' },
    { value: '4', label: 'افريل' },
    { value: '5', label: 'ماي' },
    { value: '6', label: 'جوان' },
    { value: '7', label: 'جويلية' },
    { value: '8', label: 'اوت' },
    { value: '9', label: 'سبتمبر' },
    { value: '10', label: 'اكتوبر' },
    { value: '11', label: 'نوفمبر' },
    { value: '12', label: 'ديسمبر' }
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString())

  useEffect(() => {
    onFilterChange({ month, year, searchTerm })
  }, [month, year, searchTerm, onFilterChange])

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col sm:flex-row w-full md:w-2/3 space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-grow">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="form-select px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">الشهر</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-select px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onFilterChange({ month, year, searchTerm })}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" /> تصفية
          </button>
        </div>
      </div>
    </div>
  )
}

export default DrivingSessionsFilters
