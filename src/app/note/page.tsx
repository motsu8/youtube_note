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
  const [libIdList, setLibIdList] = useState<string[] | null[]>([]);
  const [libs, setLibs] = useState<Library[]>([]);
  const [drawList, setDrawList] = useState<{ title: string }[] | null>([]);
  const [currLibId, setCurrLibId] = useState<string | null>(null);
  const [bread, setBread] = useState<string[] | null>([]);

  // const [lib, setLib] = useState('');

  // 初回
  useEffect(() => {
    (async () => {
      // session
      let data = session;
      if (data === null) {
        data = await getSession();
        setSession(data);
      }

      // Libraryインスタンス
      let libClient: Library;
      // 過去に適用していない場合
      if (!libIdList.includes(currLibId)) {
        libClient = new Library(data);
        libClient.setParent(library);
        setLibrary(libClient);
        setLibs([libClient, ...libs]);
        setLibIdList([currLibId, ...libIdList]);
        console.log('new');
      } // 過去に適用した場合
      else {
        libClient = libs.filter((ele) => ele.id === currLibId).pop();
        console.log('past');
      }

      // 表示フォルダリスト
      const libList = await libClient!.getData(currLibId);
      // libList?.forEach(ele=>{
      //   const client = new Library(data);
      //   client.setParent(library);
      //   setLibs([client, ...libs]);
      //   setLibIdList([ele.id, libIdList]);
      // })
      setDrawList(libList);

      // パンくずリスト
      const list: string[] = [];
      const breadList = libClient.getBread(list, libClient);
      setBread(breadList);
    })();
  }, [currLibId]);

  const filter = () => {
    console.log(session);
    alert(`${noteName}を探します`);
  };

  // const postLib = () => {
  //   library?.insertData(lib);
  // };

  const setCurrent = (id: string) => {
    setCurrLibId(id);
    // console.log(`change id: ${id}`)
  };

  return (
    <div className="w-10/12 flex flex-col items-center justify-start py-8 px-5">
      <Search
        placeholder="ノートを検索する"
        setInputValue={setNoteName}
        setSubmitAction={filter}
      />
      <NoteHead bread={bread} setCurrLibId={setCurrent} />
      <DrawList
        type="note"
        title="note"
        drawList={drawList}
        setCurrLibId={setCurrent}
      />
      {/* <Search
        placeholder="lib title"
        setInputValue={setLib}
        setSubmitAction={postLib}
      /> */}
    </div>
  );
}

export default Note;
