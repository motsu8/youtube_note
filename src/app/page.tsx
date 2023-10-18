'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import SignUpForm from '@/components/signUpForm';
import getSession from '@/utils/getSession';

export default function Landing() {
  useEffect(() => {
    const session = async () => {
      const data = await getSession();
      if (data.session) {
        window.location.href = '/home';
        console.log(data.session);
      }
    };
    session();
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
        <div>
          <Image
            src="/book-solid.svg"
            alt="Landing image"
            width="64"
            height="64"
          />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
