import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubProfile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full max-w-sm bg-gray-50 dark:text-slate-100 dark:bg-gray-900 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg shadow-md p-4"
      onClick={() => navigate('/profile')}
    >
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 mt-3 rounded-full dark:border-blue-400 border-2 shadow-lg"
          src={user.profileImgUrl}
          alt="profile picture"
          referrerPolicy="no-referrer"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${user.firstName} ${user.lastName}`}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {`${user.totalFork} Forked shelves`}
        </span>
      </div>
    </div>
  );
};

export default SubProfile;
