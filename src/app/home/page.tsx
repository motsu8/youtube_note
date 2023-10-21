'use client';

import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import ConfirmVideo from '@/components/confirmVideo';
import DrawList from '@/components/drawList';
import Search from '@/components/parts/search';
import PostDocument from '@/components/postDocument';
import { VideoData } from '@/types/components';
import GetSession from '@/utils/sessionComponent';
import SignOut from '@/utils/signOut';
import supabase from '@/utils/supabaseClient';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    })();
  }, []);

  return (
    <div
      id="dashBoard"
      className="w-full relative flex flex-col justify-start items-center space-y-10 overflow-auto h-screen"
    >
      <ConfirmVideo
        videoData={videoData}
        session={session}
        visible={visible}
        setVideoData={setVideoData}
        setVisible={setVisible}
      />
      <Search
        placeholder="動画URLで追加"
        session={session}
        setVideoUrl={setVideoUrl}
        setVideoData={setVideoData}
        setVisible={setVisible}
        videoUrl={videoUrl}
      />
      <div className="space-x-3">
        <SignOut />
        <GetSession session={session} />
      </div>
      <DrawList title="DrawList" />
      <PostDocument session={session} />
      {/* <GetDocument session={session} /> */}
    </div>
  );
}
