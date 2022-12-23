import React from 'react';
import { useQueryClient } from 'react-query';

import cover from '../../Assets/Images/cover.png';

// const isPublicActiveStyles =
//   'bg-red-500 dark:bg-blue-500 dark:text-gray-900 text-slate-200 font-bold p-2 rounded-full w-20 outline-none';
// const isPublicNotActiveStyles =
//   'bg-primary  mr-4 text-blue-800 font-bold p-2 rounded-full w-20 outline-none';

// const isPrivateActiveStyles =
//   'bg-red-500 dark:bg-red-500 dark:text-gray-900 text-slate-200 font-bold p-2 rounded-full w-20 outline-none';
// const isPrivateNotActiveStyles =
//   'bg-primary mr-4 text-red-800 font-bold p-2 rounded-full w-20 outline-none';

// const isForkedActiveStyles =
//   'bg-red-500 dark:bg-green-500 dark:text-gray-900 text-slate-200 font-bold p-2 rounded-full w-20 outline-none';
// const isForkedNotActiveStyles =
//   'bg-primary mr-4 text-green-800 font-bold p-2 rounded-full w-20 outline-none';

const Profile = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData('user');
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <img
        className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
        src={cover}
        alt="user-pic"
      />
      <div className="relative">
        <img
          className="w-32 h-32 rounded-full dark:border-blue-400 border-2 shadow-xl object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={user?.profileImgUrl}
          alt="profile picture"
          referrerPolicy="no-referrer"
        />
      </div>

      <h1 className="font-bold text-3xl text-center mt-24">{`${user.firstName} ${user.lastName}`}</h1>
    </div>
  );
};

export default Profile;
