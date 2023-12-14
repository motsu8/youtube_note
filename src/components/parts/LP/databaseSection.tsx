import React from 'react';

import { LP_DATABASE, type ContentObject } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function DatabaseSection() {
  return (
    <div className="w-3/4 h-3/4 flex flex-col justify-start items-start">
      <ScrollRevealContainer>
        {LP_DATABASE.map(({ key, content, className }: ContentObject) => (
          <p key={key} className={className}>
            {content}
          </p>
        ))}
      </ScrollRevealContainer>
    </div>
  );
}

export default DatabaseSection;
