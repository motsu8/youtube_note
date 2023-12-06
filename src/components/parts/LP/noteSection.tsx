import React from 'react'

import { LP_NOTE_CARD } from '@/constants/lp';

import NoteCard from './noteCard';

function NoteSection() {
  return (
    <div
    id="section-note"
    className="w-full bg-base py-10 space-y-10 flex flex-col justify-center items-center shadow-sm"
  >
    <p className="text-3xl text-white">エンジニアライクなノートを提供</p>

    <div className="w-3/4 grid grid-cols-2 gap-10">
      {LP_NOTE_CARD.map((ele) => {
        const { key, ...props } = ele;
        return <NoteCard key={key} {...props} />;
      })}
    </div>
  </div>
  )
}

export default NoteSection