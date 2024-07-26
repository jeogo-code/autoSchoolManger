import PaginationButton from './PaginationButton'

const Pagination = () => (
  <div className="py-6 px-6">
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="flex space-x-4">
        <PaginationButton disabled={true} direction="right" />
        <PaginationButton active={true} page={1} />
        <PaginationButton disabled={true} direction="left" />
      </ul>
    </nav>
  </div>
)

export default Pagination
