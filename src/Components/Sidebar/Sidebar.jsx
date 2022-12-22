import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import * as api from '../../api';
import bookshelf from '../../Assets/Images/bookshelf.png';
import SubProfile from '../SubProfile/SubProfile';

// const isNotActiveStyle =
//   'flex items-center px-5 gap-3 text-gray-200 hover:text-gray-50 hover:font-bold transition-all duration-200 ease-in-out capitalize';
// const isActiveStyle =
//   'flex items-center px-5 gap-3 font-extrabold border-r-4 border-gray-50  transition-all duration-200 ease-in-out capitalize';

const Sidebar = () => {
  const queryClient = useQueryClient();

  const { mutate: onLoginSuccess } = useMutation(api.login, {
    onSuccess: ({ data }) => {
      localStorage.setItem('access_token', data.access_token);
      queryClient.invalidateQueries('user');
      queryClient.setQueryData('user', () => data.user);
    },
    onError: () => {
      localStorage.removeItem('access_token');
    },
  });

  const {
    data: user,
    refetch,
    isLoading: fetchingUser,
  } = useQuery('user', api.getUserDetail, {
    onError: () => {
      localStorage.removeItem('access_token');
    },
    enabled: false,
  });

  const gauthLoginHandler = async ({ credential }) => {
    localStorage.setItem('access_token', credential);
    onLoginSuccess(credential);
  };

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    queryClient.setQueryData('user', () => null);
  };

  // check if user is logged in previously
  useState(() => {
    refetch();
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 w-full flex-col justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <div className="cursor-pointer w-fit">
          <Link to="/" className="flex flex-row items-center justify-start">
            <img src={bookshelf} alt="logo" className=" h-12 w-12" />
            <p className="text-gray-700 dark:text-gray-50 text-xl font-extrabold">
              BOOKSHELF
            </p>
          </Link>
        </div>

        {/* user detail */}

        {fetchingUser ? (
          <div>Loading...</div>
        ) : user ? (
          <div>
            <SubProfile user={user} />
            {/* Accordions */}
            <div>
              {/* Bookshelves Accordion */}
              <div>
                bookshelf accordion
                <div>public</div>
                <div>private</div>
              </div>
              {/* Forkedshelves Accordion */}
              <div>forkedshelves accordion</div>
            </div>
            <button onClick={logoutHandler}>logout</button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <GoogleLogin
              onSuccess={gauthLoginHandler}
              onError={logoutHandler}
            />
          </div>
        )}

        {/* <div className="flex flex-col gap-2 mt-2">
          <SubProfile />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHomeFill />
            Dashboard
          </NavLink>

          <h3 className="mt-5 mb-2 px-5 text-base dark:text-gray-500 2xl:text-xl">
            <GiBookshelf className="inline-block mr-2" />
            BOOKSHELVES
          </h3>
          <div className="flex flex-col gap-4">
            {bookshelves
              .slice(0, bookshelves.length)
              .map((bookshelf, index) => (
                <NavLink
                  key={index}
                  to={`bookshelves/${bookshelf.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  {bookshelf.icon}
                  {bookshelf.name}
                </NavLink>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
