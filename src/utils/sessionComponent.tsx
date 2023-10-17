'use client';

import React from 'react';

import Document from '@/app/api/document';
import { SupabaseSession } from '@/types/components';

function GetSession({ session }: SupabaseSession) {
  const doc = new Document();

  const getData = () => {
    console.log(doc);
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
