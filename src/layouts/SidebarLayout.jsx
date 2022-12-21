import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

const SidebarLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen min-h-screen w-full transaction-height duration-75 ease-out bg-gray-50 dark:text-slate-100 dark:bg-black">
      <div className="hidden md:flex h-screen w-2/5 md:w-[30%] xm:w-[28%] lg:w-[25%] xl:w-[20%] flex-initial">
        <Sidebar />
      </div>

      {/* TODO: Remove this sidebar below and create one responsive sidebar */}

      {/* <div className="flex flex-col md:hidden">
         <div className="flex flex-row justify-between bg-gray-800 shadow-xl w-full p-2">
          <HiMenu
            className="cursor-pointer text-gray-700 dark:text-gray-200"
            fontSize={40}
            onClick={() => {
              setToggleSidebar(true);
            }}
          />

          <Link to="/" className="flex flex-row items-center">
            <img src={logo} alt="logo" className="h-12 w-12 ml-2" />
            <span className="text-gray-700 dark:text-gray-50 text-xl font-extrabold">
              BOOKSHELF
            </span>
          </Link>

          <Link to={`profile/${user?.googleId}`}>
            <input
              type="image"
              className="w-10 h-10 rounded-full ml-2 dark:border-blue-400 border-2"
              // img="true"
              src={user?.imageUrl}
              alt="profile picture"
            />
          </Link>
        </div> 
      </div> 

      {toggleSidebar && (
        <div className="fixed w-[80%] max-w-[320px] md:max-w-500 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <Sidebar closeToggle={setToggleSidebar} />
        </div>
      )} */}

      <div className="flex flex-col flex-1 overflow-y-auto pb-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
