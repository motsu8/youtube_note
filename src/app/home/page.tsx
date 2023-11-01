'use client';

import React, { useEffect, useState } from 'react';

import ConfirmVideo from '@/components/confirmVideo';
import DrawVideos from '@/components/drawVideos';
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
  const [drawPlayList, setDrawPlayList] = useState<any[]>([]);

  // toggle UI
  const [toggleJumpToNote, setToggleJumpToNote] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // util
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [relationalFiles, setRelationalFiles] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  const updateDraw = (vClient: Video, pClient: Playlist, lClient: Library) => {
    const drawVideos = vClient.getData();
    setVideoList(drawVideos);

    const drawPlayLists = pClient.getData();
    setDrawPlayList(drawPlayLists);

    const noRelationalFiles = lClient.document.getFilesRelationalVideo(null);
    setDrawFiles(noRelationalFiles!);
  };

  useEffect(() => {
    (async () => {
      // session
      const data = await getSession();
      if (!data) window.location.href = '/';

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
      console.log(alreadyVideo);
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

  console.log(drawPlayList);

  return (
    <div
      id="dashBoard"
      className="w-full relative flex flex-col justify-start items-center h-screen"
    >
      {/* 検索窓 */}
      <Search
        placeholder="動画URLで追加"
        setInputValue={setVideoUrl}
        setSubmitAction={submitAction}
      />
      <PopupContent height="h-3/4" visible={visible}>
        <ConfirmVideo
          videoData={videoData}
          setVideoData={setVideoData}
          setVisible={setVisible}
          addVideo={addVideo}
        />
      </PopupContent>

      {/* 動画リスト */}
      <div className="p-5 flex flex-col justify-start items-start w-10/12 border-b-2  border-b-zinc-200">
        <p className="mb-3">最近追加した動画</p>
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
