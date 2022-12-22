import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useQuery, useQueryClient } from 'react-query';

import SubProfile from '../SubProfile/SubProfile';
import logo from '../../Assets/Images/bookshelf.png';
import * as api from '../../api';

const Sidebar = () => {
  const queryClient = useQueryClient();
  const keyId = useId();

  const {
    data: user,
    refetch: refetchUser,
    isLoading: fetchingUser,
  } = useQuery('user', api.getUserDetail, {
    onError: () => {
      localStorage.removeItem('access_token');
    },
  });

  const onLoginSuccess = async ({ credential }) => {
    localStorage.setItem('access_token', credential);

    try {
      const { data } = await api.login();

      localStorage.setItem('access_token', data.access_token);
      refetchUser();
    } catch (error) {
      localStorage.removeItem('access_token');
      queryClient.setQueryData('user', () => null);
    }
  };

  const onLoginFailed = () => {
    localStorage.removeItem('access_token');
    queryClient.setQueryData('user', () => null);
  };

  // check if user is logged in previously
  useState(() => {
    refetchUser();
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 w-full flex-col justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <div className="cursor-pointer w-fit">
          <Link to="/" className="flex flex-row items-center justify-start">
            <img src={logo} alt="logo" className=" h-12 w-12" />
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
              {/* Extracting bookshelf visibility */}
              {user.bookshelves ? (
                Object.keys(user.bookshelves).map((visibility) => (
                  <div key={keyId}>
                    <h3 className="text-rose-600">{visibility} Bookshelves</h3>
                    {user.bookshelves[visibility].map((bookshelf) => (
                      <ul key={bookshelf.id}>
                        <li>{bookshelf.name}</li>
                      </ul>
                    ))}
                  </div>
                ))
              ) : (
                <p>No bookshelves</p>
              )}
              {/* Forkedshelves Accordion */}
              <div>
                <h3 className="text-rose-600">Forked Bookshelves</h3>
                {user.forkedshelves.length ? (
                  user.forkedShelves.map((forkedShelf) => (
                    <ul key={forkedShelf.id}>
                      <li>{forkedShelf.name}</li>
                    </ul>
                  ))
                ) : (
                  <p>No forked shelves</p>
                )}
              </div>
            </div>
            <button onClick={onLoginFailed}>logout</button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailed} />
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
