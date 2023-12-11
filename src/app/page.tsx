'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthForm from '@/components/authForm';
import EntrySection from '@/components/parts/LP/entrySection';
import Header from '@/components/parts/LP/header';
import NoteSection from '@/components/parts/LP/noteSection';
import PlaylistSection from '@/components/parts/LP/playlistSection';
import TitleSection from '@/components/parts/LP/titleSection';
import PopupContent from '@/components/parts/popupContent';
import ScrollRevealContainer from '@/components/parts/scrollRevealContainer';
import { AUTH_CLOSE, AUTH_SIGN_IN, AUTH_SIGN_UP } from '@/constants/lp';

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

      <div className="w-full h-screen flex justify-center relative">
        <div className="w-full h-full bg-wave" />
        <TitleSection visibleFnc={updateVisibleAuth} />
        <div className="px-10 absolute top-2/3 -translate-y-1/2 lg:-translate-y-2/3 lg:left-1/2 lg:-translate-x-1/3">
          <Image
            src="/YouTube_Note.gif"
            alt="サービスイメージ"
            className="skew-y-[5deg]"
            height={350}
            width={900}
            style={{
              borderTopWidth: 5,
              borderRightWidth: 7,
              borderRadius: 10,
              boxShadow: '10px 15px 15px #888888',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      <ScrollRevealContainer>
        <PlaylistSection />
      </ScrollRevealContainer>

      <div className="w-full h-3/4 bg-base">
        <NoteSection />
      </div>

      <div className="w-full bg-main">
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
