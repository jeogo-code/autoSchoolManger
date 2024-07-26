const DrivingSessionsPagination = () => {
  return (
    <div className="py-4 flex justify-end">
      <nav aria-label="Pagination">
        <ul className="pagination flex space-x-1">
          <li className="page-item">
            <button className="page-link px-3 py-1 border rounded-md text-gray-500 hover:text-gray-700">
              <i className="fas fa-angle-right"></i> <span className="sr-only">Previous</span>
            </button>
          </li>
          <li className="page-item active">
            <button className="page-link px-3 py-1 border rounded-md text-white bg-blue-600 hover:bg-blue-700">
              1
            </button>
          </li>
          <li className="page-item">
            <button className="page-link px-3 py-1 border rounded-md text-gray-500 hover:text-gray-700">
              <i className="fas fa-angle-left"></i> <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default DrivingSessionsPagination
