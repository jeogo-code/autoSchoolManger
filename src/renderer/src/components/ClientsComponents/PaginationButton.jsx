import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const PaginationButton = ({ disabled, direction, active, page }) => (
  <li
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
      active ? 'bg-teal-600 text-white' : 'bg-white text-teal-600'
    } rounded-md shadow-md`}
  >
    <a
      className="px-4 py-2 flex items-center justify-center w-10 h-10 text-lg font-medium hover:bg-teal-100 transition duration-150 ease-in-out"
      href="#"
      tabIndex={disabled ? -1 : 0}
    >
      {direction ? (
        <FontAwesomeIcon icon={direction === 'right' ? faAngleRight : faAngleLeft} />
      ) : (
        page
      )}
    </a>
  </li>
)

export default PaginationButton
