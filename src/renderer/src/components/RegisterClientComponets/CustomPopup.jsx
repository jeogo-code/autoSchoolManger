const CustomPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-teal-600 text-white font-medium rounded-md shadow-sm hover:bg-teal-700 transition duration-150 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default CustomPopup
