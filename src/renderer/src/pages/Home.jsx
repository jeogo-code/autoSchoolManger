import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faClipboardList,
  faLayerGroup,
  faListAlt,
  faTrafficLight,
  faCar,
  faFileAlt,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const cards = [
    {
      icon: faUsers,
      title: 'عدد المترشحين',
      subtitle: 'Number of Candidates',
      count: 0,
      color: 'teal',
      to: '/candidates'
    },
    {
      icon: faClipboardList,
      title: 'عدد الامتحانات',
      subtitle: 'Number of Exams',
      count: 0,
      color: 'cyan',
      to: '/exams'
    },
    {
      icon: faLayerGroup,
      title: 'عدد المجموعات',
      subtitle: 'Number of Groups',
      count: 0,
      color: 'purple',
      to: '/groups'
    },
    {
      icon: faListAlt,
      title: 'الامتحانات',
      subtitle: 'Exams',
      count: 0,
      color: 'yellow',
      to: '/exams'
    },
    {
      icon: faTrafficLight,
      title: 'قانون المرور',
      subtitle: 'Traffic Laws',
      count: 0,
      color: 'green',
      to: '/traffic-laws'
    },
    {
      icon: faCar,
      title: 'حصص السياقة',
      subtitle: 'Driving Sessions',
      count: 0,
      color: 'blue',
      to: '/driving-sessions'
    },
    {
      icon: faFileAlt,
      title: 'ملفات العملاء',
      subtitle: 'Client Files',
      count: 0,
      color: 'pink',
      to: '/client-files'
    },
    {
      icon: faMoneyBillWave,
      title: 'الديون',
      subtitle: 'Debts',
      count: 0,
      color: 'red',
      to: '/debts'
    }
  ]

  const buttons = [
    { to: '/register', label: 'تسجيل عميل جديد', color: 'teal' },
    { to: '/clients', label: 'أرشيف العملاء', color: 'cyan' },
    { to: '/groups', label: 'المجموعات', color: 'purple' },
    { to: '/exams', label: 'الامتحانات', color: 'yellow' },
    { to: '/traffic-laws', label: 'قانون المرور', color: 'green' },
    { to: '/driving-sessions', label: 'حصص السياقة', color: 'blue' },
    { to: '/client-files', label: 'ملفات العملاء', color: '#FFFFE0' },
    { to: '/debts', label: 'الديون', color: 'red' }
  ]

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-teal-800 mb-12 text-center">
          مرحبا بك في نظام ادارة العملاء الاحترافي
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => (
            <Link key={index} to={card.to} className="block">
              <div
                className={`p-6 bg-${card.color}-100 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105 cursor-pointer`}
              >
                <div className="shrink-0 ml-4">
                  <FontAwesomeIcon
                    icon={card.icon}
                    className={`h-12 w-12 text-${card.color}-500`}
                  />
                </div>
                <div>
                  <div className={`text-xl font-semibold text-${card.color}-900`}>{card.title}</div>
                  <p className={`text-${card.color}-700 text-sm`}>{card.subtitle}</p>
                  <span className={`block mt-1 text-2xl font-bold text-${card.color}-800`}>
                    {card.count}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">الخيارات</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((button, index) => (
              <Link key={index} to={button.to}>
                <button
                  className={`bg-${button.color}-600 text-${button.color}-100 px-6 py-3 rounded-full shadow-lg hover:bg-${button.color}-700 focus:outline-none focus:ring-2 focus:ring-${button.color}-500 focus:ring-offset-2 transition duration-150 ease-in-out`}
                >
                  {button.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
