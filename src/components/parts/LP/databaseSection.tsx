import Image from 'next/image';
import React from 'react';

import Parallax from '@/components/parallax';
import { LP_DATABASE, type ContentObject } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function DatabaseSection() {
  return (
    <div className="w-3/4 h-screen flex flex-col justify-center items-center py-10 relative">
      <ScrollRevealContainer className="w-full h-full flex flex-col justify-start items-center py-16">
        <div className="space-y-5">
          {LP_DATABASE.map(({ key, content, className }: ContentObject) => (
            <p key={key} className={className}>
              {content}
            </p>
          ))}
        </div>
      </ScrollRevealContainer>
      <Parallax
        speed={1}
        className="w-10/12 absolute aspect-[19/9] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        childClass="relative w-full h-full top-0 left-0"
      >
        <Image
          alt="データベースに保存"
          src="/save.gif"
          className="object-cover rounded-lg border shadow-lg"
          fill
        />
      </Parallax>
    </div>
  );
}

export default DatabaseSection;
