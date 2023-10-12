'use client'

import Image from 'next/image';

import supabase from '@/utils/supabaseClient';

export default function GoogleOauth() {
  const auth = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if(data.session){
        console.log(data)
      }
    }

  return (
    <div className="shadow-lg px-3 py-1 max-w-fit rounded-lg">
      <button type="button" onClick={()=>auth()}>
        <Image src="/search.png" alt="Google icon" height={25} width={25} />
      </button>
      <button type='button' onClick={()=>{getSession()}}>getSession</button>
    </div>
  );
}
