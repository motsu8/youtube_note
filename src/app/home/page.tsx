'use client'

import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import DrawList from '@/components/drawList';
// import GetDocument from '@/components/getDocument';
import PostDocument from '@/components/postDocument';
import Search from '@/components/search';
import getSession from '@/utils/getSession';
import GetSession from '@/utils/sessionComponent';
import SignOut from '@/utils/signOut';
import YoutubeApi from '@/utils/youtubeApi';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    (async () => {
      const data = await getSession();
      setSession(data.session)
    })();
  }, [])

  return (
    <div
      id="dashBoard"
      className="w-full flex flex-col justify-start items-center space-y-10 overflow-auto h-screen"
    >
      <Search />
      <div className="space-x-3">
        <SignOut />
        <GetSession session={session} />
        <YoutubeApi session={session} />
      </div>
      <DrawList title="DrawList" />
      <PostDocument session={session} />
      {/* <GetDocument session={session} /> */}
    </div>
  );
}
