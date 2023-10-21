'use client';

import { Session } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

import DrawList from '@/components/drawList';
import NoteHead from '@/components/noteHead';
import Search from '@/components/parts/search';
import getSession from '@/utils/getSession';

import Library from '../api/library';

function Note() {
  const [noteName, setNoteName] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [library, setLibrary] = useState<Library | null>(null);
  const [drawList, setDrawList] = useState<{ title: string }[] | null>([]);

  const [lib, setLib] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getSession();
      setSession(data);
      const client = new Library(data);
      setLibrary(client);
      const list = await client.getAllData();
      setDrawList(list);
    })();
  }, []);

  const filter = () => {
    console.log(session);
    alert(`${noteName}を探します`);
  };

  const postLib = () => {
    library?.insertData(lib);
  };

  return (
    <div className="w-10/12 flex flex-col items-center justify-start py-8 px-5">
      <NoteHead />
      <Search
        placeholder="ノートを検索する"
        setInputValue={setNoteName}
        setSubmitAction={filter}
      />
      <DrawList type="note" title="note" drawList={drawList} />
      <Search
        placeholder="lib title"
        setInputValue={setLib}
        setSubmitAction={postLib}
      />
    </div>
  );
}

export default Note;
