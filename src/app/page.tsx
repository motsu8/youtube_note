'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import SignUpForm from '@/components/signUpForm';

import { getSession } from './api/supabase';

export default function Landing() {
  useEffect(() => {
    (async () => {
      const data = await getSession();
      if (data) window.location.href = '/home';
    })();
  }, []);
  return (
    <div className="w-full h-screen overflow-auto">
      <div id="lp-header" className="mx-2 p-10 h-1/6">
        <h1 className="text-7xl">YouTube Note</h1>
        <p className="text-3xl">
          YouTube動画を複合的なノートで学習することができます。
        </p>
      </div>
      <div className="flex justify-around h-5/6 items-center">
        <Image
          className="rounded-2xl shadow-lg border-2"
          src="/service.png"
          alt="Landing image"
          width={960}
          height={540}
        />
        <SignUpForm />
      </div>
    </div>
  );
}
