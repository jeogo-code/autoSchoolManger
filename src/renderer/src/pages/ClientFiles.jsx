import NavBar from '../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const ClientFiles = () => {
  const clients = [
    { id: 1, name: 'ملف العميل 1' },
    { id: 2, name: 'ملف العميل 2' },
    { id: 3, name: 'ملف العميل 3' },
    { id: 4, name: 'ملف العميل 4' },
    { id: 5, name: 'ملف العميل 5' }
  ]

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <NavBar />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ملفات العملاء</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-row-reverse items-center p-4">
              <FontAwesomeIcon icon={faFolder} className="text-3xl text-blue-500 ml-4" />
              <span className="text-lg font-medium text-gray-700">{client.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientFiles
