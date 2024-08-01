import { useState } from 'react'
import NavBar from '../components/NavBar'

const RegisterNewClient = () => {
  const [isUnknownBirthDate, setIsUnknownBirthDate] = useState(false)
  const [amountPaid, setAmountPaid] = useState(0)

  // Handle checkbox change for "Unknown Birth Date"
  const handleUnknownBirthDateChange = (e) => {
    setIsUnknownBirthDate(e.target.checked)
  }

  // Handle change in amount paid
  const handleAmountPaidChange = (e) => {
    setAmountPaid(e.target.value)
  }

  // FormField Component
  const FormField = ({
    label,
    id,
    type = 'text',
    placeholder,
    options,
    required = false,
    disabled = false,
    value = '',
    onChange = null
  }) => {
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
            <select
              id={id}
              name={id}
              className={inputClasses}
              required={required}
              value={value}
              onChange={onChange}
            >
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
              disabled={disabled}
              value={value}
              onChange={onChange}
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

  // FormCheckbox Component
  const FormCheckbox = ({ label, id, checked, onChange }) => (
    <div className="flex items-center mb-6">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-2xl font-medium text-teal-800">
        {label}
      </label>
    </div>
  )

  // FormFileInput Component
  const FormFileInput = ({ label, id, required = false }) => {
    const [fileName, setFileName] = useState('')

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      setFileName(file ? file.name : '')
    }

    return (
      <div className="mb-6">
        <label htmlFor={id} className="block text-2xl font-medium text-teal-800 mb-2">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
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
                  className="sr-only"
                  onChange={handleFileChange}
                  required={required}
                />
              </label>
              <p className="pr-2">أو اسحب وأفلت</p>
            </div>
            <p className="text-lg text-gray-500">
              {fileName ? fileName : 'PNG, JPG, GIF حتى 10 ميغابايت'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Helper function to render form sections
  const renderSection = (title, fields) => (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-teal-600 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{fields}</div>
    </div>
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
            <form className="space-y-8">
              {renderSection('المعلومات الشخصية', [
                <FormField
                  key="gender"
                  label="السيد(ة)"
                  id="gender"
                  type="select"
                  options={[
                    { value: '1', label: 'السيد' },
                    { value: '2', label: 'السيدة' },
                    { value: '3', label: 'الأنسة' }
                  ]}
                />,
                <FormField key="prenom" label="الإسم" id="prenom" placeholder="الإسم" />,
                <FormField
                  key="prenom_fr"
                  label="الإسم باللاتينية"
                  id="prenom_fr"
                  placeholder="Prenom"
                />,
                <FormField key="nom" label="اللقب" id="nom" placeholder="اللقب" />,
                <FormField key="nom_fr" label="اللقب باللاتينية" id="nom_fr" placeholder="Nom" />,
                <FormField
                  key="date_naissance"
                  label="تاريخ الميلاد"
                  id="date_naissance"
                  type="date"
                  placeholder="تاريخ الميلاد"
                  disabled={isUnknownBirthDate}
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
                />,
                <FormField
                  key="blood_type"
                  label="زمرة الدم"
                  id="blood_type"
                  type="select"
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
                />,
                <FormField
                  key="id_card_number"
                  label="رقم بطاقة التعريف"
                  id="id_card_number"
                  placeholder="رقم بطاقة التعريف"
                />
              ])}

              {renderSection('المعلومات العائلية', [
                <FormField key="nom_pere" label="إسم الأب" id="nom_pere" placeholder="إسم الأب" />,
                <FormField
                  key="prenom_mere"
                  label="إسم الأم"
                  id="prenom_mere"
                  placeholder="إسم الأم"
                />,
                <FormField key="nom_mere" label="لقب الأم" id="nom_mere" placeholder="لقب الأم" />,
                <FormField
                  key="martital_status"
                  label="الحالة الإجتماعية"
                  id="martital_status"
                  type="select"
                  options={[
                    { value: '1', label: 'أعزب' },
                    { value: '2', label: 'متزوج (ة)' },
                    { value: '3', label: 'مطلق (ة)' },
                    { value: '4', label: 'أرمل (ة)' }
                  ]}
                />
              ])}

              {renderSection('معلومات الاتصال', [
                <FormField key="phone" label="رقم الهاتف" id="phone" placeholder="رقم الهاتف" />,
                <FormField
                  key="nationalite"
                  label="الجنسية"
                  id="nationalite"
                  placeholder="الجزائرية"
                />,
                <FormField key="adresse" label="العنوان" id="adresse" placeholder="العنوان" />,
                <FormField
                  key="baladiya_tasjil"
                  label="بلدية التسجيل"
                  id="baladiya_tasjil"
                  placeholder="بلدية التسجيل"
                />,
                <FormField
                  key="baladiya_ikama"
                  label="بلدية الإقامة"
                  id="baladiya_ikama"
                  placeholder="بلدية الإقامة"
                />
              ])}

              {renderSection('معلومات الرخصة', [
                <FormField
                  key="type"
                  label="صنف الرخصة"
                  id="type"
                  type="select"
                  options={[
                    { value: '', label: 'صنف الرخصة' },
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'B', label: 'B' },
                    { value: 'C1', label: 'C1' },
                    { value: 'C2', label: 'C2' },
                    { value: 'D', label: 'D' },
                    { value: 'E', label: 'E' },
                    { value: 'F', label: 'F' }
                  ]}
                />,
                <FormField
                  key="group_id"
                  label="المجموعة"
                  id="group_id"
                  type="select"
                  options={[
                    { value: '', label: 'اختر مجموعة' },
                    { value: '1', label: 'بدون مجموعة' },
                    { value: '387', label: 'مجموعة 01' },
                    { value: '388', label: 'مجموعة 02' }
                  ]}
                />
              ])}

              {renderSection('معلومات التسجيل', [
                <FormField
                  key="date_insert"
                  label="تاريخ إيداع الملف"
                  id="date_insert"
                  type="date"
                  placeholder="تاريخ إيداع الملف"
                />,
                <FormField
                  key="date_inscription"
                  label="تاريخ التسجيل"
                  id="date_inscription"
                  type="date"
                  placeholder="تاريخ التسجيل"
                />,
                <FormField
                  key="identifient"
                  label="المعرف"
                  id="identifient"
                  placeholder="المعرف الخاص بالمترشح"
                />,
                <FormFileInput key="image" label="اختيار الصورة" id="image" />
              ])}

              {renderSection('معلومات الدفع', [
                <FormField
                  key="amount_paid"
                  label="المبلغ المدفوع"
                  id="amount_paid"
                  type="number"
                  placeholder="أدخل المبلغ المدفوع"
                  required={true}
                  value={amountPaid}
                  onChange={handleAmountPaidChange}
                />
              ])}

              <div className="flex justify-center space-x-4 mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
                >
                  حفظ
                </button>
                <button
                  type="reset"
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                  افراغ الحقول
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterNewClient
