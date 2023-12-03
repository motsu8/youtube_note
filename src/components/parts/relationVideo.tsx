import React, { useState } from 'react';

import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';

import Button from './button';

function RelationVideo({
  videos,
  closeAction,
  relationAction,
}: {
  videos: any[];
  closeAction: (bool: boolean) => void;
  relationAction: (videoId: string) => Promise<void>;
}) {
  const [videoId, setVideoId] = useState('');
  return (
    <div className="flex flex-col items-center justify-center px-4 space-y-4">
      <p className="text-lg">参照する動画を選択</p>
      <select
        name=""
        id=""
        className="w-full px-2 py-1"
        onChange={(e) => {
          setVideoId(e.target.value);
        }}
      >
        <option value="">-----</option>
        {videos.map((video) => {
          return (
            <option key={video.id} value={video.id}>
              {video.title.slice(0, 40).concat('...')}
            </option>
          );
        })}
      </select>
      <div className="flex justify-around w-full">
        <Button
          title="閉じる"
          className={BTN_DEFAULT}
          setClickHandler={() => closeAction(false)}
        />
        <Button
          title="参照する"
          className={BTN_ACCENT}
          setClickHandler={() => relationAction(videoId)}
        />
      </div>
    </div>
  );
}

export default RelationVideo;
