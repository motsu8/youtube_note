'use client';

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export default function Youtube({
  videoId,
  play,
}: {
  videoId: string;
  play: boolean;
}) {
  // if (!videoUrl)return <p>loading...</p>
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return videoId ? (
    <YouTube
      className={`${
        play ? 'flex justify-center' : 'hidden'
      } col-span-2 w-full h-full border-2`}
      videoId={videoId}
      opts={opts}
      onReady={onPlayerReady}
    />
  ) : (
    <p className="hidden">loading...</p>
  );
}
