'use client';

import React from 'react';

import Parallax from '@/components/parallax';
import { DEFAULT_DELAY, LP_NOTE_CARD } from '@/constants/lp';

import NoteCard from './noteCard';
import ScrollRevealContainer from '../scrollRevealContainer';

function NoteSection() {
  return (
    <div
      id="section-note"
      className="w-full bg-base py-28 flex flex-col justify-center items-center shadow-sm"
    >
      <Parallax speed={-1} className="h-min pt-20">
        <p className="text-3xl text-white">エンジニアライクなノートを提供</p>
      </Parallax>

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
