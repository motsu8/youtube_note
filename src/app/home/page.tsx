'use client';

import React from 'react';

import GetDocument from '@/components/getDocument';
import PostDocument from '@/components/postDocument';
import Search from '@/components/search';
import Sidebar from '@/components/sidebar';
import GetSession from '@/utils/sessionComponent';
import SignOut from '@/utils/signOut';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div
        id="dashBoard"
        className="w-full flex flex-col justify-start items-center space-y-10"
      >
        <Search />
        <SignOut />
        <GetSession />
        <PostDocument />
        <GetDocument />
      </div>
    </div>
  );
}
