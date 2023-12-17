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
      className="w-full bg-base py-20 my-10 space-y-24 flex flex-col justify-center items-center shadow-sm"
    >
      <ScrollRevealContainer delay={DEFAULT_DELAY}>
        <p className="text-3xl text-white">エンジニアライクなノートを提供</p>
      </ScrollRevealContainer>

      <div className="w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
        {LP_NOTE_CARD.map((ele) => {
          const { key, ...props } = ele;
          return (
            <Parallax key={key} speed={-1}>
              <NoteCard {...props} />
            </Parallax>
          );
        })}
      </div>
    </div>
  );
}

export default NoteSection;
