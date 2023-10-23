'use client';

import { Session } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

import CreateContent from '@/components/createContent';
import DrawList from '@/components/drawList';
import NoteHead from '@/components/noteHead';
import Search from '@/components/parts/search';
import getSession from '@/utils/getSession';

import Library from '../api/library';

interface LibData {
  title: any;
  created_at: any;
  id: any;
  libs: any;
}

function Note() {
  // folder
  const [noteName, setNoteName] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [library, setLibrary] = useState<Library | null>(null);
  // const [libIdList, setLibIdList] = useState<string[] | null[]>([]);
  // const [libs, setLibs] = useState<Library[]>([]);
  const [drawList, setDrawList] = useState<LibData[] | null>([]);
  const [currLibId, setCurrLibId] = useState<any>(null);
  const [bread, setBread] = useState<Library[] | null>(null);

  // file
  const [drawFiles, setDrawFiles] = useState(null);
  // const [currFile, setCurrFile] = useState<string | null>(null);
  // const [lib, setLib] = useState('');

  const [visible, setVisible] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [drawDelete, setDrawDelete] = useState(false);

  // TODO ファイルごとの動的ルーティングの設定

  useEffect(() => {
    (async () => {
      // session
      let data = session;
      if (data === null) {
        data = await getSession();
        setSession(data);
      }

      // folderクライアント
      const libClient = new Library(data);
      setLibrary(libClient);

      // data fetch
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();

      // フォルダ表示
      const drawData = libClient.getDrawList(currLibId);
      setDrawList(drawData);

      // ファイル表示
      const filesList = libClient.getDrawFiles(currLibId);
      setDrawFiles(filesList);
      console.log(filesList);

      // パンくずリスト
      const breadData = libClient.getBread(currLibId);
      setBread(breadData);
    })();
  }, [currLibId, visible]);

  const filter = () => {
    console.log(session);
    alert(`${noteName}を探します`);
  };

  const setCurrent = (id: string | null) => {
    setCurrLibId(id);
  };

  const setCurrentFile = (id: string | null) => {
    setCurrFile(id);
  };

  const changeVisible = (bool: boolean) => {
    setVisible(bool);
  };

  const checkDrawDelete = () => {
    const checkList: boolean[] = [];
    document.querySelectorAll('.delete').forEach((e) => {
      if ((e as HTMLInputElement).checked) checkList.push(true);
      else checkList.push(false);
    });
    const check = checkList.some((e) => e);
    setDrawDelete(check);
  };

  const setDeleteValue = (id: string) => {
    const idList = [id, ...deleteList];
    console.log(idList);
    setDeleteList(idList);
    checkDrawDelete();
  };

  const changeDeleteValue = (id: string) => {
    const idList = deleteList.filter((ele) => ele !== id);
    console.log(idList);
    setDeleteList(idList);
    checkDrawDelete();
  };

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-start py-8 px-5">
      <Search
        placeholder="ノートを検索する"
        setInputValue={setNoteName}
        setSubmitAction={filter}
      />
      <NoteHead
        setVisible={changeVisible}
        bread={bread}
        drawDelete={drawDelete}
        setCurrLibId={setCurrent}
      />
      <DrawList
        type="note"
        title="note"
        drawList={drawList}
        files={drawFiles}
        setCurrentLibrary={setCurrent}
        setCurrFile={setCurrentFile}
        setDeleteList={setDeleteValue}
        changeDeleteList={changeDeleteValue}
      />
      <CreateContent
        setVisible={changeVisible}
        library={library}
        visible={visible}
      />
    </div>
  );
}

export default Note;
