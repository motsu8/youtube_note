'use client';

import React, { useState, useEffect } from 'react';

import ConfirmVideo from '@/components/confirmVideo';
import CreatePlaylist from '@/components/createPlaylist';
import DrawVideos from '@/components/drawVideos';
import PopupContent from '@/components/parts/popupContent';
import Search from '@/components/parts/search';
import PlayTab from '@/components/playTab';
import { VideoData } from '@/types/components';
import getSession from '@/utils/getSession';

import Playlist from '../api/playlist';
import Video from '../api/video';
import Youtube from '../api/youtube';

function Play() {
  const [videoUrl, setVideoUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  const [drawPlayList, setDrawPlayList] = useState<any[]>([]);
  const [deleteBtn, setDeleteBtn] = useState(false);

  const [playlistCheckbox, setPlayListCheckbox] = useState<any[]>([]);

  const [checkboxList, setCheckboxList] = useState<any[]>([]);
  const [popupPlayList, setPopupPlayList] = useState(false);

  const [playlistTitle, setPlayListTitle] = useState<string>('');

  const updateDraw = (vClient: Video, pClient: Playlist) => {
    const drawVideos = vClient.getData();
    setVideoList(drawVideos);

    const drawPlayLists = pClient.getData();
    setDrawPlayList(drawPlayLists);
  };

  useEffect(() => {
    (async () => {
      const data = await getSession();

      // クライアント
      const videoClient = new Video(data);
      const playlistClient = new Playlist(data);
      setPlaylist(playlistClient);
      setVideo(videoClient);

      // data fetch
      await videoClient.fetchAllData();
      await playlistClient.fetchAllData();

      // 表示
      updateDraw(videoClient, playlistClient);
    })();
  }, []);

  const checkValidUrl = () => /\?v=([^&]+)/.test(videoUrl);

  const submitAction = () => {
    // nullの場合、全表示
    if (!videoUrl) {
      updateDraw(video!, playlist!);
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
    updateDraw(video!, playlist!);
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
    console.log(checkboxList);
    checkDrawDelete();
  };

  const updatePlaylistCheckbox = (data: any, checked: boolean) => {
    console.log(playlistCheckbox);
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

    updateDraw(video!, playlist!);
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

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-start pt-8 px-5">
      <Search
        placeholder="動画URLで追加"
        setInputValue={setVideoUrl}
        setSubmitAction={submitAction}
      />
      <PopupContent visible={visible}>
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
      <PopupContent visible={popupPlayList}>
        <CreatePlaylist
          videos={checkboxList}
          setClose={setPopupPlayList}
          createPlaylist={createPlayList}
          setTitle={setPlayListTitle}
        />
      </PopupContent>

      <DrawVideos
        visible={tab}
        id={0}
        videos={videoList}
        setCheckboxAction={updateCheckboxList}
      />
      <DrawVideos
        visible={tab}
        id={1}
        videos={drawPlayList}
        setCheckboxAction={updatePlaylistCheckbox}
      />
    </div>
  );
}

export default Play;
