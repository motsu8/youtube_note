import Image from 'next/image';
import React from 'react';

type NoteCard = {
  title: string;
  contents: string;
  url: string;
};

function NoteCard({ title, contents, url }: NoteCard) {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-main pb-10 space-y-5 rounded-tl-[32px] rounded-br-[32px]">
      <Image
        src={url}
        alt={title}
        height={500}
        width={1200}
        style={{
          objectFit: 'contain',
          borderWidth: 2,
          borderTopLeftRadius: 32,
        }}
      />
      <div className="w-full flex flex-col justify-start px-5 space-y-3">
        <p className="text-xl font-bold">{title}</p>
        <p>{contents}</p>
      </div>
    </div>
  );
}

export default NoteCard;
