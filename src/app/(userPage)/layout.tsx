import React from 'react';

// import Header from '@/components/parts/LP/header';
import Sidebar from '@/components/sidebar';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header />  */}
      <div>
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default layout;
