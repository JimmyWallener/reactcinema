import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Footer from '../Footer';
import Logo from './Logo';

const Layout = () => {
  const { loggedInUser, setLoggedInUser } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    return new Promise<void>((res) => {
      setLoggedInUser({ logged: false, id: '' });
      res();
      navigate('/');
    });
  };

  return (
    <>
      <nav className='w-full h-20 bg-gray-900 flex items-center'>
        <Logo />
        <ul className='ml-10 w-full h-20 p-4 flex justify-start items-end list-none'>
          <NavLink
            to='/movies'
            className={({ isActive }) =>
              isActive
                ? 'text-white border-b-2 border-white mr-4'
                : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-white mr-4'
            }
          >
            <li>Movies</li>
          </NavLink>
          <NavLink
            to='/addMovie'
            className={({ isActive }) =>
              isActive
                ? 'text-white border-b-2 border-white mr-4'
                : 'text-gray-300 hover:text-white mr-4 hover:border-b-2 hover:border-white'
            }
          >
            <li>Add Movie</li>
          </NavLink>
        </ul>
        {loggedInUser.logged ? (
          <div className='mr-4'>
            <button
              className='hover:bg-red-400 w-36 bg-red-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={() => logout()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className='mr-4'>
            <Link to='/login'>
              <button
                className='hover:bg-slate-500 w-36 bg-slate-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Sign In
              </button>
            </Link>
          </div>
        )}
      </nav>
      <main className='overflow-x-hidden'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
