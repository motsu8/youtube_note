import Image from 'next/image';
import React from 'react';

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
        className="w-full h-full absolute flex flex-col items-start justify-start px-12 lg:px-48 py-28 xl:justify-start xl:items-start"
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

      <div className="px-10 absolute top-2/3 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/3">
        <Image
          src="/YouTube_Note.gif"
          alt="サービスイメージ"
          className="skew-y-[5deg]"
          height={350}
          width={900}
          style={{
            borderTopWidth: 5,
            borderRightWidth: 7,
            borderRadius: 10,
            boxShadow: '10px 15px 15px #888888',
            objectFit: 'contain',
          }}
        />
      </div>
    </>
  );
}

export default TitleSection;
