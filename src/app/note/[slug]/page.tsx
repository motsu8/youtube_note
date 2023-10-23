'use client';

import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import Library from '@/app/api/library';
import NoteDetail from '@/components/noteDetail';
import Breadcrumb from '@/components/parts/breadcrumb';
import Button from '@/components/parts/button';
import getSession from '@/utils/getSession';

export default function Page({ params }: { params: { slug: string } }) {
  const [session, setSession] = useState<Session | null>(null);
  const [library, setLibrary] = useState<Library | null>(null);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [bread, setBread] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getSession();
      setSession(data);

      // folderクライアント
      const libClient = new Library(data);
      setLibrary(libClient);

      // data fetch
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();

      // 現在の記事
      const file = libClient.document.getFile(params.slug);
      setCurrentFile(file);

      // パンくずリスト
      const breadData = libClient.getBread(file?.lib_id);
      breadData.push(file);
      setBread(breadData);
    })();
  }, []);

  console.log(session);
  console.log(library);
  console.log(currentFile);

  const setLink = () => {
    window.location.href = '/note';
  };

  const playVideo = () => {
    alert('play video');
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
      <div className="w-11/12 h-1/12 flex items-center justify-between py-5">
        <Breadcrumb bread={bread} setCurrLibId={setLink} />
        <Button
          title="動画再生"
          setClickHandler={playVideo}
          className={videoBtnClass}
        />
      </div>
      <NoteDetail />
    </div>
  );
}
