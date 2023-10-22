'use client';

import { Session } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

import DrawList from '@/components/drawList';
import NoteHead from '@/components/noteHead';
import Search from '@/components/parts/search';
import getSession from '@/utils/getSession';

import Library from '../api/library';

function Note() {
  // folder
  const [noteName, setNoteName] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [library, setLibrary] = useState<Library | null>(null);
  const [libIdList, setLibIdList] = useState<string[] | null[]>([]);
  const [libs, setLibs] = useState<Library[]>([]);
  const [drawList, setDrawList] = useState<{ title: string }[] | null>([]);
  const [currLibId, setCurrLibId] = useState<string | null>(null);
  const [bread, setBread] = useState<Library[] | null>([]);

  // file
  const [files, setFiles] = useState(null);
  const [currFile, setCurrFile] = useState<string | null>(null);
  // const [lib, setLib] = useState('');

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
      // 過去に適用していない場合、インスタンス作成
      if (!libIdList.includes(currLibId)) {
        libClient = new Library(data);
        libClient.setParent(library);
        setLibs([libClient, ...libs]);
        setLibrary(libClient);
        setLibIdList([currLibId, ...libIdList]);
      } // 過去に適用した場合、インスタンス参照
      else {
        libClient = libs.find((ele) => ele.id === currLibId);
      }

      // 表示フォルダリスト
      const libList = await libClient.fetchData(currLibId);
      const filesList = await libClient.getFiles();
      setFiles(filesList);
      setDrawList(libList);

      // パンくずリスト
      const list: Library[] = [];
      const breadList = libClient.getBread(list, libClient);
      console.log(breadList);
      setBread(breadList);
    })();
  }, [currLibId]);

  const filter = () => {
    console.log(session);
    alert(`${noteName}を探します`);
  };

  const setCurrent = (id: string | null) => {
    setCurrLibId(id);
  };

  const setCurrentFile = (id: string | null) => {
    setCurrFile(id);
    console.log(currFile);
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
        files={files}
        setCurrentLibrary={setCurrent}
        setCurrFile={setCurrentFile}
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
