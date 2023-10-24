'use client';

import { useEffect, useState } from 'react';

import './markdown.css';

import Library from '@/app/api/library';
import NoteDetail from '@/components/noteDetail';
import Breadcrumb from '@/components/parts/breadcrumb';
import Button from '@/components/parts/button';
import ConfirmJump from '@/components/parts/confirmJump';
import PopupContent from '@/components/parts/popupContent';
import getSession from '@/utils/getSession';

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

export default function Page({ params }: { params: { slug: string } }) {
  const [library, setLibrary] = useState<Library | null>(null);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [bread, setBread] = useState<(LibData | DocData)[]>([]);
  const [content, setContent] = useState('');
  const [pageJump, setPageJump] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getSession();

      // folderクライアント
      const libClient = new Library(data);
      setLibrary(libClient);

      // data fetch
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();

      // 現在の記事
      const file: DocData | undefined = libClient.document.getFile(params.slug);
      if (file?.content !== null) setContent(file?.content);
      setCurrentFile(file);

      // パンくずリスト
      const breadData = libClient.getBread(file?.lib_id);
      breadData.push(file);
      setBread(breadData);
    })();
  }, []);

  const jumpLink = () => {
    window.location.href = '/note';
  };

  const playVideo = () => {
    alert('play video');
  };

  const saveContent = () => {
    library?.document.updateContent(currentFile.id, content);
    alert('save');
  };

  const updateContent = (str: string) => {
    setContent(str);
    console.log(str);
  };

  const popup = () => {
    setPageJump(true);
  };

  const noSaveClose = () => {
    setPageJump(false);
    jumpLink();
  };

  const saveClose = () => {
    setPageJump(false);
    saveContent();
    jumpLink();
  };

  const videoBtnClass = [
    'bg-rose-300',
    'hove:bg-rose-100',
    'rounded-lg',
    'shadow-lg',
    'py-2',
    'px-3',
    'flex',
    'items-center',
    'justify-center',
  ];

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-start pt-8 px-5">
      <PopupContent visible={pageJump}>
        <ConfirmJump close={noSaveClose} jumpLink={saveClose} />
      </PopupContent>
      <div className="w-11/12 h-1/12 flex items-center justify-between py-5">
        <Breadcrumb bread={bread} setCurrLibId={popup} />
        <Button
          title="動画再生"
          setClickHandler={playVideo}
          className={videoBtnClass}
        />
      </div>
      <NoteDetail
        content={content}
        updateContent={updateContent}
        saveContent={saveContent}
      />
    </div>
  );
}
