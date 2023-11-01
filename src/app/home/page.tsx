'use client';

import React, { useEffect, useState } from 'react';

import DrawVideos from '@/components/drawVideos';
import JumpToNote from '@/components/parts/jumpToNote';
import PopupContent from '@/components/parts/popupContent';

import Library from '../api/library';
import { getSession } from '../api/supabase';
import Video from '../api/video';

export default function Home() {
  // client
  // const [video, setVideo] = useState<any>(null);
  const [library, setLibrary] = useState<any>(null);

  // draw DB data
  const [videoList, setVideoList] = useState<any[]>([]);
  const [drawFiles, setDrawFiles] = useState<any[]>([]);

  // toggle UI
  const [toggleJumpToNote, setToggleJumpToNote] = useState<boolean>(false);

  // util
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [relationalFiles, setRelationalFiles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      // session
      const data = await getSession();
      if (!data) window.location.href = '/';

      // client
      const videoClient = new Video(data);
      const libClient = new Library(data);
      setLibrary(libClient);
      // setVideo(videoClient);

      // data fetch
      await videoClient.fetchAllData();
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();

      // 表示データ更新
      setVideoList(videoClient.getData());
      setDrawFiles(libClient.document.getFilesRelationalVideo(null)!);
    })();
  }, []);

  const jumpTo = (fileId: string) => {
    window.location.href = `/note/${fileId}`;
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

  return (
    <div
      id="dashBoard"
      className="w-full relative flex flex-col justify-start items-center h-screen"
    >
      <div className="p-5 flex flex-col justify-start items-start w-10/12">
        <p>最近追加した動画</p>
        <div className="flex justify-around w-full">
          <DrawVideos
            videos={videoList}
            visible={0}
            id={0}
            isGrid={false}
            jumpToNote={jumpToNote}
          />
        </div>
      </div>

      <PopupContent height="h-fit" visible={toggleJumpToNote}>
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
