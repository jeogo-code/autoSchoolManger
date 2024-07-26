// SearchBar.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full md:w-1/2">
        <input
          type="search"
          name="nom"
          placeholder="بحث عن مترشح..."
          className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
          onChange={(e) => onSearch(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
      </div>
      <div className="w-full md:w-auto">
        <select
          name="group"
          className="w-full md:w-auto pl-4 pr-8 py-2 rounded-full border-2 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition duration-150 ease-in-out appearance-none"
        >
          <option value="0">اختر مجموعة</option>
          <option value="1">بدون مجموعة ( 1 )</option>
          <option value="387">مجموعة 01 ( 0 )</option>
          <option value="388">مجموعة 02 ( 0 )</option>
        </select>
        <FontAwesomeIcon icon={faFilter} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default SearchBar;
