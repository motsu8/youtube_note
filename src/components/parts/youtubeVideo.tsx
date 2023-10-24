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
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return videoId ? (
    <YouTube
      className={play ? 'block' : 'hidden'}
      videoId={videoId}
      opts={opts}
      onReady={onPlayerReady}
    />
  ) : (
    <p className="hidden">loading...</p>
  );
}
