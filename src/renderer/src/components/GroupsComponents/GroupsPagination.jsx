import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const GroupsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="py-6 px-6">
      <nav aria-label="Pagination" className="flex justify-center">
        <ul className="flex space-x-2">
          <PaginationButton
            direction="left"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {pages.map((page) => (
            <PaginationButton
              key={page}
              page={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            />
          ))}
          <PaginationButton
            direction="right"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </ul>
      </nav>
    </div>
  )
}

const PaginationButton = ({ direction, page, active, onClick, disabled }) => {
  if (direction) {
    return (
      <li>
        <button
          onClick={onClick}
          className={`px-3 py-1 mx-1 rounded-md bg-white text-purple-600 hover:bg-purple-100 ${
            direction === 'left' ? 'rounded-e-lg' : 'rounded-s-lg'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={disabled}
        >
          <FontAwesomeIcon icon={direction === 'left' ? faAngleLeft : faAngleRight} />
        </button>
      </li>
    )
  }

  return (
    <li>
      <button
        onClick={onClick}
        className={`px-3 py-1 mx-1 rounded-md ${
          active ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 hover:bg-purple-100'
        }`}
      >
        {page}
      </button>
    </li>
  )
}

export default GroupsPagination
