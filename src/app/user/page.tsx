'use client';

import React from 'react';

import Button from '@/components/parts/button';
import { BTN_DEFAULT } from '@/constants/buttonClass';

import { signOut } from '../api/supabase';

function User() {
  return (
    <div className="w-full h-screen">
      <Button
        title="ログアウト"
        setClickHandler={() => signOut()}
        className={BTN_DEFAULT}
      />
      <Button
        title="登録解除"
        setClickHandler={() => signOut()}
        className={BTN_DEFAULT}
      />
    </div>
  );
}

export default User;
