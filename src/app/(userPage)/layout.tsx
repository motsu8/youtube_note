import React from 'react';

import Sidebar from '@/components/sidebar';
import UserHeader from '@/components/user/header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <UserHeader />
      <div className="flex flex-col md:flex-row pt-16 h-full ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

export default layout;
