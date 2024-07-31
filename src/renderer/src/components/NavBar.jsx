import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUserPlus,
  faUsers,
  faLayerGroup,
  faClipboardList,
  faBook,
  faCar
} from '@fortawesome/free-solid-svg-icons'

const navItems = [
  { path: '/', icon: faHome, text: 'الصفحة الرئيسية', color: 'bg-teal-600' },
  { path: '/register', icon: faUserPlus, text: 'تسجيل عميل جديد', color: 'bg-teal-600' },
  { path: '/clients', icon: faUsers, text: 'أرشيف العملاء', color: 'bg-cyan-600' },
  { path: '/groups', icon: faLayerGroup, text: 'المجموعات', color: 'bg-purple-600' },
  { path: '/exams', icon: faClipboardList, text: 'الامتحانات', color: 'bg-yellow-600' },
  { path: '/traffic-laws', icon: faBook, text: 'قانون المرور', color: 'bg-green-600' },
  { path: '/driving-sessions', icon: faCar, text: 'حصص السياقة', color: 'bg-blue-600' }
]

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${item.color} text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${item.color.split('-')[1]} transition duration-150 ease-in-out flex items-center space-x-2 rtl:space-x-reverse`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.text}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
