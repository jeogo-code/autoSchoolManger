// ClientRow.jsx
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const ClientRow = ({ client }) => {
  return (
    <tr className="hover:bg-teal-50 transition duration-150 ease-in-out">
      <TableCell>
        <img src={client.photo} alt="client" className="w-12 h-12 object-cover rounded-full" />
      </TableCell>
      <TableCell>{client.lastname}</TableCell>
      <TableCell>{client.firstname}</TableCell>
      <TableCell>{client.registrationDate}</TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell>{client.group}</TableCell>
      <TableCell>{client.identifier}</TableCell>
      <TableCell>
        <div className="flex justify-center items-center gap-5">
          <ActionButton
            to={`/client/edit/${client.id}`}
            icon={faEdit}
            color="blue"
            tooltip="تعديل"
          />
          <ActionButton
            to={`/client/details/${client.id}`}
            icon={faInfoCircle}
            color="green"
            tooltip="تفاصيل"
          />
          <DeleteButton clientId={client.id} />
        </div>
      </TableCell>
    </tr>
  )
}

const TableCell = ({ children }) => (
  <td className="px-4 py-3 border-b border-gray-200 text-sm">{children}</td>
)

const ActionButton = ({ to, icon, color, tooltip }) => (
  <Link
    to={to}
    className={`text-${color}-600 hover:text-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 shadow-md`}
    title={tooltip}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
  </Link>
)

const DeleteButton = ({ clientId }) => (
  <button
    type="button"
    className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-red-100 hover:bg-red-200 shadow-md"
    title="حذف"
    onClick={() => handleDelete(clientId)}
  >
    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
  </button>
)

const handleDelete = (clientId) => {
  if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المترشح؟')) {
    // Perform delete action
    console.log(`Deleting client with ID: ${clientId}`)
  }
}

export default ClientRow
