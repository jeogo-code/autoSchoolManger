import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const ClientRow = ({ client, onUpdateClient }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const openDetailsModal = () => setIsDetailsModalOpen(true)
  const closeDetailsModal = () => setIsDetailsModalOpen(false)

  return (
    <>
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
            <ActionButton onClick={openEditModal} icon={faEdit} color="blue" tooltip="تعديل" />
            <ActionButton
              onClick={openDetailsModal}
              icon={faInfoCircle}
              color="green"
              tooltip="تفاصيل"
            />
            <DeleteButton clientId={client.id} />
          </div>
        </TableCell>
      </tr>
      {isEditModalOpen && (
        <EditModal client={client} onClose={closeEditModal} onUpdateClient={onUpdateClient} />
      )}
      {isDetailsModalOpen && <DetailsModal client={client} onClose={closeDetailsModal} />}
    </>
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

const Modal = ({ children, title, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={onClose}
        >
          إغلاق
        </button>
      </div>
    </div>
  </div>
)

const EditModal = ({ client, onClose, onUpdateClient }) => {
  const [editedClient, setEditedClient] = useState({ ...client })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }))
  }

  const handleSave = () => {
    onUpdateClient(editedClient)
    onClose()
  }

  return (
    <Modal title="تعديل معلومات المترشح" onClose={onClose}>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">الاسم</label>
        <input
          type="text"
          name="firstname"
          value={editedClient.firstname}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">اللقب</label>
        <input
          type="text"
          name="lastname"
          value={editedClient.lastname}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
        <input
          type="text"
          name="phone"
          value={editedClient.phone}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      {/* Add other fields as needed */}
      <div className="mt-6 flex justify-end space-x-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleSave}
        >
          حفظ التعديلات
        </button>
      </div>
    </Modal>
  )
}

const DetailsModal = ({ client, onClose }) => (
  <Modal title="تفاصيل المترشح" onClose={onClose}>
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">الاسم</label>
      <div className="mt-1 p-2 border rounded-md bg-gray-100">{client.firstname}</div>
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">اللقب</label>
      <div className="mt-1 p-2 border rounded-md bg-gray-100">{client.lastname}</div>
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
      <div className="mt-1 p-2 border rounded-md bg-gray-100">{client.phone}</div>
    </div>
    {/* Add other fields as needed */}
  </Modal>
)

export default ClientRow
