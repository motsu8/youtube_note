'use client'

import Image from 'next/image';

import supabase from '@/utils/supabaseClient';

export default function GoogleOauth() {
  const auth = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="shadow-lg px-3 py-1 max-w-fit rounded-lg">
      <button type="button" onClick={()=>auth()}>
        <Image src="/search.png" alt="Google icon" height={25} width={25} />
      </button>
    </div>
  );
}
