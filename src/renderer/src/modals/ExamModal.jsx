import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrashAlt, faUserPlus, faSearch, faClock } from '@fortawesome/free-solid-svg-icons'

const ExamModal = ({ exam, onClose, onSave, groups, clients, exams }) => {
  const [type, setType] = useState(exam ? exam.type : '')
  const [date, setDate] = useState(exam ? exam.date : '')
  const [currentGroup, setCurrentGroup] = useState(exam ? exam.groupId : '')
  const [selectedClients, setSelectedClients] = useState(
    exam ? [{ id: exam.clientId, time: exam.time, status: exam.status }] : []
  )
  const [availableClients, setAvailableClients] = useState([])
  const [unifiedTime, setUnifiedTime] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    filterAvailableClients()
  }, [currentGroup, clients, searchQuery, selectedClients])

  const filterAvailableClients = () => {
    let filteredClients = clients.filter(
      (client) =>
        !selectedClients.some((selected) => selected.id === client.id) &&
        (client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    if (currentGroup) {
      filteredClients = filteredClients.filter(
        (client) => client.groupId === parseInt(currentGroup)
      )
    }

    setAvailableClients(filteredClients)
  }

  const handleGroupChange = (e) => {
    setCurrentGroup(e.target.value)
    setSearchQuery('')
  }

  const handleAddClient = (clientId) => {
    const client = clients.find((c) => c.id === clientId)
    if (client && !selectedClients.some((selected) => selected.id === clientId)) {
      setSelectedClients([...selectedClients, { id: clientId, time: '', status: 'غير محدد' }])
    }
  }

  const handleRemoveClient = (clientId) => {
    setSelectedClients(selectedClients.filter((client) => client.id !== clientId))
  }

  const handleApplyTimeToAll = () => {
    setSelectedClients((prevSelectedClients) =>
      prevSelectedClients.map((client) => ({ ...client, time: unifiedTime }))
    )
  }

  const handleClientTimeChange = (clientId, time) => {
    setSelectedClients((prevSelectedClients) =>
      prevSelectedClients.map((client) => (client.id === clientId ? { ...client, time } : client))
    )
  }

  const handleClientStatusChange = (clientId, status) => {
    setSelectedClients((prevSelectedClients) =>
      prevSelectedClients.map((client) => (client.id === clientId ? { ...client, status } : client))
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const examData = {
      date,
      type,
      groupId: currentGroup ? parseInt(currentGroup) : null,
      clients: selectedClients.map((client) => ({ ...client }))
    }

    const isDuplicate = exams.some(
      (ex) =>
        selectedClients.some((client) => ex.clientId === client.id) &&
        ex.date === examData.date &&
        ex.type === examData.type &&
        (!exam || ex.id !== exam.id)
    )

    if (isDuplicate) {
      setErrorMessage('المترشح مسجل بالفعل في هذا النوع من الامتحان في هذا التاريخ.')
      return
    }

    onSave(examData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl p-8 m-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {exam ? 'تعديل الامتحان' : 'إضافة امتحان'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition duration-150"
            aria-label="إغلاق"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              id="type"
              label="نوع الامتحان"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={!!exam}
            >
              <option value="">اختر نوع الامتحان</option>
              <option value="قانون المرور">قانون المرور</option>
              <option value="مناورات">مناورات</option>
              <option value="سياقة">سياقة</option>
            </FormField>
            <FormField
              id="date"
              label="تاريخ"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <FormField
              id="group"
              label="المجموعة"
              value={currentGroup}
              onChange={handleGroupChange}
              disabled={!!exam}
            >
              <option value="">اختر مجموعة</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </FormField>
            <div>
              <label
                htmlFor="unifiedTime"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                الوقت الموحد
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="time"
                  id="unifiedTime"
                  value={unifiedTime}
                  onChange={(e) => setUnifiedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleApplyTimeToAll}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center"
                >
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  تطبيق للجميع
                </button>
              </div>
            </div>
          </div>

          {errorMessage && <AlertMessage type="error" message={errorMessage} />}

          {!exam && (
            <ClientSearchSection
              currentGroup={currentGroup}
              groups={groups}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              availableClients={availableClients}
              handleAddClient={handleAddClient}
            />
          )}

          <SelectedClientsTable
            selectedClients={selectedClients}
            clients={clients}
            groups={groups}
            handleClientTimeChange={handleClientTimeChange}
            handleClientStatusChange={handleClientStatusChange}
            handleRemoveClient={handleRemoveClient}
            exam={exam}
          />

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const FormField = ({ id, label, type = 'select', value, onChange, disabled, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    {type === 'select' ? (
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        required
        disabled={disabled}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        required
      />
    )}
  </div>
)

const AlertMessage = ({ type, message }) => (
  <div
    className={`${
      type === 'error'
        ? 'bg-red-100 border-red-400 text-red-700'
        : 'bg-yellow-100 border-yellow-400 text-yellow-700'
    } px-4 py-3 rounded relative mb-4`}
    role="alert"
  >
    <strong className="font-bold">{type === 'error' ? 'خطأ! ' : 'تنبيه! '}</strong>
    <span className="block sm:inline">{message}</span>
  </div>
)

const ClientSearchSection = ({
  currentGroup,
  groups,
  searchQuery,
  setSearchQuery,
  availableClients,
  handleAddClient
}) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">إضافة مترشح</h3>
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 font-medium">المجموعة المحددة:</span>
        <span className="text-yellow-600 font-bold">
          {currentGroup ? groups.find((g) => g.id === parseInt(currentGroup))?.name : 'غير محدد'}
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="بحث عن مترشح..."
        />
        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
      </div>
      <div className="bg-white rounded-lg shadow-md max-h-60 overflow-y-auto">
        {availableClients.length > 0 ? (
          availableClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAddClient(client.id)}
            >
              <div>
                <p className="font-semibold text-gray-800">{`${client.firstName} ${client.lastName}`}</p>
                <p className="text-sm text-gray-600">
                  {groups.find((g) => g.id === client.groupId)?.name || 'بدون مجموعة'}
                </p>
              </div>
              <button
                type="button"
                className="bg-yellow-600 text-white p-2 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">لا يوجد مترشحون متاحون</p>
        )}
      </div>
    </div>
  </div>
)

const SelectedClientsTable = ({
  selectedClients,
  clients,
  groups,
  handleClientTimeChange,
  handleClientStatusChange,
  handleRemoveClient,
  exam
}) => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">المترشحون المختارون</h3>
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-yellow-600 text-white">
          <tr>
            <th className="px-6 py-3 text-right">ID</th>
            <th className="px-6 py-3 text-right">اسم المترشح</th>
            <th className="px-6 py-3 text-right">المجموعة</th>
            <th className="px-6 py-3 text-right">الوقت</th>
            <th className="px-6 py-3 text-right">الحالة</th>
            <th className="px-6 py-3 text-right">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {selectedClients.length > 0 ? (
            selectedClients.map((client) => {
              const clientData = clients.find((c) => c.id === client.id)
              const group = groups.find((g) => g.id === clientData.groupId)
              return (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">{client.id}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{`${clientData.firstName} ${clientData.lastName}`}</td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {group ? group.name : 'غير محدد'}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <input
                      type="time"
                      value={client.time}
                      onChange={(e) => handleClientTimeChange(client.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <select
                      value={client.status}
                      onChange={(e) => handleClientStatusChange(client.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="غير محدد">غير محدد</option>
                      <option value="ناجح">ناجح</option>
                      <option value="يعيد">يعيد</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <button
                      onClick={() => handleRemoveClient(client.id)}
                      className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                      disabled={!!exam}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-8">
                <div role="alert" className="text-gray-500">
                  <h2 className="text-xl font-semibold">لا يوجد مترشحون</h2>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)

export default ExamModal
