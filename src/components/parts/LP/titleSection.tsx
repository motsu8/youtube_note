import Image from 'next/image';
import React from 'react';

import Parallax from '@/components/parallax';
import { BTN_ACCENT } from '@/constants/buttonClass';
import { AUTH_SIGN_UP, ContentObject, LP_TITLE } from '@/constants/lp';

import Button from '../button';

interface TitleSectionProps {
  visibleFnc: (str: string) => void;
}

function TitleSection({ visibleFnc }: TitleSectionProps) {
  return (
    <>
      <div className="w-full h-full bg-wave" />

      <div
        id="section-title"
        className="w-full lg:h-full absolute flex flex-col items-start justify-start px-12 lg:px-48 py-28 xl:justify-start xl:items-start"
      >
        <div className="space-y-8">
          {LP_TITLE.map(({ key, content, className }: ContentObject) => (
            <p key={key} className={className}>
              {content}
            </p>
          ))}
          <Button
            title="今すぐ始める"
            className={BTN_ACCENT}
            setClickHandler={() => visibleFnc(AUTH_SIGN_UP)}
          />
        </div>
      </div>

      <Parallax
        speed={1}
        className="absolute aspect-[2/1] w-[300px] sm:w-[500px] md:w-[700px] lg:w-[800px] top-2/3 -translate-y-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:left-1/3"
        childClass="relative w-full h-full"
      >
        <Image
          src="/YouTube_Note.gif"
          alt="サービスイメージ"
          className="skew-y-[5deg] border-t-4 border-r-8 w-full h-full rounded-lg border-solid shadow-lg object-contain border-neutral-200"
          fill
        />
      </Parallax>
    </>
  );
}

export default TitleSection;
