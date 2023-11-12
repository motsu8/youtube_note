import React from 'react';

import { DrawVideosProps } from '@/types/components';

import PlaylistCard from './parts/playlistCard';
import VideoCard from './parts/videoCard';

function DrawVideos({
  videos,
  visible,
  id,
  isGrid = true,
  setCheckboxAction,
  jumpToNote,
}: DrawVideosProps) {
  // レイアウト
  const layout = isGrid ? 'grid' : 'flex';

  // 動画リスト
  if (id === 0) {
    return (
      <div
        className={`w-full h-5/6 justify-items-center overflow-auto ${
          visible === id
            ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            : 'hidden'
        }`}
      >
        {videos.map((video, index) => {
          if (layout === 'flex') {
            if (index >= 4) return <span key={video.id} className="hidden" />;
            return (
              <VideoCard
                key={video.id}
                video={video}
                setCheckboxAction={setCheckboxAction!}
                jumpToNote={jumpToNote!}
              />
            );
          }
          return (
            <VideoCard
              key={video.id}
              video={video}
              setCheckboxAction={setCheckboxAction!}
              jumpToNote={jumpToNote!}
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
      } w-full justify-items-center overflow-auto sm:grid-cols-2 md:grid-cols-4 lg:grid-cols4`}
    >
      {videos.map((playlist) => {
        return (
          <PlaylistCard
            key={playlist.id}
            data={playlist}
            setCheckboxAction={setCheckboxAction!}
          />
        );
      })}
    </div>
  );
}

export default DrawVideos;
