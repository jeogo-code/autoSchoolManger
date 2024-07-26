import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <div className="bg-cyan-600 py-6 px-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white flex items-center">
        <FontAwesomeIcon icon={faUsers} className="mr-3 text-3xl" />
        المترشحين
      </h1>
      <Link to="/register" className="btn-primary text-lg px-6 py-3">
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
        إضافة مترشح
      </Link>
    </div>
  </div>
);

export default Header;
