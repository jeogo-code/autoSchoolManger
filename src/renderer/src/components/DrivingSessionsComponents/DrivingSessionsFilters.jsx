import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faSearch,
  faPlus,
  faCalendar,
  faUsers,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons'

const DrivingSessionsFilters = ({
  onFilterChange,
  initialFilters = {},
  onAddSession,
  groups = []
}) => {
  const [month, setMonth] = useState(initialFilters.month || '')
  const [year, setYear] = useState(initialFilters.year || '')
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '')
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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
    onFilterChange({ month, year, searchTerm, group: selectedGroup, status, startDate, endDate })
  }, [month, year, searchTerm, selectedGroup, status, startDate, endDate, onFilterChange])

  const handleApplyFilters = () => {
    onFilterChange({ month, year, searchTerm, group: selectedGroup, status, startDate, endDate })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FontAwesomeIcon icon={faCalendar} className="absolute right-3 top-3 text-gray-400" />
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
              >
                <option value="">الشهر</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faCalendar} className="absolute right-3 top-3 text-gray-400" />
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
              >
                <option value="">السنة</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon icon={faUsers} className="absolute right-3 top-3 text-gray-400" />
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
            >
              <option value="all">كل المجموعات</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faClipboardList}
              className="absolute right-3 top-3 text-gray-400"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
            >
              <option value="">الحالة</option>
              <option value="ناجح">ناجح</option>
              <option value="يعيد">يعيد</option>
              <option value="غير محدد">غير محدد</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon icon={faCalendar} className="absolute right-3 top-3 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="تاريخ البدء"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faCalendar} className="absolute right-3 top-3 text-gray-400" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="تاريخ الانتهاء"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
        <button
          onClick={handleApplyFilters}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faFilter} className="ml-2" /> تصفية
        </button>
        <button
          onClick={onAddSession}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faPlus} className="ml-2" /> إضافة حصة جديدة
        </button>
      </div>
    </div>
  )
}

export default DrivingSessionsFilters
