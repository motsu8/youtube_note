import Image from 'next/image';
import React from 'react';

import Parallax from '@/components/parallax';

import ScrollRevealContainer from '../scrollRevealContainer';

import type { ContentObject, ImageObject } from '@/constants/lp';

interface CenterSectionProps {
  id: string;
  textObj: ContentObject[];
  imgObj: ImageObject;
}

function CenterSection({ id, textObj, imgObj }: CenterSectionProps) {
  return (
    <div
      id={id}
      className="w-full h-[800px] py-20 flex flex-col justify-start items-center relative"
    >
      <ScrollRevealContainer className="w-3/4 h-5/6 flex flex-col justify-start items-center space-y-10">
        {textObj.map(({ key, content, className }: ContentObject) => (
          <p key={key} className={className}>
            {content}
          </p>
        ))}
      </ScrollRevealContainer>
      <Parallax
        speed={1}
        className="absolute aspect-[19/9] w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1000px] top-1/2 -translate-y-1/3 lg:-translate-y-1/2 left-1/2 -translate-x-1/2"
        childClass="relative w-full h-full"
      >
        <Image
          alt={imgObj.alt}
          src={imgObj.src}
          className="w-full h-full rounded-lg border-solid shadow-lg object-contain border-neutral-200"
          fill
        />
      </Parallax>
    </div>
  );
}

export default CenterSection;
