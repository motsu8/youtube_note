'use client';

import React from 'react';

import DrawList from '@/components/drawList';
import GetDocument from '@/components/getDocument';
import PostDocument from '@/components/postDocument';
import Search from '@/components/search';
import GetSession from '@/utils/sessionComponent';
import SignOut from '@/utils/signOut';

export default function Home() {
  return (
    <div
      id="dashBoard"
      className="w-full flex flex-col justify-start items-center space-y-10"
    >
      <Search />
      <div className="space-x-3">
        <SignOut />
        <GetSession />
      </div>
      <DrawList title="DrawList" />
      <PostDocument />
      <GetDocument />
    </div>
  );
}
