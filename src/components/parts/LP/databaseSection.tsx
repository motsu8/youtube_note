import Image from 'next/image';
import React from 'react';

import { LP_DATABASE, type ContentObject } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function DatabaseSection() {
  return (
    <div className="w-3/4 h-screen flex flex-col justify-center items-center py-10">
      <ScrollRevealContainer className="w-full h-full flex flex-col justify-center items-center space-y-5">
        {LP_DATABASE.map(({ key, content, className }: ContentObject) => (
          <p key={key} className={className}>
            {content}
          </p>
        ))}
        <div className="w-full relative aspect-[19/9] rounded border shadow-lg">
          <Image
            alt="データベースに保存"
            src="/save.gif"
            className="object-cover"
            fill
          />
        </div>
      </ScrollRevealContainer>
    </div>
  );
}

export default DatabaseSection;
