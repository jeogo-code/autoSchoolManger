const FormField = ({ label, id, type = 'text', placeholder, options, required = false }) => {
  const inputClasses = `
    mt-2 block w-full rounded-lg border-gray-300 shadow-sm
    focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50
    transition duration-150 ease-in-out text-xl py-3 px-4
    ${type === 'date' ? 'text-gray-700' : ''}
  `

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select id={id} name={id} className={inputClasses} required={required}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            placeholder={placeholder}
            className={`${inputClasses} h-32 resize-none`}
            required={required}
          />
        )
      default:
        return (
          <input
            type={type}
            name={id}
            id={id}
            placeholder={placeholder}
            className={inputClasses}
            required={required}
          />
        )
    }
  }

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {renderInput()}
    </div>
  )
}

export default FormField
