'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Button from '@/components/parts/button';
import { BTN_DEFAULT } from '@/constants/buttonClass';

import { deleteUser, getSession, signOut } from '../api/supabase';

function User() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const data = await getSession();
      setSession(data);
      if (!data) router.push('/');
    };

    getData();
  }, []);

  return (
    <div className="w-full h-screen flex space-x-10 justify-center items-center">
      <Button
        title="サインアウト"
        setClickHandler={() => signOut()}
        className={BTN_DEFAULT}
      />
      <Button
        title="登録解除"
        setClickHandler={() => deleteUser(session.user.id)}
        className={BTN_DEFAULT}
      />
    </div>
  );
}

export default User;
