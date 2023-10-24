import React, { useState } from 'react';

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
  const defaultClass = [
    'hover:text-slate-700',
    'text-lg',
    'p-2',
    'mt-2',
    'space-x-1',
    'ml-2',
    'rounded-t-lg',
    'bg-blue-100',
  ];
  return (
    <>
      <select name="" id="" onChange={(e) => setVideoId(e.target.value)}>
        {videos.map((video) => {
          return (
            <option key={video.id} value={video.id}>
              {video.title}
            </option>
          );
        })}
      </select>
      <Button
        title="閉じる"
        className={defaultClass}
        setClickHandler={() => closeAction(false)}
      />
      <Button
        title="参照する"
        className={defaultClass}
        setClickHandler={() => relationAction(videoId)}
      />
    </>
  );
}

export default RelationVideo;
