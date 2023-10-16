'use client';

import React from 'react';

import getSession from '@/utils/getSession';
import supabase from '@/utils/supabaseClient';

const createData = async (title: string, content: string) => {
  const session = await getSession();
  const { data } = await supabase
    .from('Document')
    .insert([{ title, content, user_id: session!.user.id }])
    .select();
  console.log(data);
};

function PostDocument() {
  const title = document.getElementById('title') as HTMLInputElement;
  const content = document.getElementById('content') as HTMLInputElement;

  return (
    <div className="bg-slate-200 w-1/2 p-2 space-x-3 space-y-2">
      <p>Post Document</p>
      <input type="text" id="title" placeholder="title" />
      <input type="text" id="content" placeholder="content" />
      <button
        type="button"
        className="bg-red-200 py-1 px-2 rounded-md shadow-lg"
        onClick={() => createData(title.value, content.value)}
      >
        作成
      </button>
    </div>
  );
}

export default PostDocument;
