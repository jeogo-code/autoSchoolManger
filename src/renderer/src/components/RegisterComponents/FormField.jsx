const FormField = ({ label, id, type = 'text', placeholder, options }) => {
  const inputClasses =
    'mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-xl py-3 px-4'

  if (type === 'select') {
    return (
      <div className="mb-6">
        <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
          {label}
        </label>
        <select id={id} name={id} className={inputClasses}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
        {label}
      </label>
      <input type={type} name={id} id={id} placeholder={placeholder} className={inputClasses} />
    </div>
  )
}

export default FormField
