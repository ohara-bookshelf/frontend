import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
// import { GoogleLogout } from 'react-google-login';

import cover from '../../Assets/Images/cover.png';
//import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
//import { client } from '../client';
//import MasonryLayout from './MasonryLayout';
//import Spinner from '../Profile/index'

const isPublicActiveStyles =
  'bg-red-500 dark:bg-blue-500 dark:text-gray-900 text-slate-200 font-bold p-2 rounded-full w-20 outline-none';
const isPublicNotActiveStyles =
  'bg-primary  mr-4 text-blue-800 font-bold p-2 rounded-full w-20 outline-none';

const isPrivateActiveStyles =
  'bg-red-500 dark:bg-red-500 dark:text-gray-900 text-slate-200 font-bold p-2 rounded-full w-20 outline-none';
const isPrivateNotActiveStyles =
  'bg-primary mr-4 text-red-800 font-bold p-2 rounded-full w-20 outline-none';

const isForkedActiveStyles =
  'bg-red-500 dark:bg-green-500 dark:text-gray-900 text-slate-200 font-bold p-2 rounded-full w-20 outline-none';
const isForkedNotActiveStyles =
  'bg-primary mr-4 text-green-800 font-bold p-2 rounded-full w-20 outline-none';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;

const Profile = () => {
  //const [user, setUser] = useState();
  const [bookshelves, setBookshelves] = useState();
  const [type, setType] = useState('Private');
  const [activeBtn, setActiveBtn] = useState('private');
  const navigate = useNavigate();
  const { userId } = useParams();

  const user =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  //Get random image from unsplash
  /*const randomImage = `https://source.unsplash.com/random/1920x1080?sig=${Math.floor(Math.random() * 100)}`;
  console.log(randomImage);*/

  // useEffect(() => {
  //   const query = userQuery(userId);
  //   client.fetch(query).then((data) => {
  //     setUser(data[0]);
  //   });
  // }, [userId]);

  // useEffect(() => {
  //   if (text === 'Created') {
  //     const createdPinsQuery = userCreatedPinsQuery(userId);

  //     client.fetch(createdPinsQuery).then((data) => {
  //       setPins(data);
  //     });
  //   } else {
  //     const savedPinsQuery = userSavedPinsQuery(userId);

  //     client.fetch(savedPinsQuery).then((data) => {
  //       setPins(data);
  //     });
  //   }
  // }, [text, userId]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.clear();
    navigate('/login');
  };

  //if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              className=' w-full h-370 2xl:h-510 shadow-lg object-cover'
              src={cover}
              alt='user-pic'
            />
            <input
              type='image'
              className='w-32 h-32 rounded-full -mt-14 dark:border-blue-400 border-2 shadow-xl object-cover'
              img='true'
              src={user?.imageUrl}
              alt='profile picture'
            />
          </div>
          <h1 className='font-bold text-3xl text-center mt-3'>{user?.name}</h1>
          <div className='absolute top-0 z-1 right-0 p-2'>
            {/* {userId === user?.sub && (
              <GoogleLogout
                clientId={CLIENT_ID}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )} */}
          </div>
        </div>
        <div className='text-center mb-7'>
          <button
            type='button'
            onClick={(e) => {
              setType(e.target.textContent);
              setActiveBtn('private');
            }}
            className={`${
              activeBtn === 'private'
                ? isPrivateActiveStyles
                : isPrivateNotActiveStyles
            }`}
          >
            Private
          </button>
          <button
            type='button'
            onClick={(e) => {
              setType(e.target.textContent);
              setActiveBtn('public');
            }}
            className={`${
              activeBtn === 'public'
                ? isPublicActiveStyles
                : isPublicNotActiveStyles
            }`}
          >
            Public
          </button>
          <button
            type='button'
            onClick={(e) => {
              setType(e.target.textContent);
              setActiveBtn('forked');
            }}
            className={`${
              activeBtn === 'forked'
                ? isForkedActiveStyles
                : isForkedNotActiveStyles
            }`}
          >
            Forked
          </button>
        </div>

        {/* {<div className="px-2">
          <MasonryLayout pins={pins} />
        </div>} */}

        {/* {pins?.length === 0 && (
        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No Pins Found!
        </div>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
