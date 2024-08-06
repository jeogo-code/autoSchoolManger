import { useState, useEffect, useCallback } from 'react'
import NavBar from '../components/NavBar'
import CustomPopup from '../components/RegisterClientComponets/CustomPopup'

const RegisterNewClient = () => {
  const [isUnknownBirthDate, setIsUnknownBirthDate] = useState(false)
  const [groups, setGroups] = useState([])
  const [clientData, setClientData] = useState({
    _id: '',
    name: '',
    photo: '',
    registrationDate: '',
    phone: '',
    identifier: '',
    gender: 'السيد',
    prenom_fr: '',
    nom: '',
    nom_fr: '',
    date_naissance: '',
    unknown_birth_date: false,
    place_naissance: '',
    blood_type: '',
    id_card_number: '',
    adresse: '',
    groupId: '',
    paymentAmount: 0,
    isFullyPaid: false
  })
  const [file, setFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await window.api.getAllGroups()
        setGroups(fetchedGroups)
      } catch (error) {
        console.error('Failed to fetch groups:', error)
      }
    }

    fetchGroups()
  }, [])

  const handleUnknownBirthDateChange = useCallback((e) => {
    const { checked } = e.target
    setIsUnknownBirthDate(checked)
    setClientData((prevData) => ({
      ...prevData,
      unknown_birth_date: checked,
      date_naissance: checked ? '' : prevData.date_naissance
    }))
  }, [])

  const handleChange = useCallback((e) => {
    const { id, value } = e.target
    setClientData((prevData) => ({
      ...prevData,
      [id]: value
    }))
  }, [])

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setImagePreview(URL.createObjectURL(selectedFile))
    } else {
      setFile(null)
      setImagePreview(null)
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      try {
        const validGenders = ['السيد', 'السيدة', 'الآنسة']
        if (!validGenders.includes(clientData.gender)) {
          throw new Error('Invalid gender value.')
        }

        // Check if a client with the same national ID card number already exists
        const existingClients = await window.api.getAllClients()
        const duplicate = existingClients.find(
          (client) => client.id_card_number === clientData.id_card_number
        )

        if (duplicate) {
          throw new Error('A client with this national ID card number already exists.')
        }

        let photoPath = clientData.photo
        const folderName = `${clientData.nom_fr.trim()}_${clientData.prenom_fr.trim() || 'unknown_user'}`
        const clientFolderPath = `Clients/${folderName}`

        // Save image if provided
        if (file) {
          // Use the original file name
          const originalFileName = file.name
          const fileData = await file.arrayBuffer()

          // Call the Electron API to save the file without renaming it
          const saveResult = await window.api.saveFile(folderName, originalFileName, fileData)

          if (!saveResult.success) {
            throw new Error(saveResult.error)
          }

          // Set the path for the uploaded photo
          photoPath = saveResult.path
        } else {
          photoPath = `${clientFolderPath}/placeholder.jpg`
        }

        const updatedClientData = {
          ...clientData,
          photo: photoPath
        }

        await window.api.addClient(updatedClientData)
        setPopupMessage('Client registered successfully!')
        setImagePreview(`safe-file://${photoPath}`)
      } catch (error) {
        console.error('Error registering client:', error)
        setPopupMessage(`Failed to register client: ${error.message}`)
      } finally {
        setIsSubmitting(false)
      }
    },
    [clientData, file]
  )
  const closePopup = () => {
    setPopupMessage('')
  }

  const FormField = useCallback(
    ({
      label,
      id,
      type = 'text',
      placeholder,
      options,
      required = false,
      disabled = false,
      value
    }) => {
      const inputClasses = `
          mt-2 block w-full rounded-lg border-gray-300 shadow-sm
          focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50
          transition duration-150 ease-in-out text-xl py-3 px-4
          ${type === 'date' ? 'text-gray-700' : ''}
        `

      return (
        <div className="mb-6">
          <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </label>
          {type === 'select' ? (
            <select
              id={id}
              name={id}
              className={inputClasses}
              required={required}
              value={value}
              onChange={handleChange}
            >
              <option value="" disabled>
                اختر...
              </option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={id}
              id={id}
              placeholder={placeholder}
              className={inputClasses}
              required={required}
              disabled={disabled}
              value={value}
              onChange={handleChange}
            />
          )}
        </div>
      )
    },
    [handleChange]
  )

  const FormCheckbox = useCallback(
    ({ label, id, checked }) => (
      <div className="flex items-center mb-6">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={handleUnknownBirthDateChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor={id} className="ml-2 block text-2xl font-medium text-teal-800">
          {label}
        </label>
      </div>
    ),
    [handleUnknownBirthDateChange]
  )

  const FormFileInput = useCallback(
    ({ label, id }) => (
      <div className="mb-6">
        <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
          {label}
        </label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-teal-500 transition duration-150 ease-in-out">
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
                <input
                  id={id}
                  name={id}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pr-2">أو اسحب وأفلت</p>
            </div>
            <p className="text-lg text-gray-500">PNG, JPG, GIF حتى 10 ميغابايت</p>
          </div>
        </div>
      </div>
    ),
    [handleFileChange]
  )

  const renderSection = useCallback(
    (title, fields) => (
      <div className="bg-gray-50 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-teal-600 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{fields}</div>
      </div>
    ),
    []
  )

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <NavBar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-teal-600 py-6">
            <h1 className="text-3xl font-bold text-white text-center">تسجيل عميل جديد</h1>
          </div>
          <div className="p-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {renderSection('المعلومات الشخصية', [
                <div key="arabic-names" className="col-span-full flex space-x-4">
                  <FormField
                    label="الإسم"
                    id="name"
                    placeholder="الإسم بالعربية"
                    value={clientData.name}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="اللقب"
                    id="nom"
                    placeholder="اللقب بالعربية"
                    value={clientData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>,
                <div key="latin-names" className="col-span-full flex space-x-4">
                  <FormField
                    label="الإسم باللاتينية"
                    id="prenom_fr"
                    placeholder="Prénom"
                    value={clientData.prenom_fr}
                    onChange={handleChange}
                  />
                  <FormField
                    label="اللقب باللاتينية"
                    id="nom_fr"
                    placeholder="Nom"
                    value={clientData.nom_fr}
                    onChange={handleChange}
                  />
                </div>,
                <FormField
                  key="gender"
                  label="السيد(ة)"
                  id="gender"
                  type="select"
                  options={[
                    { value: 'السيد', label: 'السيد' },
                    { value: 'السيدة', label: 'السيدة' },
                    { value: 'الآنسة', label: 'الآنسة' }
                  ]}
                  value={clientData.gender}
                  onChange={handleChange}
                  required
                />,
                <FormField
                  key="date_naissance"
                  label="تاريخ الميلاد"
                  id="date_naissance"
                  type="date"
                  placeholder="تاريخ الميلاد"
                  value={clientData.date_naissance}
                  disabled={isUnknownBirthDate}
                  onChange={handleChange}
                />,
                <FormCheckbox
                  key="unknown_birth_date"
                  label="تاريخ ميلاد غير معروف"
                  id="unknown_birth_date"
                  checked={isUnknownBirthDate}
                  onChange={handleUnknownBirthDateChange}
                />,
                <FormField
                  key="place_naissance"
                  label="مكان الميلاد"
                  id="place_naissance"
                  placeholder="مكان الميلاد"
                  value={clientData.place_naissance}
                  onChange={handleChange}
                />,
                <FormField
                  key="blood_type"
                  label="زمرة الدم"
                  id="blood_type"
                  type="select"
                  options={[
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' },
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' }
                  ]}
                  value={clientData.blood_type}
                  onChange={handleChange}
                />,
                <FormField
                  key="id_card_number"
                  label="رقم بطاقة التعريف"
                  id="id_card_number"
                  placeholder="رقم بطاقة التعريف"
                  value={clientData.id_card_number}
                  onChange={handleChange}
                />
              ])}

              {renderSection('معلومات الاتصال', [
                <FormField
                  key="phone"
                  label="رقم الهاتف"
                  id="phone"
                  placeholder="رقم الهاتف"
                  value={clientData.phone}
                  onChange={handleChange}
                />,
                <FormField
                  key="adresse"
                  label="العنوان"
                  id="adresse"
                  placeholder="العنوان"
                  value={clientData.adresse}
                  onChange={handleChange}
                />
              ])}

              {renderSection('معلومات المجموعة', [
                <FormField
                  key="groupId"
                  label="المجموعة"
                  id="groupId"
                  type="select"
                  options={[
                    { value: 'no_group', label: 'بدون مجموعة' },
                    ...groups.map((group) => ({
                      value: group._id,
                      label: group.name
                    }))
                  ]}
                  value={clientData.groupId || 'no_group'}
                  onChange={(e) => {
                    const value = e.target.value === 'no_group' ? '' : e.target.value
                    setClientData((prev) => ({ ...prev, groupId: value }))
                  }}
                />
              ])}

              {renderSection('معلومات التسجيل', [
                <FormField
                  key="registrationDate"
                  label="تاريخ التسجيل"
                  id="registrationDate"
                  type="date"
                  placeholder="تاريخ التسجيل"
                  value={clientData.registrationDate}
                  onChange={handleChange}
                />,
                <FormFileInput key="photo" label="اختيار الصورة" id="photo" />
              ])}

              {renderSection('معلومات الدفع', [
                <FormField
                  key="paymentAmount"
                  label="المبلغ المدفوع"
                  id="paymentAmount"
                  type="number"
                  placeholder="أدخل المبلغ المدفوع"
                  required
                  value={clientData.paymentAmount}
                  onChange={handleChange}
                />
              ])}

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {popupMessage && <CustomPopup message={popupMessage} onClose={closePopup} />}
      {imagePreview && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-teal-600 mb-2">معاينة الصورة</h4>
          <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterNewClient
