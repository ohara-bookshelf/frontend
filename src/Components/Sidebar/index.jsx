import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';

import { BiLogOut } from 'react-icons/bi';

import { GiBookshelf } from 'react-icons/gi';

import { bookshelves } from '../../Utils/data';

import bookshelf from '../../Assets/Images/bookshelf.png';
import SubProfile from '../SubProfile/index';

import { useParams, useNavigate } from 'react-router-dom';
// import { GoogleLogout } from 'react-google-login';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-200 hover:text-gray-50 hover:font-bold transition-all duration-200 ease-in-out capitalize';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-4 border-gray-50  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ user, closeToggle }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  //Logout the current user
  const handleLogout = () => {
    localStorage.clear();
    //Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className='flex bg-gray-100 dark:bg-gray-900 w-full flex-col justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <div className='cursor-pointer w-fit'>
          <Link
            to='/'
            onClick={handleCloseSidebar}
            className='flex flex-row items-center justify-start'
          >
            <img src={bookshelf} alt='logo' className=' h-12 w-12' />
            <p className='text-gray-700 dark:text-gray-50 text-xl font-extrabold'>
              BOOKSHELF
            </p>
          </Link>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <SubProfile user={user} />
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Dashboard
          </NavLink>

          <h3 className='mt-5 mb-2 px-5 text-base dark:text-gray-500 2xl:text-xl'>
            <GiBookshelf className='inline-block mr-2' />
            BOOKSHELVES
          </h3>
          <div className='flex flex-col gap-4'>
            {bookshelves
              .slice(0, bookshelves.length)
              .map((bookshelf, index) => (
                <NavLink
                  key={index}
                  to={`bookshelves/${bookshelf.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                  onClick={handleCloseSidebar}
                >
                  {bookshelf.icon}
                  {bookshelf.name}
                </NavLink>
              ))}
          </div>
        </div>
      </div>

      {/* {userId === user?.sub && (
          <GoogleLogout
            clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}
            render={(renderProps) => (
              
              <button
                type="button"
                className='flex flex-row my-5 items-center justify-start px-5 py-2 gap-3 text-red-400 hover:text-red-600 hover:font-bold transition-all duration-200 ease-in-out capitalize'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <BiLogOut />
                {user?.name}
              </button>
            )}
            onLogoutSuccess={handleLogout}
            cookiePolicy="single_host_origin"
          />
        )}  */}
    </div>
  );
};

export default Sidebar;
