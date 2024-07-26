const TrafficLawsPagination = () => {
  return (
    <div className="card-footer py-4 container">
      <nav aria-label="Pagination" className="pull-left">
        <ul className="pagination justify-content-end mb-0">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
              <i className="fas fa-angle-right"></i> <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item disabled">
            <a className="page-link" href="#">
              <i className="fas fa-angle-left"></i> <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default TrafficLawsPagination
