'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { getSession } from '@/app/api/supabase';
import CreateContent from '@/components/createContent';
import DrawList from '@/components/drawList';
import NoteHead from '@/components/noteHead';
import PopupContent from '@/components/parts/popupContent';
import Search from '@/components/parts/search';

import Library from '../../api/library';

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
  const [library, setLibrary] = useState<Library | null>(null);
  const [drawList, setDrawList] = useState<LibData[] | null>([]);
  const [currLibId, setCurrLibId] = useState<any>(null);
  const [bread, setBread] = useState<Library[] | null>(null);

  // file
  const [drawFiles, setDrawFiles] = useState<DocData[]>([]);
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);

  const [visible, setVisible] = useState(false);
  const [deleteFolderList, setDeleteFolderList] = useState<string[]>([]);
  const [drawDelete, setDrawDelete] = useState(false);

  const [message, setMessage] = useState('');

  // router
  const router = useRouter();

  const updateDraw = (libClient: Library, id: string | null) => {
    // フォルダ表示
    const drawData = libClient.getDrawList(id!);
    setDrawList(drawData!);

    // ファイル表示
    const filesList = libClient.getDrawFiles(id);
    setDrawFiles(filesList!);

    // パンくずリスト
    const breadData = libClient.getBread(id);
    setBread(breadData);
  };

  const searchData = () => {
    const draw = library!.search(noteName);
    setDrawList(draw!);

    const temp = library?.document.search(noteName);
    setDrawFiles(temp!);

    setMessage('');
    if (!draw?.length && !temp?.length) {
      setMessage('コンテンツがありません。');
    }
  };

  useEffect(() => {
    (async () => {
      // session
      const data = await getSession();
      if (!data) router.push('/');

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
    // args[noteName]
    searchData();
  };

  const setCurrent = (id: string | null) => {
    setCurrLibId(id);
    updateDraw(library!, id!);
  };

  const updateVisible = (bool: boolean) => setVisible(bool);
  const closeVisible = () => updateVisible(false);

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

    updateDraw(library!, null);
  };

  const deleteFolderAction = async () => {
    if (deleteFolderList.length === 0) return;
    await library!.delete(deleteFolderList);
    const drawData = library?.getDrawList(currLibId);
    setDrawList(drawData!);
    const list: string[] = [];
    setDeleteFolderList(list);
    setDrawDelete(false);

    updateDraw(library!, null);
  };

  const setDraw = (data: LibData[] | DocData[], type: string) => {
    if (type === 'folder') setDrawList(data as LibData[]);
    else setDrawFiles(data as DocData[]);
  };

  const setInputValue = (name: string) => {
    setNoteName(name);
    searchData();
  };

  return (
    <div className="w-full h-9/10 relative flex flex-col items-center justify-start py-8 px-5">
      <Search
        placeholder="ノートを検索する"
        setInputValue={setInputValue}
        setSubmitAction={filter}
      />
      <NoteHead
        setVisible={updateVisible}
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
        setDeleteList={setDeleteFolder}
        changeDeleteList={changeDeleteValue}
        setDeleteFile={setDeleteFile}
        changeDeleteFile={changeDeleteFile}
        message={message}
      />

      <PopupContent
        visible={visible}
        closeFnc={closeVisible}
        height="h-auto"
        width="w-1/3"
      >
        <CreateContent
          setVisible={updateVisible}
          setDrawList={setDraw}
          currLibId={currLibId}
          library={library}
        />
      </PopupContent>
    </div>
  );
}

export default Note;
