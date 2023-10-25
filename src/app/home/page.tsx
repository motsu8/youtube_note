'use client';

import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import PostDocument from '@/components/postDocument';
import GetSession from '@/utils/sessionComponent';
import SignOut from '@/utils/signOut';
import supabase from '@/utils/supabaseClient';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    })();
  }, []);

  return (
    <div
      id="dashBoard"
      className="w-full relative flex flex-col justify-start items-center space-y-10 overflow-auto h-screen"
    >
      <div className="space-x-3">
        <SignOut />
        <GetSession session={session} />
      </div>
      <PostDocument session={session} />
    </div>
  );
}
