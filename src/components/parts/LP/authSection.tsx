import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

import Parallax from '@/components/parallax';
import { LP_AUTH, type ContentObject } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function AuthSection() {
  return (
    <div
      id="section-auth"
      className="w-full h-[600px] md:h-[800px] flex flex-col justify-center items-center relative"
    >
      <div className="w-full h-full bg-wave-reverse" />
      <Parallax
        speed={2}
        className="w-3/4 h-5/6 flex flex-col justify-start items-start absolute left-1/5"
      >
        <div className="space-y-5">
          {LP_AUTH.map(({ key, content, className }: ContentObject) => (
            <p key={key} className={className}>
              {content}
            </p>
          ))}
        </div>
      </Parallax>

      <div className="flex w-full lg:w-8/12 h-[20rem] absolute bottom-20 px-20">
        <div className="aspect-square w-[200px] md:w-[300px] absolute left-16 lg:-translate-x-1/2 top-1/2 -translate-y-1/2">
          <div className="aspect-square absolute w-[80px] md:w-[150px] top-0 left-1/2">
            <Image src="/search.png" alt="google logo" fill />
          </div>
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-[80px] md:text-[150px] absolute left-0 top-1/2"
          />
        </div>

        <ScrollRevealContainer
          className="aspect-square w-[80px] absolute top-2/3 sm:top-1/2 !-translate-y-1/2 left-2/3 !-translate-x-full lg:left-1/2 lg:!-translate-x-1/2 lg:top-1/2"
          duration={1500}
          moveTo="left"
        >
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="origin-center rotate-45 md:rotate-0 text-[80px] md:text-[150px]"
          />
        </ScrollRevealContainer>

        <div className="aspect-square w-[80px] md:w-[150px] absolute right-8 md:right-0 lg:left-full lg:-translate-x-1/2 top-full md:top-1/2 -translate-y-1/2">
          <Image src="/icon.png" alt="YouTube Note icon" fill />
        </div>
      </div>
    </div>
  );
}

export default AuthSection;
