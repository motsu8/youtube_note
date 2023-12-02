'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthForm from '@/components/authForm';
import Button from '@/components/parts/button';
import Header from '@/components/parts/LP/header';
import NoteCard from '@/components/parts/LP/noteCard';
import PopupContent from '@/components/parts/popupContent';
import { BTN_ACCENT } from '@/constants/buttonClass';
import {
  AUTH_CLOSE,
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  LP_NOTE_CARD,
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
    <div className="font-mono w-screen flex flex-col items-center">
      <Header updateVisibleAuth={updateVisibleAuth} />

      <div
        id="section-1"
        className="w-full bg-main flex justify-center shadow-sm"
      >
        <div className="w-3/4 py-40 flex justify-between">
          <div className="space-y-8">
            <div>
              <p className="text-6xl">エンジニア志向</p>
              <p className="text-6xl">ノート学習アプリ</p>
            </div>
            <p className="w-96">
              YouTube動画を見ながら、マークダウンエディタでノートを取って学習することができます。
            </p>
            <Button
              title="新規登録"
              className={BTN_ACCENT}
              setClickHandler={() => updateVisibleAuth(AUTH_SIGN_UP)}
            />
          </div>

          <Image
            src="/service.png"
            alt="サービスイメージ"
            height={400}
            width={600}
            style={{
              borderWidth: 2,
              borderRadius: 10,
              boxShadow: '1px 2px 9px #aaaaaa',
            }}
          />
        </div>
      </div>

      <div
        id="section-playlist"
        className="w-full flex flex-col justify-center items-center space-y-10 py-10 shadow-sm"
      >
        <p className="text-3xl">YouTube動画のURLで追加・検索</p>
        <Image src="/demo.gif" alt="検索イメージ" height={400} width={600} />
      </div>

      <div
        id="section-note"
        className="w-full bg-base py-10 space-y-10 flex flex-col justify-center items-center shadow-sm"
      >
        <p className="text-3xl text-white">エンジニアライクなノートを提供</p>

        <div className="w-3/4 grid grid-cols-2 gap-10">
          {LP_NOTE_CARD.map((ele) => {
            const { key, ...props } = ele;
            return <NoteCard key={key} {...props} />;
          })}
        </div>
      </div>

      <div className="w-full bg-main py-10 space-y-10 flex flex-col justify-center items-center shadow-sm">
        <p className="text-3xl">無料で始める</p>
        <Button
          title="新規登録"
          className={BTN_ACCENT}
          setClickHandler={() => updateVisibleAuth(AUTH_SIGN_UP)}
        />
      </div>

      <PopupContent visible={visibleAuth} closeFnc={closeAuth}>
        {visibleAuth === AUTH_SIGN_UP ? (
          <AuthForm type={AUTH_SIGN_UP} title="新規登録" />
        ) : (
          <AuthForm type={AUTH_SIGN_IN} title="ログイン" />
        )}
      </PopupContent>
    </div>
  );
}
