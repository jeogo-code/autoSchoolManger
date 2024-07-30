import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ onSearch, onFilter, clients }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('0')
  const [groupOptions, setGroupOptions] = useState([])

  useEffect(() => {
    if (clients && clients.length > 0) {
      const groups = [...new Set(clients?.map((client) => client?.group))]
      setGroupOptions(groups)
    }
  }, [clients])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value, selectedGroup)
  }

  const handleGroupChange = (e) => {
    const value = e.target.value
    setSelectedGroup(value)
    onFilter(searchTerm, value)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="search"
            name="nom"
            placeholder="بحث عن مترشح..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <select
            name="group"
            className="w-full md:w-auto pl-4 pr-8 py-2 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition duration-150 ease-in-out appearance-none"
            onChange={handleGroupChange}
          >
            <option value="0">اختر مجموعة</option>
            {groupOptions.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
          <FontAwesomeIcon
            icon={faFilter}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
