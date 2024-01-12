'use client';

import Image from 'next/image';

import supabase from '@/utils/supabaseClient';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/home';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export default function GoogleOauth() {
  const auth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL(),
      },
    });
  };

  console.log(process?.env?.NEXT_PUBLIC_SITE_URL);
  return (
    <div className="w-full border-t border-neutral pt-5 flex justify-center">
      <div className="shadow-lg px-3 py-1 max-w-fit rounded-lg bg-neutral-50">
        <button
          type="button"
          className="flex space-x-2 px-3"
          onClick={() => auth()}
        >
          <Image src="/search.png" alt="Google icon" height={25} width={25} />
          <p>Google認証</p>
        </button>
      </div>
    </div>
  );
}
