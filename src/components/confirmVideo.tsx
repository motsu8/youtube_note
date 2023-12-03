'use client';

import Image from 'next/image';
import React from 'react';

import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';
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
      <div className="z-20 flex flex-col justify-center items-center space-y-5 h-full overflow-auto">
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
            className={BTN_DEFAULT}
          >
            閉じる
          </button>
          <button
            type="button"
            onClick={() => {
              addVideo();
              closePopUp();
            }}
            className={BTN_ACCENT}
          >
            追加する
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmVideo;
