
const FormCheckbox = ({ label, id, required = false }) => (
  <div className="flex items-center mb-6">
    <input
      id={id}
      name={id}
      type="checkbox"
      className="h-6 w-6 text-teal-600 border-gray-300 rounded focus:ring-teal-500 transition duration-150 ease-in-out cursor-pointer"
      required={required}
    />
    <label htmlFor={id} className="mr-3 block text-2xl font-medium text-teal-800 cursor-pointer">
      {label}
      {required && <span className="text-red-500 mr-1">*</span>}
    </label>
  </div>
)

export default FormCheckbox
