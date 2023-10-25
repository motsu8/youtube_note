'use client';

import Image from 'next/image';
import React from 'react';

import { ConfirmVideo } from '@/types/components';

function ConfirmVideo({
  videoData,
  setVisible,
  setVideoData,
  addVideo,
}: ConfirmVideo) {
  const closePopUp = () => {
    setVideoData(null);
    setVisible(false);
  };

  if (videoData) {
    return (
      <div className="flex flex-col justify-center items-center space-y-5 h-full overflow-auto">
        <Image
          alt="動画サムネイル"
          src={videoData.thumbnails.medium.url}
          width={videoData.thumbnails.medium.width}
          height={videoData.thumbnails.medium.height}
          className="bg-black w-2/3 rounded shadow"
        />
        <div className="px-3">
          <p>{videoData.title}</p>
          <p className="text-neutral-600">{videoData.channel}</p>
        </div>

        <div className="flex justify-center space-x-5 mt-2">
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
    );
  }
}

export default ConfirmVideo;
