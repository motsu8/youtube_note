'use client';

import { useEffect } from 'react';

import 'swiper/css/bundle';

import Slider from '@/components/parts/slider';
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
        <h1 className="text-3xl sm:text-5xl lg:text-7xl">YouTube Note</h1>
        <p className="text-lg sm:text-xl lg:text-3xl">
          YouTube動画を複合的なノートで学習することができます。
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-around h-3/4 items-center px-10">
        <Slider />
        <SignUpForm />
      </div>
    </div>
  );
}
