'use client';

import React, { useState, useEffect } from 'react';

import { getSession } from '@/app/api/supabase';
import ConfirmVideo from '@/components/confirmVideo';
import CreatePlaylist from '@/components/createPlaylist';
import DrawVideos from '@/components/drawVideos';
import JumpToNote from '@/components/parts/jumpToNote';
import PopupContent from '@/components/parts/popupContent';
import Search from '@/components/parts/search';
import PlayTab from '@/components/playTab';
import { VideoData } from '@/types/components';

import Library from '../api/library';
import Playlist from '../api/playlist';
import Video from '../api/video';
import Youtube from '../api/youtube';

function Play() {
  // client
  const [library, setLibrary] = useState<Library | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  // DB表示データ
  const [relationalFiles, setRelationalFiles] = useState<any[]>([]);
  const [drawFiles, setDrawFiles] = useState<any[]>([]);

  // toggle components
  const [toggleJumpToNote, setToggleJumpToNote] = useState(false);
  const [tab, setTab] = useState(0);
  const [visible, setVisible] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [popupPlayList, setPopupPlayList] = useState(false);

  // コンポーネントに渡すProps
  const [currentVideoId, setCurrentVideoId] = useState('');

  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [drawPlayList, setDrawPlayList] = useState<any[]>([]);

  const [playlistCheckbox, setPlayListCheckbox] = useState<any[]>([]);

  const [checkboxList, setCheckboxList] = useState<any[]>([]);

  const [playlistTitle, setPlayListTitle] = useState<string>('');

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
      const data = await getSession();
      if (!data) window.location.href = '/';

      // クライアント
      const videoClient = new Video(data);
      const playlistClient = new Playlist(data);
      const libClient = new Library(data);
      setLibrary(libClient);
      setPlaylist(playlistClient);
      setVideo(videoClient);

      // data fetch
      await videoClient.fetchAllData();
      await playlistClient.fetchAllData();
      await libClient.fetchAllData();
      await libClient.document.fetchAllData();

      // 表示
      updateDraw(videoClient, playlistClient, libClient);
    })();
  }, []);

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
      setTab(0);
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

  const checkDrawDelete = () => {
    const checkList: boolean[] = [];
    document.querySelectorAll('.checkbox').forEach((e) => {
      if ((e as HTMLInputElement).checked) checkList.push(true);
      else checkList.push(false);
    });
    const check = checkList.some((e) => e);
    setDeleteBtn(check);
  };

  const updateCheckboxList = (dbId: string, checked: boolean) => {
    if (checked) setCheckboxList([...checkboxList, dbId]);
    else setCheckboxList(checkboxList.filter((ele) => ele !== dbId));
    checkDrawDelete();
  };

  const updatePlaylistCheckbox = (data: any, checked: boolean) => {
    if (checked) setPlayListCheckbox([...playlistCheckbox, data]);
    else setPlayListCheckbox(playlistCheckbox.filter((ele) => ele !== data));
    checkDrawDelete();
  };

  const checkboxFalse = () => {
    document.querySelectorAll('.checkbox').forEach((e) => {
      (e as HTMLInputElement).checked = false;
    });
  };

  const deleteAction = async () => {
    await video?.deleteData(checkboxList);
    await playlist?.deleteData(playlistCheckbox);

    setCheckboxList([]);
    setPlayListCheckbox([]);

    updateDraw(video!, playlist!, library!);
    checkboxFalse();
    setDeleteBtn(false);
  };

  const createPlayList = async () => {
    // DB insert
    const insertData = {
      title: playlistTitle,
      videos: checkboxList,
    };
    await playlist?.insert(insertData);
    await playlist?.fetchAllData();

    // UI
    setTab(1);
    setPopupPlayList(false);
    checkboxFalse();
  };

  const jumpTo = (fileId: string) => {
    window.location.href = `/note/${fileId}`;
  };

  const relateNote = async (fileId: string) => {
    await library?.document.relateVideo(fileId, currentVideoId);
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

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-start pt-8 px-5">
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

      <PlayTab
        draw={deleteBtn}
        tab={tab}
        deleteAction={deleteAction}
        setTab={setTab}
        setCreatePlayList={setPopupPlayList}
      />
      <PopupContent height="h-3/4" visible={popupPlayList}>
        <CreatePlaylist
          videos={checkboxList}
          setClose={setPopupPlayList}
          createPlaylist={createPlayList}
          setTitle={setPlayListTitle}
        />
      </PopupContent>

      <PopupContent height="h-fit" visible={toggleJumpToNote}>
        <JumpToNote
          jumpTo={jumpTo}
          relateNote={relateNote}
          files={drawFiles}
          relationalFiles={relationalFiles}
          setClose={setToggleJumpToNote}
        />
      </PopupContent>

      <DrawVideos
        visible={tab}
        id={0}
        videos={videoList}
        setCheckboxAction={updateCheckboxList}
        jumpToNote={jumpToNote}
      />
      <DrawVideos
        visible={tab}
        id={1}
        videos={drawPlayList}
        setCheckboxAction={updatePlaylistCheckbox}
        jumpToNote={jumpToNote}
      />
    </div>
  );
}

export default Play;
