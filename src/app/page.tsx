'use client'

import Image from 'next/image';
import { useEffect } from 'react';

import Sidebar from '@/components/sidebar';
import SignUpForm from '@/components/signUpForm';
import supabase from '@/utils/supabaseClient';


export default function Landing() {

  useEffect(()=>{
    const getSession = async() =>{
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        window.location.href = '/home'
        console.log(data)
      }
    }
    getSession()
  },[])


  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
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
    </div>
  );
}
