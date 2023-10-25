import Image from 'next/image';
import React from 'react';

import { BTN_DEFAULT, BTN_PINK } from '@/constants/buttonClass';

import Button from './parts/button';

function CreatePlaylist({
  setClose,
  videos,
  createPlaylist,
  setTitle,
}: {
  videos: any[];
  setTitle: (str: string) => void;
  createPlaylist: () => void;
  setClose: (bool: boolean) => void;
}) {
  return (
    <div className="w-full h-full space-y-5 flex justify-center flex-col items-center">
      {/* 動画リスト */}
      {videos.length !== 0 ? (
        <>
          <div className="overflow-auto space-y-2">
            {videos.map((video) => {
              return (
                <div key={video.id} className="flex space-x-2">
                  <Image
                    alt="追加する動画サムネイル"
                    src={video.thumbnails.default.url}
                    width={video.thumbnails.default.width}
                    height={video.thumbnails.default.height}
                    className="rounded-md"
                  />
                  <div className="space-y-2">
                    <p>{video.title.slice(0, 40).concat('...')}</p>
                    <div className="flex space-x-2">
                      <Image
                        alt="チャンネルサムネイル"
                        className="rounded-full w-9 h-9"
                        src={video.channel_thumbnails.default.url}
                        width={35}
                        height={35}
                      />
                      <p className="text-neutral-600">{video.channel}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* タイトル */}
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="w-1/2 px-2 py-1"
            placeholder="プレイリスト名"
          />

          {/* ボタン */}
          <div className="flex justify-around w-full">
            <Button
              title="閉じる"
              setClickHandler={() => setClose(false)}
              className={BTN_DEFAULT}
            />
            <Button
              title="作成する"
              setClickHandler={() => createPlaylist()}
              className={BTN_PINK}
            />
          </div>
        </>
      ) : (
        <>
          <p>動画を選択してください</p>
          {/* ボタン */}
          <Button
            title="閉じる"
            setClickHandler={() => setClose(false)}
            className={BTN_DEFAULT}
          />
        </>
      )}
    </div>
  );
}

export default CreatePlaylist;
