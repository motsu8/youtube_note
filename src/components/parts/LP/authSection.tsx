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
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
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

      <div className="absolute top-2/3 -translate-y-1/2 left-2/3 flex w-5/12 h-[20rem] -translate-x-1/2">
        <div className="w-[300px] absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Image
            src="/search.png"
            alt="google logo"
            className="absolute right-0 bottom-0"
            width={150}
            height={150}
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            size="10x"
            className="absolute left-0 top-0"
          />
        </div>

        <ScrollRevealContainer
          className="w-[200px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          delay={400}
          duration={1500}
          moveTo="left"
        >
          <FontAwesomeIcon
            icon={faArrowRightLong}
            size="10x"
            className="absolute top-1/2 -translate-y-1/2"
          />
        </ScrollRevealContainer>

        <div className="w-[200px] absolute left-full -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Image
            src="/icon.png"
            alt="YouTube Note icon"
            className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2"
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthSection;
