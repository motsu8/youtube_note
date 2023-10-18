'use client'

import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import DrawList from '@/components/drawList';
// import GetDocument from '@/components/getDocument';
import Search from '@/components/parts/search';
import PostDocument from '@/components/postDocument';
import GetSession from '@/utils/sessionComponent';
import SignOut from '@/utils/signOut';
import supabase from '@/utils/supabaseClient';
import YoutubeApi from '@/utils/youtubeApi';

import Video from '../api/video';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session)
    })();
  }, [])

  const videoClient = new Video(session);

  return (
    <div
      id="dashBoard"
      className="w-full flex flex-col justify-start items-center space-y-10 overflow-auto h-screen"
    >
      <Search placeholder='動画URLで追加' session={session} />
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
