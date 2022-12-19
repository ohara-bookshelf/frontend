import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Create, Detail } from '../../Bookshelf/index';

import { Search, Navbar, Feed } from '../../index';

const Home = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  //handle the error setSearchTerm is not  a function

  return (
    <div className="px-2 md:px-5 dark:text-gray-100 ">
      <div className="">
        <Navbar
          searchItem={searchTerm}
          setSearchItem={setSearchTerm}
          user={user && user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<Create user={user} />} />
          <Route path="/detail/:bookshelfId" element={<Detail user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
