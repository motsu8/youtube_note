'use client';

import React, { useState, useEffect } from 'react';

import ConfirmVideo from '@/components/confirmVideo';
import DrawVideos from '@/components/drawVideos';
import PopupContent from '@/components/parts/popupContent';
import Search from '@/components/parts/search';
import PlayTab from '@/components/playTab';
import { VideoData } from '@/types/components';
import getSession from '@/utils/getSession';

import Video from '../api/video';
import Youtube from '../api/youtube';

function Play() {
  const [videoUrl, setVideoUrl] = useState('');
  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  const [drawPlayList, setDrawPlayList] = useState<any[]>([]);

  const updateDraw = (client: Video) => {
    const drawVideos = client.getData();
    setVideoList(drawVideos);
    setDrawPlayList(drawVideos);
  };

  useEffect(() => {
    (async () => {
      const data = await getSession();

      // videoクライアント
      const videoClient = new Video(data);
      setVideo(videoClient);

      // data fetch
      await videoClient.fetchAllData();
      updateDraw(videoClient);
    })();
  }, []);

  const checkValidUrl = () => /\?v=([^&]+)/.test(videoUrl);

  const submitAction = () => {
    // nullの場合、全表示
    if (!videoUrl) {
      updateDraw(video!);
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
    updateDraw(video!);
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
      <PlayTab tab={tab} setTab={setTab} />

      <DrawVideos visible={tab} id={0} videos={videoList} />
      <DrawVideos visible={tab} id={1} videos={drawPlayList} />
    </div>
  );
}

export default Play;
