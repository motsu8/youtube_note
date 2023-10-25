import React from 'react';

import PlaylistCard from './parts/playlistCard';
import VideoCard from './parts/videoCard';

function DrawVideos({
  videos,
  visible,
  id,
  setCheckboxAction,
}: {
  videos: any[];
  visible: number;
  id: number;
  setCheckboxAction: (dbId: string, checked: boolean) => void;
}) {
  // 動画リスト
  if (id === 0) {
    return (
      <div
        className={`${
          visible === id ? 'grid' : 'hidden'
        } w-full gap-4 justify-items-center overflow-auto grid-cols-2 md:grid-cols-4`}
      >
        {videos.map((video) => {
          return (
            <VideoCard
              key={video.id}
              video={video}
              setCheckboxAction={setCheckboxAction}
            />
          );
        })}
      </div>
    );
  }

  // プレイリスト
  return (
    <div
      className={`${
        visible === id ? 'grid' : 'hidden'
      } w-full justify-items-center overflow-auto grid-cols-2 md:grid-cols-4`}
    >
      {videos.map((playlist) => {
        return (
          <PlaylistCard
            key={playlist.id}
            data={playlist}
            setCheckboxAction={setCheckboxAction}
          />
        );
      })}
    </div>
  );
}

export default DrawVideos;
