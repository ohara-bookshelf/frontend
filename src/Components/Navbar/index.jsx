import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  //Get the value of the search input
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex gap-2 md:gap-5 mx-4 mt-5 pb-7">
      <div className="flex justify-start mx-3 items-center w-full px-2 rounded-md bg-white dark:bg-gray-900 border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white dark:bg-gray-900 outline-none"
        />
      </div>
      <div className="flex gap-3 ">
        <Link to={`profile/${user?._id}`} className="hidden md:block">
          <input
            type="image"
            className="w-14 h-14 rounded-full dark:border-red-400 border-2 shadow-lg"
            // img="true"
            src={user?.imageUrl}
            alt="profile picture"
          />
        </Link>
        <Link
          to="/create"
          className="bg-black dark:bg-green-500 text-white rounded-lg w-16 h-11 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
