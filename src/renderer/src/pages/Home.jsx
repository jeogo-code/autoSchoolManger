import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faClipboardList,
  faLayerGroup,
  faListAlt,
  faTrafficLight,
  faCar
} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-teal-800 mb-12 text-center">
          مرحبا بك في نظام ادارة العملاء الاحترافي
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <div className="shrink-0 ml-4">
              <FontAwesomeIcon icon={faUsers} className="h-16 w-16 text-teal-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-teal-900">عدد المترشحين</div>
              <p className="text-teal-700">Number of Candidates</p>
              <span className="block mt-1 text-3xl text-teal-800">0</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <div className="shrink-0 ml-4">
              <FontAwesomeIcon icon={faClipboardList} className="h-16 w-16 text-cyan-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-teal-900">عدد الامتحانات</div>
              <p className="text-teal-700">Number of Exams</p>
              <span className="block mt-1 text-3xl text-teal-800">0</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <div className="shrink-0 ml-4">
              <FontAwesomeIcon icon={faLayerGroup} className="h-16 w-16 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-teal-900">عدد المجموعات</div>
              <p className="text-teal-700">Number of Groups</p>
              <span className="block mt-1 text-3xl text-teal-800">0</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <div className="shrink-0 ml-4">
              <FontAwesomeIcon icon={faListAlt} className="h-16 w-16 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-teal-900">الامتحانات</div>
              <p className="text-teal-700">Exams</p>
              <span className="block mt-1 text-3xl text-teal-800">0</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <div className="shrink-0 ml-4">
              <FontAwesomeIcon icon={faTrafficLight} className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-teal-900">قانون المرور</div>
              <p className="text-teal-700">Traffic Laws</p>
              <span className="block mt-1 text-3xl text-teal-800">0</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <div className="shrink-0 ml-4">
              <FontAwesomeIcon icon={faCar} className="h-16 w-16 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-teal-900">حصص السياقة</div>
              <p className="text-teal-700">Driving Sessions</p>
              <span className="block mt-1 text-3xl text-teal-800">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">الخيارات</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <button className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                تسجيل عميل جديد
              </button>
            </Link>
            <Link to="/clients">
              <button className="bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                أرشيف العملاء
              </button>
            </Link>
            <Link to="/groups">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                المجموعات
              </button>
            </Link>
            <Link to="/exams">
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                الامتحانات
              </button>
            </Link>
            <Link to="/traffic-laws">
              <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                قانون المرور
              </button>
            </Link>
            <Link to="/driving-sessions">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                حصص السياقة
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
