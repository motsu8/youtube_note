'use client';

import React from 'react';

import { DEFAULT_DELAY, LP_NOTE_CARD } from '@/constants/lp';

import NoteCard from './noteCard';
import ScrollRevealContainer from '../scrollRevealContainer';

function NoteSection() {
  return (
    <div
      id="section-note"
      className="w-full h-full py-14 space-y-10 flex flex-col justify-center items-center shadow-sm"
    >
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
