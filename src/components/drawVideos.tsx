import React from 'react';

import VideoCard from './parts/videoCard';

function DrawVideos({
  videos,
  visible,
  id,
}: {
  videos: any[];
  visible: number;
  id: number;
}) {
  if (videos) {
    return (
      <div
        className={`${
          visible === id ? 'grid' : 'hidden'
        } w-full gap-4 justify-items-center overflow-auto grid-cols-2 lg:grid-cols-5`}
      >
        {videos.map((video) => {
          return <VideoCard key={video.id} video={video} />;
        })}
      </div>
    );
  }
}

export default DrawVideos;
