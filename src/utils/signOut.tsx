'use client';

import React from 'react';

import supabase from './supabaseClient';

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('サインアウトできませんでした！！');
    return;
  }

  window.location.href = '/';
};

function SignOut() {
  return (
    <button
      type="button"
      className="hover:bg-slate-100"
      onClick={() => signOut()}
    >
      signOut
    </button>
  );
}

export default SignOut;
