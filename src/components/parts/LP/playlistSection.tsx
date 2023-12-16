import React from 'react';

import Parallax from '@/components/parallax';
import { ContentObject, LP_PLAYLIST } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function PlaylistSection() {
  return (
    <div id="section-playlist" className="w-full h-full py-28">
      <ScrollRevealContainer className="w-full flex flex-col justify-start items-center space-y-10">
        {LP_PLAYLIST.map(({ key, content, className }: ContentObject) => (
          <p key={key} className={className}>
            {content}
          </p>
        ))}
      </ScrollRevealContainer>
      <Parallax className="flex justify-center pb-20">
        <video
          controls
          muted
          width={1000}
          height={700}
          className="border rounded-lg"
        >
          <source src="/search.mp4" />
        </video>
      </Parallax>
    </div>
  );
}

export default PlaylistSection;
