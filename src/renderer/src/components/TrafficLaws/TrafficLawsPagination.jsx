const TrafficLawsPagination = ({ sessionsPerPage, totalSessions, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalSessions / sessionsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === number
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-600 hover:bg-green-100'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TrafficLawsPagination
