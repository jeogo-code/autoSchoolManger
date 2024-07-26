import SearchBar from './SearchBar';

const SearchBarContainer = ({ onSearch }) => (
  <div className="p-6">
    <SearchBar onSearch={onSearch} />
  </div>
);

export default SearchBarContainer;
