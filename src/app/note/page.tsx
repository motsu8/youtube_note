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

interface DocData {
  title: any;
  created_at: any;
  id: any;
  content: any;
  lib_id: any;
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
  const [drawFiles, setDrawFiles] = useState<DocData[]>([]);
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
  // const [lib, setLib] = useState('');
  const [currFile, setCurrFile] = useState('');

  const [visible, setVisible] = useState(false);
  const [deleteFolderList, setDeleteFolderList] = useState<string[]>([]);
  const [drawDelete, setDrawDelete] = useState(false);

  // TODO ファイルごとの動的ルーティングの設定
  console.log(currFile);

  const updateDraw = (libClient: Library, id: string) => {
    // フォルダ表示
    const drawData = libClient.getDrawList(id);
    setDrawList(drawData!);

    // ファイル表示
    const filesList = libClient.getDrawFiles(id);
    setDrawFiles(filesList!);
    console.log(filesList);

    // パンくずリスト
    const breadData = libClient.getBread(id);
    setBread(breadData);
  };

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

      updateDraw(libClient, currLibId);
    })();
  }, []);

  const filter = () => {
    console.log(session);
    alert(`${noteName}を探します`);
  };

  const setCurrent = (id: string | null) => {
    setCurrLibId(id);
    updateDraw(library!, id!);
  };

  const setCurrentFile = (id: string | null) => {
    setCurrFile(id!);
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

  const setDeleteFile = (id: string) => {
    const idList = [id, ...deleteFiles];
    setDeleteFiles(idList);
    checkDrawDelete();
  };

  const changeDeleteFile = (id: string) => {
    const idList = deleteFiles.filter((ele) => ele !== id);
    setDeleteFiles(idList);
    checkDrawDelete();
  };

  const setDeleteFolder = (id: string) => {
    const idList = [id, ...deleteFolderList];
    setDeleteFolderList(idList);
    checkDrawDelete();
  };

  const changeDeleteValue = (id: string) => {
    const idList = deleteFolderList.filter((ele) => ele !== id);
    console.log(idList);
    setDeleteFolderList(idList);
    checkDrawDelete();
  };

  const deleteFileAction = async () => {
    if (deleteFiles.length === 0) return;
    await library!.document.delete(deleteFiles);
    const drawData = library?.getDrawFiles(currLibId);
    setDrawFiles(drawData!);
    const list: string[] = [];
    setDeleteFolderList(list);
    setDrawDelete(false);
  };

  const deleteFolderAction = async () => {
    if (deleteFolderList.length === 0) return;
    await library!.delete(deleteFolderList);
    const drawData = library?.getDrawList(currLibId);
    setDrawList(drawData!);
    const list: string[] = [];
    setDeleteFolderList(list);
    setDrawDelete(false);
  };

  const setDraw = (data: LibData[] | DocData[], type: string) => {
    if (type === 'folder') setDrawList(data as LibData[]);
    else setDrawFiles(data as DocData[]);
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
        deleteFolderAction={deleteFolderAction}
        deleteFileAction={deleteFileAction}
      />
      <DrawList
        type="note"
        title="note"
        drawList={drawList}
        files={drawFiles}
        setCurrentLibrary={setCurrent}
        setCurrFile={setCurrentFile}
        setDeleteList={setDeleteFolder}
        changeDeleteList={changeDeleteValue}
        setDeleteFile={setDeleteFile}
        changeDeleteFile={changeDeleteFile}
      />
      <CreateContent
        setVisible={changeVisible}
        setDrawList={setDraw}
        currLibId={currLibId}
        library={library}
        visible={visible}
      />
    </div>
  );
}

export default Note;
