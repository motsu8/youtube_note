'use client';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import ConfirmVideo from '@/components/confirmVideo';
import DrawVideos from '@/components/drawVideos';
import IconButton from '@/components/parts/iconButton';
import JumpToNote from '@/components/parts/jumpToNote';
import PopupContent from '@/components/parts/popupContent';
import Search from '@/components/parts/search';
import { VideoData } from '@/types/components';

import Library from '../api/library';
import Playlist from '../api/playlist';
import { getSession } from '../api/supabase';
import Video from '../api/video';
import Youtube from '../api/youtube';

export default function Home() {
  // client
  const [video, setVideo] = useState<any>(null);
  const [library, setLibrary] = useState<any>(null);
  const [playlist, setPlaylist] = useState<any>(null);

  // draw DB data
  const [videoList, setVideoList] = useState<any[]>([]);
  const [drawFiles, setDrawFiles] = useState<any[]>([]);

  // toggle UI
  const [toggleJumpToNote, setToggleJumpToNote] = useState<boolean>(false);
  const updateToggleJumpToNote = (bool: boolean) => setToggleJumpToNote(bool);
  const closeToggleJumpToNote = () => updateToggleJumpToNote(false);

  const [visible, setVisible] = useState<boolean>(false);
  const updateVisible = (bool: boolean) => setVisible(bool);
  const closeVideo = () => updateVisible(false);

  // util
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [relationalFiles, setRelationalFiles] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  // router
  const router = useRouter();

  const updateDraw = (vClient: Video, pClient: Playlist, lClient: Library) => {
    const drawVideos = vClient.getNewData();
    setVideoList(drawVideos!);

    const noRelationalFiles = lClient.document.getFilesRelationalVideo(null);
    setDrawFiles(noRelationalFiles!);
  };

  useEffect(() => {
    (async () => {
      // session
      const data = await getSession();
      if (!data) router.push('/');

      // client
      const videoClient = new Video(data);
      const libClient = new Library(data);
      const playlistClient = new Playlist(data);
      setLibrary(libClient);
      setVideo(videoClient);
      setPlaylist(playlistClient);

      // data fetch
      await videoClient.fetchAllData();
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();

      updateDraw(videoClient, playlistClient, libClient);
    })();
  }, []);

  const jumpTo = (fileId?: string) => {
    if (fileId === undefined) {
      router.push('/play');
      return;
    }
    router.push(`/note/${fileId}`);
  };

  const jumpToNote = (videoId: string) => {
    setCurrentVideoId(videoId);
    const files = library?.document.getFilesRelationalVideo(videoId);
    setRelationalFiles(files!);
    if (files?.length === 1) {
      jumpTo(files[0].id);
      return;
    }
    setToggleJumpToNote(true);
  };

  /**
   * DBでの連携（動画 - ノート）
   * @param fileId
   */
  const relateNote = async (fileId: string) => {
    await library?.document.relateVideo(fileId, currentVideoId);
  };

  const checkValidUrl = () => /\?v=([^&]+)/.test(videoUrl);

  const submitAction = () => {
    // nullの場合、全表示
    if (!videoUrl) {
      updateDraw(video!, playlist!, library!);
      return;
    }
    // URLが有効か
    if (!checkValidUrl()) {
      alert('動画が見つかりませんでした。');
      return;
    }
    // 既に保存済み
    if (video?.contain(videoUrl)) {
      const alreadyVideo = video.getUrlData(videoUrl);
      setVideoList([alreadyVideo]);
      return;
    }
    Youtube.getVideoSnippet(videoUrl, setVideoData);
    setVisible(true);
  };

  const addVideo = async () => {
    if (video?.contain(videoData!.url)) {
      alert('既に保存しています。');
      return;
    }
    await video!.insertVideo(videoData!);
    updateDraw(video!, playlist!, library!);
  };

  const bgClass = [
    'flex',
    'justify-center',
    'items-center',
    'space-x-1',
    'bg-neutral-100',
    'hover:bg-neutral-200',
    'px-2',
    'rounded',
  ];

  const jumpToNotePage = () => {
    jumpTo();
  };

  return (
    <div
      id="dashBoard"
      className="w-full h-screen relative flex flex-col justify-start items-center overflow-auto"
    >
      {/* 検索窓 */}
      <Search
        placeholder="動画URLで追加"
        setInputValue={setVideoUrl}
        setSubmitAction={submitAction}
      />
      <PopupContent
        visible={visible}
        closeFnc={closeVideo}
        height="h-1/2"
        width="w-1/3"
      >
        <ConfirmVideo
          videoData={videoData}
          setVideoData={setVideoData}
          setVisible={setVisible}
          addVideo={addVideo}
        />
      </PopupContent>

      {/* 動画リスト */}
      <div className="p-5 flex flex-col justify-around items-start w-11/12 h-2/5 border-b-2 border-b-zinc-200">
        <div className="flex space-x-2 m-3">
          <p className="text-lg">最近追加した動画</p>
          <IconButton
            icon={faPlay}
            title="すべて見る"
            bgClass={bgClass}
            color="#ffbbbb"
            iconClass="h-[15px]"
            setClickHandler={jumpToNotePage}
          />
        </div>
        <DrawVideos
          videos={videoList}
          visible={0}
          id={0}
          isGrid={false}
          jumpToNote={jumpToNote}
        />
      </div>

      <PopupContent
        visible={toggleJumpToNote}
        closeFnc={closeToggleJumpToNote}
        width="w-1/3"
        height="h-1/4"
      >
        <JumpToNote
          jumpTo={jumpTo}
          relateNote={relateNote}
          files={drawFiles}
          relationalFiles={relationalFiles}
          setClose={setToggleJumpToNote}
        />
      </PopupContent>
    </div>
  );
}
