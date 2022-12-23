import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

const SidebarLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen min-h-screen w-full transaction-height duration-75 ease-out bg-gray-50 dark:text-slate-100 dark:bg-black">
      <div className="hidden md:flex h-screen w-2/5 md:w-[30%] xm:w-[28%] lg:w-[25%] xl:w-[20%] flex-initial">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto pb-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
