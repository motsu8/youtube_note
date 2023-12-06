'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthForm from '@/components/authForm';
import Button from '@/components/parts/button';
import Header from '@/components/parts/LP/header';
import NoteSection from '@/components/parts/LP/noteSection';
import PlaylistSection from '@/components/parts/LP/playlistSection';
import TitleSection from '@/components/parts/LP/titleSection';
import PopupContent from '@/components/parts/popupContent';
import ScrollRevealContainer from '@/components/parts/scrollRevealCotainer';
import { BTN_ACCENT } from '@/constants/buttonClass';
import {
  AUTH_CLOSE,
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
} from '@/constants/lp';

import { getSession } from './api/supabase';
import EntrySection from '@/components/parts/LP/entrySection';

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

      <ScrollRevealContainer>
        <TitleSection visibleFnc={updateVisibleAuth}/>
      </ScrollRevealContainer>

      <ScrollRevealContainer>
        <PlaylistSection />
      </ScrollRevealContainer>

      <ScrollRevealContainer>
        <NoteSection />
      </ScrollRevealContainer>

      <ScrollRevealContainer>
        <EntrySection visibleFnc={updateVisibleAuth}/>
      </ScrollRevealContainer>

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
