'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthForm from '@/components/authForm';
import AuthSection from '@/components/parts/LP/authSection';
import CenterSection from '@/components/parts/LP/centerSection';
import EntrySection from '@/components/parts/LP/entrySection';
import Header from '@/components/parts/LP/header';
import NoteSection from '@/components/parts/LP/noteSection';
import StartStep from '@/components/parts/LP/startStep';
import TitleSection from '@/components/parts/LP/titleSection';
import PopupContent from '@/components/parts/popupContent';
import ScrollRevealContainer from '@/components/parts/scrollRevealContainer';
import {
  AUTH_CLOSE,
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  IMAGE,
  LP_DATABASE,
  LP_PLAYLIST,
} from '@/constants/lp';

import { getSession } from './api/supabase';

export default function Landing() {
  const router = useRouter();
  const [visibleAuth, setVisibleAuth] = useState(AUTH_CLOSE);

  useEffect(() => {
    // セッション取得
    const getSessionData = async () => {
      const data = await getSession();
      if (data) router.push('/home');
    };

    getSessionData();
  }, []);

  const updateVisibleAuth = (type: string) => {
    setVisibleAuth(type);
  };

  const closeAuth = () => setVisibleAuth(AUTH_CLOSE);

  return (
    <div className="relative flex flex-col items-center">
      <Header updateVisibleAuth={updateVisibleAuth} />

      <div className="w-full h-[800px] flex justify-center relative">
        <TitleSection visibleFnc={updateVisibleAuth} />
      </div>

      <CenterSection
        id="section-playlist"
        textObj={LP_PLAYLIST}
        imgObj={IMAGE.playlist}
      />

      <NoteSection />

      <CenterSection
        id="section-database"
        textObj={LP_DATABASE}
        imgObj={IMAGE.database}
      />

      <AuthSection />

      <StartStep />

      <div className="w-full bg-base text-white">
        <ScrollRevealContainer className="w-full py-20 space-y-10 flex flex-col justify-center items-center shadow-sm h-full">
          <EntrySection visibleFnc={updateVisibleAuth} />
        </ScrollRevealContainer>
      </div>

      <PopupContent
        visible={visibleAuth}
        closeFnc={closeAuth}
        height="h-1/2"
        width="w-1/3"
      >
        {visibleAuth === AUTH_SIGN_UP ? (
          <AuthForm type={AUTH_SIGN_UP} title="新規登録" />
        ) : (
          <AuthForm type={AUTH_SIGN_IN} title="ログイン" />
        )}
      </PopupContent>
    </div>
  );
}
