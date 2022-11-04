import { useLocation, useNavigate } from 'react-router-dom';
import defaultLogo from '../assets/rdc-logo-default.svg';

export default function Header() {
  // Get the current page path from (location.path: string)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check to see if the current route matches the value given
  // Used for conditional formating of routes
  const matchRoute = (route: string): boolean => {
    if (route == pathname) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <button onClick={() => navigate('/')}>
            <img src={defaultLogo} alt="Realtor.com Full Logo" className="h-6 cursor-pointer" />
          </button>
        </div>
        <nav>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                matchRoute('/') && 'text-black border-b-red-500'
              }`}
            >
              <button onClick={() => navigate('/')}>Home</button>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                matchRoute('/offers') && 'text-black border-b-red-500'
              }`}
            >
              <button onClick={() => navigate('/offers')}>Offers</button>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                matchRoute('/sign-in') && 'text-black border-b-red-500'
              }`}
            >
              <button onClick={() => navigate('/sign-in')}>Sign In</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
