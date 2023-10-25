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
      <>
        <Image
          alt="動画サムネイル"
          src={videoData.thumbnails.standard.url}
          width={videoData.thumbnails.standard.width}
          height={videoData.thumbnails.standard.height}
        />
        <div className="mt-2">
          <p className="text-lg">{videoData.channel}</p>
          <p>{videoData.title}</p>
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
      </>
    );
  }
}

export default ConfirmVideo;
