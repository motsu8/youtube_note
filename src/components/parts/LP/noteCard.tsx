import Image from 'next/image';
import React from 'react';

import type { NoteCard } from '@/types/lp';

function NoteCard({ title, contents, url }: NoteCard) {
  return (
    <div className="bg-main py-5 px-5 rounded-tl-3xl rounded-br-3xl">
      <Image
        src={url}
        alt={title}
        height={300}
        width={200}
        style={{ objectFit: 'contain' }}
      />
      <p className="text-xl font-bold">{title}</p>
      <p>{contents}</p>
    </div>
  );
}

export default NoteCard;
