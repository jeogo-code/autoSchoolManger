import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar'

const Debts = () => {
  const clients = [
    {
      id: 1,
      name: 'عميل 1',
      photo: null, // Replace null with actual photo URL if available
      given: '1000 د.ج',
      owed: '2000 د.ج'
    },
    {
      id: 2,
      name: 'عميل 2',
      photo: null,
      given: '500 د.ج',
      owed: '1500 د.ج'
    },
    {
      id: 3,
      name: 'عميل 3',
      photo: null,
      given: '2000 د.ج',
      owed: '500 د.ج'
    }
    // Add more client objects as needed
  ]

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <NavBar />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ديون العملاء</h2>
      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="flex items-center p-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {client.photo ? (
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="text-3xl text-gray-500" />
                )}
              </div>
              <div className="mr-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-700">{client.name}</h3>
                <p className="text-gray-500">
                  دفع: <span className="font-medium text-gray-800">{client.given}</span>
                </p>
                <p className="text-red-500">
                  مطلوب: <span className="font-medium">{client.owed}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Debts
