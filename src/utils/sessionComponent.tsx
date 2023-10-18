'use client';

import React from 'react';

import { SupabaseSession } from '@/types/components';

function GetSession({ session }: SupabaseSession) {
  const getData = () => {
    console.log(session);
  };

  return (
    <button
      type="button"
      className="hover:bg-slate-100"
      onClick={() => {
        getData();
      }}
    >
      getSession
    </button>
  );
}

export default GetSession;
