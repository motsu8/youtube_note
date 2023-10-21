'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import SignUpForm from '@/components/signUpForm';
import getSession from '@/utils/getSession';

export default function Landing() {
  useEffect(() => {
    (async () => {
      const data = await getSession();
      if (data) window.location.href = '/home';
    })();
  }, []);

  return (
    <div className="w-full h-screen overflow-auto">
      <header id="lp-header" className="mx-2 my-10 p-3">
        <h1 className="text-7xl">YouTube Note</h1>
        <p className="text-3xl">
          YouTube動画を複合的なノートで学習することができます。
        </p>
      </header>
      <div className="flex justify-around">
        <div id="lp_content" />
        <Image
          src="/book-solid.svg"
          alt="Landing image"
          width="64"
          height="64"
        />
        <SignUpForm />
      </div>
    </div>
  );
}
