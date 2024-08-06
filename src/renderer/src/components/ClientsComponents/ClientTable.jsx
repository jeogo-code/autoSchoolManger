import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons'

const ClientTable = ({
  clients,
  getGroupNameById,
  onEditClient,
  onShowDetails,
  onDeleteClient
}) => {
  const getClientImagePath = (client) => {
    return client?.photo || null
  }

  return (
    <div className="overflow-x-auto px-6">
      <table className="w-full table-auto border-collapse shadow-lg bg-white">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">الصورة</th>
            <th className="px-4 py-3 text-left">اللــــقب</th>
            <th className="px-4 py-3 text-left">الإســـم</th>
            <th className="px-4 py-3 text-left">تــاريخ التسجيل</th>
            <th className="px-4 py-3 text-left">رقم الهاتف</th>
            <th className="px-4 py-3 text-left">اسم المجموعة</th>
            <th className="px-4 py-3 text-left">عمليات</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} className="hover:bg-teal-50 transition duration-150 ease-in-out">
              <td className="px-4 py-3 border-b border-gray-200">
                {client.photo ? (
                  <img
                    src={getClientImagePath(client)}
                    alt={`${client.name || 'Client'}`}
                    className="w-20 h-20 object-cover rounded-full shadow-md"
                    onError={(e) => {
                      e.target.src = '/path/to/default-icon.svg'
                    }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} size="3x" className="text-gray-400" />
                )}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">{client.nom || 'غير متوفر'}</td>
              <td className="px-4 py-3 border-b border-gray-200">{client.name || 'غير متوفر'}</td>
              <td className="px-4 py-3 border-b border-gray-200">
                {client.registrationDate || 'غير متوفر'}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">{client.phone || 'غير متوفر'}</td>
              <td className="px-4 py-3 border-b border-gray-200">
                {getGroupNameById(client.groupId)}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => onEditClient(client)}
                    className="text-blue-600 hover:text-blue-700 focus:outline-none transition duration-150 ease-in-out p-1 rounded-full hover:bg-blue-100"
                    title="تعديل"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button
                    onClick={() => onShowDetails(client)}
                    className="text-green-600 hover:text-green-700 focus:outline-none transition duration-150 ease-in-out p-1 rounded-full hover:bg-green-100"
                    title="تفاصيل"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                  </button>
                  <button
                    onClick={() => onDeleteClient(client)}
                    className="text-red-600 hover:text-red-700 focus:outline-none transition duration-150 ease-in-out p-1 rounded-full hover:bg-red-100"
                    title="حذف"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clients.length === 0 && (
        <div className="text-center py-4 text-gray-500">لا يوجد عملاء لعرضهم</div>
      )}
    </div>
  )
}

export default ClientTable
