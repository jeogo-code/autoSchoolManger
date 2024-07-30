import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import TableHeader from './TableHeader'

const ClientTable = ({ clients, onEditClient }) => {
  return (
    <div className="overflow-x-auto px-6">
      <table className="w-full table-auto border-collapse">
        <TableHeader />
        <tbody className="bg-white">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-teal-50 transition duration-150 ease-in-out">
              <TableCell>
                <img
                  src={client.photo}
                  alt="client"
                  className="w-12 h-12 object-cover rounded-full"
                />
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
                    onClick={() => onEditClient(client)}
                    icon={faEdit}
                    color="blue"
                    tooltip="تعديل"
                  />
                  <ActionButton
                    onClick={() => console.log('Info clicked')} // Placeholder for info action
                    icon={faInfoCircle}
                    color="green"
                    tooltip="تفاصيل"
                  />
                  <ActionButton
                    onClick={() => console.log('Delete clicked')} // Placeholder for delete action
                    icon={faTrashAlt}
                    color="red"
                    tooltip="حذف"
                  />
                </div>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TableCell = ({ children }) => (
  <td className="px-4 py-3 border-b border-gray-200 text-sm">{children}</td>
)

const ActionButton = ({ onClick, icon, color, tooltip }) => (
  <button
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 transition duration-150 ease-in-out p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 shadow-md`}
    title={tooltip}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
  </button>
)

export default ClientTable
