import React from 'react';

import { DEFAULT_DELAY, LP_NOTE_CARD } from '@/constants/lp';

import NoteCard from './noteCard';
import ScrollRevealContainer from '../scrollRevealCotainer';

function NoteSection() {
  return (
    <div className="w-full py-10 space-y-10 flex flex-col justify-center items-center shadow-sm">
      <ScrollRevealContainer>
        <p className="text-3xl text-white">エンジニアライクなノートを提供</p>
      </ScrollRevealContainer>

      <div className="w-3/4 grid grid-cols-2 gap-10">
        {LP_NOTE_CARD.map((ele) => {
          const { key, ...props } = ele;
          return (
            <ScrollRevealContainer
              key={key}
              delay={DEFAULT_DELAY + key * DEFAULT_DELAY}
            >
              <NoteCard {...props} />
            </ScrollRevealContainer>
          );
        })}
      </div>
    </div>
  );
}

export default NoteSection;
