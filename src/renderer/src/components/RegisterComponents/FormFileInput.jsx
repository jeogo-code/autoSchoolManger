const FormFileInput = ({ label, id }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
      {label}
    </label>
    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-teal-500 transition duration-150 ease-in-out">
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-xl text-gray-600 justify-center">
          <label
            htmlFor={id}
            className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 transition duration-150 ease-in-out"
          >
            <span>تحميل ملف</span>
            <input id={id} name={id} type="file" className="sr-only" />
          </label>
          <p className="pr-2">أو اسحب وأفلت</p>
        </div>
        <p className="text-lg text-gray-500">PNG, JPG, GIF حتى 10 ميغابايت</p>
      </div>
    </div>
  </div>
)

export default FormFileInput
