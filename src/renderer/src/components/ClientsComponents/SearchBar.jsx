import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <div className="flex justify-center items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="search"
            name="search"
            placeholder="بحث عن مترشح..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
