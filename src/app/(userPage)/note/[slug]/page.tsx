'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './markdown.css';

import Library from '@/app/api/library';
import { getSession } from '@/app/api/supabase';
import Video from '@/app/api/video';
import Youtube from '@/app/api/youtube';
import NoteDetail from '@/components/noteDetail';
import Breadcrumb from '@/components/parts/breadcrumb';
import Button from '@/components/parts/button';
import ConfirmJump from '@/components/parts/confirmJump';
import PopupContent from '@/components/parts/popupContent';
import RelationVideo from '@/components/parts/relationVideo';
import YouTube from '@/components/parts/youtubeVideo';
import { BTN_ACCENT } from '@/constants/buttonClass';

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
  video_id: any;
}

export default function Page({ params }: { params: { slug: string } }) {
  // client
  const [library, setLibrary] = useState<Library | null>(null);
  const [video, setVideo] = useState<Video | null>(null);

  // props
  const [currentFile, setCurrentFile] = useState<any>(null);

  const [bread, setBread] = useState<(LibData | DocData)[]>([]);
  const [content, setContent] = useState('');
  const [markdownString, setMarkdownString] = useState('');
  const [pageJump, setPageJump] = useState(false);
  const [popRelation, setPopRelation] = useState(false);
  const [play, setPlay] = useState(false);
  const [relationDocList, setRelationDocList] = useState<any[]>([]);
  const [videoParams, setVideoParams] = useState<string>('');

  // router
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getSession();
      if (!data) router.push('/');

      // folderクライアント
      const libClient = new Library(data);
      setLibrary(libClient);

      // videoクライアント
      const videoClient = new Video(data);
      setVideo(videoClient);

      // data fetch
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();
      await videoClient.fetchAllData();

      // 現在の記事
      const file: DocData | undefined = libClient.document.getFile(params.slug);
      if (file?.content !== null) setContent(file?.content);
      setCurrentFile(file);

      // 記事に参照されている動画
      if (file!.video_id) {
        const videoData = videoClient.getData(file!.video_id);
        const temp = Youtube.getVideoParams(videoData.url);
        setVideoParams(temp!);
      }

      // パンくずリスト
      const breadData = libClient.getBread(file?.lib_id);
      setBread(breadData);
    })();
  }, []);

  const jumpLink = () => {
    router.push('/note');
  };

  const saveToast = () => toast('保存しました!');

  const saveContent = () => {
    library?.document.updateContent(currentFile.id, content);
    saveToast();
  };

  const updateContent = (str: string) => {
    setContent(str);
  };

  const popup = () => setPageJump(true);

  const closePopUp = () => setPageJump(false);

  const noSaveClose = () => {
    setPageJump(false);
    jumpLink();
  };

  const saveClose = () => {
    setPageJump(false);
    saveContent();
    setTimeout(() => {
      jumpLink();
    }, 2500);
  };

  const updateMarkdownString = () => {
    setMarkdownString(content);
  };

  const playVideo = () => {
    // videoの参照がない場合、
    if (currentFile.video_id === null) {
      const drawList = video!.getRelationDocument(null);
      setRelationDocList(drawList!);
      setPopRelation(true);
      return;
    }
    // videoの参照がある場合、
    setPlay(!play);
  };

  const updatePopRelation = (bool: boolean) => setPopRelation(bool);
  const closePopRelation = () => updatePopRelation(false);

  const relationAction = async (videoId: string) => {
    await library?.document.relateVideo(currentFile.id, videoId);
    const updateCurrentFile = library?.document.getFile(currentFile.id);
    setCurrentFile(updateCurrentFile);

    const dbVideoId = updateCurrentFile?.video_id;
    const newVideoData = video!.getData(dbVideoId);
    const videoParamId = Youtube.getVideoParams(newVideoData.url);
    setVideoParams(videoParamId!);

    setPopRelation(false);
    setPlay(!play);
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-start px-5">
      <ToastContainer
        progressClassName="bg-base"
        autoClose={1000}
        theme="colored"
      />
      <PopupContent
        visible={pageJump}
        closeFnc={closePopUp}
        height="h-auto"
        width="w-auto"
      >
        <ConfirmJump close={noSaveClose} jumpLink={saveClose} />
      </PopupContent>

      <div className="w-11/12 h-min flex items-center justify-between py-5">
        <Breadcrumb bread={bread} setCurrLibId={popup} />
        {currentFile ? (
          <p className="text-xl font-bold">{currentFile.title}</p>
        ) : (
          <p className="text-xl">loading...</p>
        )}
        <Button
          title={play ? '動画を隠す' : '動画を表示'}
          setClickHandler={playVideo}
          className={BTN_ACCENT}
        />
      </div>
      <PopupContent
        visible={popRelation}
        closeFnc={closePopRelation}
        height="h-auto"
        width="w-auto"
      >
        <RelationVideo
          videos={relationDocList}
          closeAction={updatePopRelation}
          relationAction={relationAction}
        />
      </PopupContent>

      <div
        className={`w-full h-full ${
          play ? 'grid grid-cols-3 items-center' : 'flex'
        }`}
      >
        <YouTube videoId={videoParams} play={play} />
        <NoteDetail
          content={content}
          updateContent={updateContent}
          saveContent={saveContent}
          markdownString={markdownString}
          updateMarkdownString={updateMarkdownString}
        />
      </div>
    </div>
  );
}
