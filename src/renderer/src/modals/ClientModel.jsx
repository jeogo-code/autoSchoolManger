import { useState, useCallback, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUser,
  faPhone,
  faMapMarkerAlt,
  faBirthdayCake,
  faTint,
  faIdCard,
  faCamera,
  faVenusMars,
  faMoneyBillWave,
  faCalendar,
  faCheck,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

const ClientModel = ({ client, onClose, onSave, mode }) => {
  const [editedClient, setEditedClient] = useState(client)
  const [isUnknownBirthDate, setIsUnknownBirthDate] = useState(client.unknown_birth_date || false)
  const [imagePreview, setImagePreview] = useState(client.photo || null)
  const [file, setFile] = useState(null)

  useEffect(() => {
    setEditedClient(client)
    setIsUnknownBirthDate(client.unknown_birth_date || false)
    setImagePreview(client.photo || null)
  }, [client])

  const isReadOnly = mode === 'details'

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      if (!isReadOnly) {
        setEditedClient((prev) => ({ ...prev, [name]: value }))
      }
    },
    [isReadOnly]
  )

  const handleCheckboxChange = useCallback(
    (e) => {
      const { name, checked } = e.target
      if (!isReadOnly) {
        setEditedClient((prev) => ({ ...prev, [name]: checked }))
      }
    },
    [isReadOnly]
  )

  const handleImageChange = useCallback(
    (e) => {
      if (!isReadOnly) {
        const selectedFile = e.target.files[0]
        if (selectedFile && selectedFile.type.startsWith('image/')) {
          setFile(selectedFile)
          setImagePreview(URL.createObjectURL(selectedFile))
        } else {
          setFile(null)
          setImagePreview(null)
        }
      }
    },
    [isReadOnly]
  )

  const handleSave = useCallback(async () => {
    if (!isReadOnly) {
      try {
        let photoPath = editedClient.photo

        if (file) {
          // Remove the old photo if it exists
          if (photoPath) {
            await window.api.deleteFile(photoPath)
          }

          // Save the new file
          const folderName = `${editedClient.nom_fr.trim()}_${editedClient.prenom_fr.trim() || 'unknown_user'}`
          const saveResult = await window.api.saveFile(
            folderName,
            file.name,
            await file.arrayBuffer()
          )

          if (!saveResult.success) {
            throw new Error(saveResult.error)
          }

          // Update the photo path with the new file path
          photoPath = saveResult.path
        }

        const updatedClientData = { ...editedClient, photo: photoPath }
        onSave(updatedClientData)
        onClose()
      } catch (error) {
        console.error('Error saving client:', error)
      }
    }
  }, [editedClient, file, onSave, onClose, isReadOnly])

  const InputField = useMemo(
    () =>
      ({ icon, label, id, type = 'text', value, ...props }) => (
        <div className="relative mb-6">
          <label htmlFor={id} className="block text-xl font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={icon} className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type={type}
              name={id}
              id={id}
              value={value}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="block w-full pr-12 py-3 text-lg border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              {...props}
            />
          </div>
        </div>
      ),
    [handleChange, isReadOnly]
  )

  const SelectField = useMemo(
    () =>
      ({ icon, label, id, options, value, ...props }) => (
        <div className="relative mb-6">
          <label htmlFor={id} className="block text-xl font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={icon} className="h-6 w-6 text-gray-400" />
            </div>
            <select
              name={id}
              id={id}
              value={value}
              onChange={handleChange}
              disabled={isReadOnly}
              className="block w-full pr-12 py-3 text-lg border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              {...props}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ),
    [handleChange, isReadOnly]
  )

  const Section = useMemo(
    () =>
      ({ title, children }) => (
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">{title}</h3>
          {children}
        </div>
      ),
    []
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-teal-600">
              {isReadOnly ? 'تفاصيل العميل' : 'تعديل معلومات العميل'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </button>
          </div>
        </div>
        <form className="px-8 py-6 space-y-8">
          <Section title="المعلومات الشخصية">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                icon={faVenusMars}
                label="السيد(ة)"
                id="gender"
                value={editedClient.gender}
                options={[
                  { value: 'السيد', label: 'السيد' },
                  { value: 'السيدة', label: 'السيدة' },
                  { value: 'الآنسة', label: 'الآنسة' }
                ]}
              />
              <InputField
                icon={faUser}
                label="الإسم"
                id="name"
                placeholder="الإسم"
                value={editedClient.name}
              />
              <InputField
                icon={faUser}
                label="الإسم باللاتينية"
                id="prenom_fr"
                placeholder="Prenom"
                value={editedClient.prenom_fr}
              />
              <InputField
                icon={faUser}
                label="اللقب"
                id="nom"
                placeholder="اللقب"
                value={editedClient.nom}
              />
              <InputField
                icon={faUser}
                label="اللقب باللاتينية"
                id="nom_fr"
                placeholder="Nom"
                value={editedClient.nom_fr}
              />
            </div>
          </Section>

          <Section title="معلومات الميلاد">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InputField
                  icon={faBirthdayCake}
                  label="تاريخ الميلاد"
                  id="date_naissance"
                  type="date"
                  value={editedClient.date_naissance}
                  disabled={isUnknownBirthDate || isReadOnly}
                />
                <div className="flex items-center">
                  <input
                    id="unknown_birth_date"
                    name="unknown_birth_date"
                    type="checkbox"
                    checked={isUnknownBirthDate}
                    onChange={(e) => {
                      if (!isReadOnly) {
                        setIsUnknownBirthDate(e.target.checked)
                        setEditedClient((prev) => ({
                          ...prev,
                          unknown_birth_date: e.target.checked,
                          date_naissance: e.target.checked ? '' : prev.date_naissance
                        }))
                      }
                    }}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    disabled={isReadOnly}
                  />
                  <label htmlFor="unknown_birth_date" className="mr-3 block text-lg text-gray-900">
                    تاريخ ميلاد غير معروف
                  </label>
                </div>
              </div>
              <InputField
                icon={faMapMarkerAlt}
                label="مكان الميلاد"
                id="place_naissance"
                placeholder="مكان الميلاد"
                value={editedClient.place_naissance}
              />
            </div>
          </Section>

          <Section title="معلومات الاتصال والهوية">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                icon={faTint}
                label="زمرة الدم"
                id="blood_type"
                value={editedClient.blood_type}
                options={[
                  { value: '', label: 'زمرة الدم' },
                  { value: 'O+', label: 'O+' },
                  { value: 'O-', label: 'O-' },
                  { value: 'A+', label: 'A+' },
                  { value: 'A-', label: 'A-' },
                  { value: 'B+', label: 'B+' },
                  { value: 'B-', label: 'B-' },
                  { value: 'AB+', label: 'AB+' },
                  { value: 'AB-', label: 'AB-' }
                ]}
              />
              <InputField
                icon={faIdCard}
                label="رقم بطاقة التعريف"
                id="id_card_number"
                placeholder="رقم بطاقة التعريف"
                value={editedClient.id_card_number}
              />
              <InputField
                icon={faPhone}
                label="رقم الهاتف"
                id="phone"
                placeholder="رقم الهاتف"
                value={editedClient.phone}
              />
              <InputField
                icon={faMapMarkerAlt}
                label="العنوان"
                id="adresse"
                placeholder="العنوان"
                value={editedClient.adresse}
              />
            </div>
          </Section>

          <Section title="الصورة الشخصية">
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <label htmlFor="image" className="block text-xl font-medium text-gray-700 mb-2">
                  تحميل صورة
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FontAwesomeIcon icon={faCamera} className="mx-auto h-16 w-16 text-gray-400" />
                    <div className="flex text-lg text-gray-600">
                      <label
                        htmlFor="image"
                        className={`relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 ${
                          isReadOnly ? 'pointer-events-none' : ''
                        }`}
                      >
                        <span>تحميل صورة</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          disabled={isReadOnly}
                        />
                      </label>
                      <p className="pr-1">أو اسحب وأفلت</p>
                    </div>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 10 ميغابايت</p>
                  </div>
                </div>
              </div>
              <div className="w-48 h-48 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="text-gray-400 text-5xl" />
                )}
              </div>
            </div>
          </Section>

          <Section title="معلومات التسجيل">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={faCalendar}
                label="تاريخ التسجيل"
                id="registrationDate"
                type="date"
                value={editedClient.registrationDate}
                onChange={handleChange}
              />
              <InputField
                icon={faCalendar}
                label="تاريخ إيداع الملف"
                id="date_insert"
                type="date"
                value={editedClient.date_insert}
                onChange={handleChange}
              />
            </div>
          </Section>

          <Section title="معلومات الدفع">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={faMoneyBillWave}
                label="المبلغ المدفوع"
                id="paymentAmount"
                type="number"
                placeholder="أدخل المبلغ المدفوع"
                value={editedClient.paymentAmount}
                onChange={handleChange}
              />
              <div className="relative mb-6">
                <label
                  htmlFor="isFullyPaid"
                  className="block text-xl font-medium text-gray-700 mb-2"
                >
                  هل الدفع مكتمل؟
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="isFullyPaid"
                    name="isFullyPaid"
                    checked={editedClient.isFullyPaid}
                    onChange={handleCheckboxChange}
                    disabled={isReadOnly}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  {editedClient.isFullyPaid ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 text-2xl" />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl" />
                  )}
                </div>
              </div>
            </div>
          </Section>
        </form>
        {!isReadOnly && (
          <div className="sticky bottom-0 bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-teal-500 text-white py-3 px-6 text-xl rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientModel
