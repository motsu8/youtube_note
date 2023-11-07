import React from 'react';

import PlaylistCard from './parts/playlistCard';
import VideoCard from './parts/videoCard';

type DrawVideosProps = {
  videos: any[];
  visible: number;
  id: number;
  isGrid?: boolean;
  jumpToNote?: (videoId: string) => void;
  setCheckboxAction?: (dbId: string, checked: boolean) => void;
};

function DrawVideos({
  videos,
  visible,
  id,
  isGrid,
  setCheckboxAction,
  jumpToNote,
}: DrawVideosProps) {
  // レイアウト
  const layout = isGrid ? 'grid' : 'flex';

  // 動画リスト
  if (id === 0) {
    return (
      <div
        className={`${visible === id ? 'grid' : 'hidden'} 
          gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full justify-items-center overflow-auto`}
      >
        {videos.map((video, index) => {
          if (layout === 'flex') {
            if (index >= 4) return <span className="hidden" />;
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

DrawVideos.defaultProps = {
  isGrid: true,
  jumpToNote: null,
  setCheckboxAction: null,
};

export default DrawVideos;
