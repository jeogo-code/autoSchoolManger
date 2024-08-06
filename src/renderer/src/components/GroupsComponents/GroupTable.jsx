import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDown, faUserPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const GroupTable = ({ groups, handleShowClientModal, handleDeleteGroup }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-purple-600 text-white">
          <tr>
            <TableCell>
              <FontAwesomeIcon icon={faSortAmountDown} className="mr-2" /> ID
            </TableCell>
            <TableCell>اسم المجموعة</TableCell>
            <TableCell>عدد المترشحين</TableCell>
            <TableCell>إجراءات</TableCell>
          </tr>
        </thead>
        <tbody>
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupRow
                key={group._id} // Use _id as the unique key
                group={group}
                handleShowClientModal={handleShowClientModal}
                handleDeleteGroup={handleDeleteGroup}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                <div
                  role="alert"
                  className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-3 rounded"
                >
                  <p className="font-bold">لا توجد مجموعات</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const TableCell = ({ children }) => (
  <th className="px-6 py-3 border-b-2 border-purple-500 text-right">{children}</th>
)

const GroupRow = ({ group, handleShowClientModal, handleDeleteGroup }) => {
  const clientCount = group.clientIds?.length || 0

  return (
    <tr className="hover:bg-teal-50 transition duration-150 ease-in-out">
      <td className="px-6 py-3 border-b border-gray-200">{group._id}</td>
      <td className="px-6 py-3 border-b border-gray-200">{group.name}</td>
      <td className="px-6 py-3 border-b border-gray-200">
        <span className="bg-teal-100 text-teal-800 py-1 px-3 rounded-full text-sm font-medium">
          {clientCount}
        </span>
      </td>
      <td className="px-6 py-3 border-b border-gray-200">
        <div className="flex justify-center items-center gap-5">
          <ActionButton
            onClick={() => handleShowClientModal(group._id)}
            icon={faUserPlus}
            color="blue"
            tooltip="إضافة مترشح"
          />
          <DeleteButton onDelete={() => handleDeleteGroup(group._id)} />
        </div>
      </td>
    </tr>
  )
}

const ActionButton = ({ onClick, icon, color, tooltip }) => (
  <button
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 shadow-md`}
    title={tooltip}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
  </button>
)

const DeleteButton = ({ onDelete }) => (
  <button
    type="button"
    className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-red-100 hover:bg-red-200 shadow-md"
    title="حذف"
    onClick={onDelete}
  >
    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
  </button>
)
export default GroupTable
