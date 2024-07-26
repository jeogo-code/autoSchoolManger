import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="container mx-auto flex justify-around items-center">
        <Link to="/" className="text-teal-800 text-lg font-bold hover:underline">
          الصفحة الرئيسية
        </Link>
        <Link
          to="/register"
          className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          تسجيل عميل جديد
        </Link>
        <Link
          to="/clients"
          className="bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          أرشيف العملاء
        </Link>
        <Link
          to="/groups"
          className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          المجموعات
        </Link>
        <Link
          to="/exams"
          className="bg-yellow-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          الامتحانات
        </Link>
        <Link
          to="/traffic-laws"
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          قانون المرور
        </Link>
        <Link
          to="/driving-sessions"
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          حصص السياقة
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
