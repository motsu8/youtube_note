import React from 'react';

import Parallax from '@/components/parallax';
import { ContentObject, LP_PLAYLIST } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function PlaylistSection() {
  return (
    <div id="section-playlist" className="w-full h-full pb-20">
      <Parallax speed={-1}>
        <div className="w-full flex flex-col justify-start items-center space-y-10">
          {LP_PLAYLIST.map(({ key, content, className }: ContentObject) => (
            <p key={key} className={className}>
              {content}
            </p>
          ))}
        </div>
      </Parallax>
      <ScrollRevealContainer className="flex justify-center">
        <video
          controls
          muted
          width={1000}
          height={700}
          className="border rounded-lg"
        >
          <source src="/search.mp4" />
        </video>
      </ScrollRevealContainer>
    </div>
  );
}

export default PlaylistSection;
