'use client';

import React, { useState } from 'react';

import Document from '@/app/api/document';
import { SupabaseSession } from '@/types/components';

function PostDocument({session}:SupabaseSession) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const document = new Document(session!);

  return (
    <div className="bg-slate-200 w-11/12 p-2 space-x-3 space-y-2">
      <p>Post Document</p>
      <input
        type="text"
        id="title"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        id="content"
        placeholder="content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="bg-red-200 py-1 px-2 rounded-md shadow-lg"
        onClick={() => document.postDocument(title, content)}
      >
        作成
      </button>
    </div>
  );
}

export default PostDocument;
