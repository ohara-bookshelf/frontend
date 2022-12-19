import React from 'react';
import { Link } from 'react-router-dom';

const SubProfile = ({ user }) => {
  return (
    <div className="w-full max-w-sm bg-gray-50 dark:text-slate-100 dark:bg-gray-900">
      <div className="flex flex-col items-center pb-10">
        <Link to={`profile/${user?.googleId}`}>
          <input
            type="image"
            className="w-24 h-24 mb-3 mt-3 rounded-full dark:border-blue-400 border-2 shadow-lg"
            // img="true"
            src={user?.imageUrl}
            alt="profile picture"
          />
        </Link>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          2.2k Forked shelves
        </span>
      </div>
    </div>
  );
};

export default SubProfile;
