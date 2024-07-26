import { useState } from 'react'
import FormField from '../components/RegisterComponents/FormField'
import FormCheckbox from '../components/RegisterComponents/FormCheckbox'
import FormFileInput from '../components/RegisterComponents/FormFileInput'
import NavBar from '../components/NavBar'

const RegisterNewClient = () => {
  const [showSuccessDate, setShowSuccessDate] = useState(false)

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-br from-teal-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <NavBar />
        <div className="bg-teal-600 py-6">
          <h1 className="text-3xl font-bold text-white text-center">تسجيل عميل جديد</h1>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">معلومات المترشح</h2>
          <form className="space-y-8">
            {/* Personal Information */}
            <div>
              <div className="bg-teal-600 py-6">
                <h3 className="text-3xl font-bold text-white text-center">المعلومات الشخصية</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="السيد(ة)"
                  id="gender"
                  type="select"
                  options={[
                    { value: '1', label: 'السيد' },
                    { value: '2', label: 'السيدة' },
                    { value: '3', label: 'الأنسة' }
                  ]}
                />
                <FormField label="الإسم" id="prenom" placeholder="الإسم" />
                <FormField label="الإسم باللاتينية" id="prenom_fr" placeholder="Prenom" />
                <FormField label="اللقب" id="nom" placeholder="اللقب" />
                <FormField label="اللقب باللاتينية" id="nom_fr" placeholder="Nom" />
                <FormField
                  label="تاريخ الميلاد"
                  id="date_naissance"
                  type="date"
                  placeholder="تاريخ الميلاد"
                />
                <div className="col-span-2">
                  <FormCheckbox label="تاريخ ميلاد غير معروف" id="unknown_birth_date" />
                </div>
                <FormField label="مكان الميلاد" id="place_naissance" placeholder="مكان الميلاد" />
                <FormField
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
                />
                <FormField
                  label="رقم بطاقة التعريف"
                  id="id_card_number"
                  placeholder="رقم بطاقة التعريف"
                />
              </div>
            </div>

            {/* Family Information */}
            <div>
              <div className="bg-teal-600 py-6">
                <h3 className="text-3xl font-bold text-white text-center"> المعلومات العائلية </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField label="إسم الأب" id="nom_pere" placeholder="إسم الأب" />
                <FormField label="إسم الأم" id="prenom_mere" placeholder="إسم الأم" />
                <FormField label="لقب الأم" id="nom_mere" placeholder="لقب الأم" />
                <FormField
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
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-teal-600 py-6">
                <h3 className="text-3xl font-bold text-white text-center"> معلومات الاتصال</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField label="رقم الهاتف" id="phone" placeholder="رقم الهاتف" />
                <FormField label="الجنسية" id="nationalite" placeholder="الجزائرية" />
                <FormField label="العنوان" id="adresse" placeholder="العنوان" />
                <FormField label="بلدية التسجيل" id="baladiya_tasjil" placeholder="بلدية التسجيل" />
                <FormField label="بلدية الإقامة" id="baladiya_ikama" placeholder="بلدية الإقامة" />
              </div>
            </div>

            {/* License Information */}
            <div>
              <div className="bg-teal-600 py-6">
                <h3 className="text-3xl font-bold text-white text-center"> معلومات الرخصة</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
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
                />
                <FormField
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
                <FormField
                  label="البرنامج"
                  id="program_id"
                  type="select"
                  options={[
                    { value: '', label: 'إختر البرنامج' },
                    { value: '344', label: 'عادي 30000دج' },
                    { value: '345', label: 'مميز 40000دج' }
                  ]}
                />
              </div>
            </div>

            {/* Registration Information */}
            <div>
              <div className="bg-teal-600 py-6">
                <h3 className="text-3xl font-bold text-white text-center"> معلومات التسجيل</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="تاريخ إيداع الملف"
                  id="date_insert"
                  type="date"
                  placeholder="تاريخ إيداع الملف"
                />
                {showSuccessDate && (
                  <FormField
                    label="تاريخ النجاح"
                    id="date_success"
                    type="date"
                    placeholder="تاريخ النجاح"
                  />
                )}
                <FormField
                  label="تاريخ التسجيل"
                  id="date_inscription"
                  type="date"
                  placeholder="تاريخ التسجيل"
                />
                <FormField label="المعرف" id="identifient" placeholder="المعرف الخاص بالمترشح" />
                <div className="col-span-2">
                  <FormFileInput label="اختيار الصورة" id="image" />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
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
  )
}

export default RegisterNewClient
