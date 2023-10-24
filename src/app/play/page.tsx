'use client';

import { Session } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

import ConfirmVideo from '@/components/confirmVideo';
import PopupContent from '@/components/parts/popupContent';
import Search from '@/components/parts/search';
import { VideoData } from '@/types/components';
import supabase from '@/utils/supabaseClient';

import Youtube from '../api/youtube';

function Play() {
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

  const checkUrl = () => /\?v=([^&]+)/.test(videoUrl);

  const submitAction = () => {
    if (!checkUrl()) {
      alert('動画が見つかりませんでした。');
      return;
    }
    Youtube.getVideoSnippet(videoUrl, setVideoData);
    setVisible(true);
  };

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-start py-8 px-5">
      <Search
        placeholder="動画URLで追加"
        setInputValue={setVideoUrl}
        setSubmitAction={submitAction}
      />
      <PopupContent visible={visible}>
        <ConfirmVideo
          videoData={videoData}
          session={session}
          setVideoData={setVideoData}
          setVisible={setVisible}
        />
      </PopupContent>
    </div>
  );
}

export default Play;
