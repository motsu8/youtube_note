import Image from 'next/image';
import React from 'react';

import type { NoteCard } from '@/types/lp';

function NoteCard({ title, contents, url }: NoteCard) {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-main py-5 px-5 space-y-2 rounded-tl-3xl rounded-br-3xl">
      <Image
        src={url}
        alt={title}
        height={500}
        width={600}
        style={{
          objectFit: 'contain',
          borderWidth: 1,
          borderRadius: 10,
        }}
      />
      <div className="w-full flex flex-col justify-start">
        <p className="text-xl font-bold">{title}</p>
        <p>{contents}</p>
      </div>
    </div>
  );
}

export default NoteCard;
