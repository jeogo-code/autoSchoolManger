import React, { useState, useCallback, useMemo } from 'react'
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
  faVenusMars
} from '@fortawesome/free-solid-svg-icons'

const ClientModel = React.memo(({ client, onClose, onSave }) => {
  const [editedClient, setEditedClient] = useState(client)
  const [isUnknownBirthDate, setIsUnknownBirthDate] = useState(client.unknown_birth_date || false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setEditedClient((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCheckboxChange = useCallback((e) => {
    const { checked } = e.target
    setIsUnknownBirthDate(checked)
    setEditedClient((prev) => ({
      ...prev,
      unknown_birth_date: checked,
      date_naissance: checked ? '' : prev.date_naissance
    }))
  }, [])

  const handleSave = useCallback(() => {
    onSave(editedClient)
    onClose()
  }, [editedClient, onSave, onClose])

  const InputField = useCallback(({ icon, label, id, type = 'text', value, ...props }) => (
    <div className="relative mb-6">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-2">
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
          className="block w-full pr-12 py-3 text-lg border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          {...props}
        />
      </div>
    </div>
  ), [handleChange])

  const SelectField = useCallback(({ icon, label, id, options, value, ...props }) => (
    <div className="relative mb-6">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-2">
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
  ), [handleChange])

  const Section = useCallback(({ title, children }) => (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h3>
      {children}
    </div>
  ), [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-teal-600">تعديل معلومات العميل</h2>
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
                  { value: '1', label: 'السيد' },
                  { value: '2', label: 'السيدة' },
                  { value: '3', label: 'الأنسة' }
                ]}
              />
              <InputField
                icon={faUser}
                label="الإسم"
                id="firstname"
                placeholder="الإسم"
                value={editedClient.firstname}
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
                id="lastname"
                placeholder="اللقب"
                value={editedClient.lastname}
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
                  disabled={isUnknownBirthDate}
                />
                <div className="flex items-center">
                  <input
                    id="unknown_birth_date"
                    name="unknown_birth_date"
                    type="checkbox"
                    checked={isUnknownBirthDate}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
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
            <div className="relative">
              <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
                اختيار الصورة
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <FontAwesomeIcon icon={faCamera} className="mx-auto h-16 w-16 text-gray-400" />
                  <div className="flex text-lg text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                    >
                      <span>تحميل ملف</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={(e) =>
                          handleChange({ target: { name: 'image', value: e.target.files[0] } })
                        }
                      />
                    </label>
                    <p className="pr-1">أو اسحب وأفلت</p>
                  </div>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </Section>
        </form>
        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-teal-500 text-white py-3 px-6 text-lg rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            >
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ClientModel
