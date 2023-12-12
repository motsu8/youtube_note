import React from 'react';

import { ContentObject, LP_PLAYLIST } from '@/constants/lp';

function PlaylistSection() {
  return (
    <div
      id="section-playlist"
      className="w-full flex flex-col justify-center items-center space-y-10 py-24"
    >
      {LP_PLAYLIST.map(({ key, content, className }: ContentObject) => (
        <p key={key} className={className}>
          {content}
        </p>
      ))}
      <video
        controls
        muted
        width={1000}
        height={700}
        className="border rounded-lg"
      >
        <source src="/search.mp4" />
      </video>
    </div>
  );
}

export default PlaylistSection;
