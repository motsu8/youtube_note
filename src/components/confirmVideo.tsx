import Image from 'next/image';
import React from 'react';

import Video from '@/app/api/video';
import { ConfirmVideo } from '@/types/components';

function ConfirmVideo({
  session,
  videoData,
  visible,
  setVisible,
  setVideoData,
}: ConfirmVideo) {
  const videoClient = new Video(session);

  const addVideo = () => {
    videoClient.insertVideo(videoData!);
  };

  const closePopUp = () => {
    setVideoData(null);
    setVisible(!visible);
  };

  if (videoData) {
    return (
      <>
        <div
          className={`w-full h-screen bg-black opacity-50 z-10 absolute ${
            visible ? 'block' : 'hidden'
          }`}
        />
        <div
          className={`bg-neutral-100 opacity-100 rounded-lg shadow-md w-1/2 p-5 items-center flex-col justify-center absolute top-1/4 inset-x-auto z-20 ${
            visible ? 'flex' : 'hidden'
          }`}
        >
          <Image
            alt="動画サムネイル"
            src={videoData.thumbnails.standard.url}
            width={videoData.thumbnails.standard.width}
            height={videoData.thumbnails.standard.height}
          />
          <div>
            <p className="text-lg">{videoData.channel}</p>
            <p>{videoData.title}</p>
          </div>
          <div className="flex justify-center space-x-5">
            <button
              type="button"
              onClick={() => closePopUp()}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              閉じる
            </button>
            <button
              type="button"
              onClick={() => {
                addVideo();
                closePopUp();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              追加する
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ConfirmVideo;
