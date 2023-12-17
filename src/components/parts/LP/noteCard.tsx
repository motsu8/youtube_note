import Image from 'next/image';
import React from 'react';

type NoteCard = {
  title: string;
  contents: string;
  url: string;
};

function NoteCard({ title, contents, url }: NoteCard) {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-main pb-10 space-y-5 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
      <Image
        src={url}
        alt={title}
        height={500}
        width={1200}
        className="hover:scale-[1.05] duration-500"
        style={{
          objectFit: 'cover',
          borderWidth: 2,
          borderTopLeftRadius: 32,
        }}
      />
      <div className="w-full flex flex-col justify-start px-5 space-y-3 pb-3">
        <p className="text-xl font-bold">{title}</p>
        <p className="h-16 lg:h-12">{contents}</p>
      </div>
    </div>
  );
}

export default NoteCard;
