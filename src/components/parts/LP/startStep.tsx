import Image from 'next/image';
import React from 'react';

import { LP_START_STEP, StartStepContent } from '@/constants/lp';

import HorizontalScroll from './horizontalScroll';

function StartStep() {
  return (
    <div
      className="bg-main-lp w-full flex flex-col justify-start items-center pt-16 space-y-5"
      id="start"
    >
      <p className="text-3xl">始めるためのステップ</p>

      <HorizontalScroll>
        {LP_START_STEP.map(
          ({ key, alt, src, title, content }: StartStepContent) => {
            return (
              <div
                key={key}
                className="w-[50vw] h-fit bg-main flex flex-col items-center justify-center space-y-5 pb-5 rounded-lg shadow-lg border"
              >
                <div className="relative aspect-[19/9] w-[50vw]">
                  <Image
                    alt={alt}
                    src={src}
                    className="!relative w-full h-full rounded-t-lg shadow-lg object-contain border-b"
                    fill
                  />
                </div>
                <div className="w-full px-6 space-y-4">
                  <p className="text-xl font-medium">
                    {key}. {title}
                  </p>
                  <p>{content}</p>
                </div>
              </div>
            );
          }
        )}
      </HorizontalScroll>
    </div>
  );
}

export default StartStep;
