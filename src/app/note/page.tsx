'use client';

import React, { useState } from 'react';

import DrawList from '@/components/drawList';
import NoteHead from '@/components/noteHead';
import Search from '@/components/parts/search';

function Note() {
  const [noteName, setNoteName] = useState('');

  const filter = () => {
    alert(`${noteName}を探します`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start py-8">
      <NoteHead />
      <Search
        placeholder="ノートを検索する"
        setInputValue={setNoteName}
        setSubmitAction={filter}
      />
      <DrawList />
    </div>
  );
}

export default Note;
