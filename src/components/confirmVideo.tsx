'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { ConfirmVideo } from '@/types/components';

function ConfirmVideo({
  videoData,
  setVisible,
  setVideoData,
  addVideo,
  folderData,
}: ConfirmVideo) {
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState('');
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

        {/* ノート */}
        <div className="flex flex-col space-y-4 w-full">
          <label htmlFor="selectFolder" className="">
            <p>フォルダ</p>
            <select
              name=""
              id="selectFolder"
              className="px-2 py-1 w-3/4"
              onChange={(e) => setFolder(e.target.value)}
            >
              <option value="">-----</option>
              {folderData!.map((ele) => {
                return (
                  <option key={ele.id} value={ele.id}>
                    {ele.title}
                  </option>
                );
              })}
            </select>
          </label>
          <input
            type="text"
            placeholder="ノート名"
            className="px-2 py-1"
            onChange={(e) => setTitle(e.target.value)}
          />
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
              addVideo(folder, title);
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
