import React from 'react';

import { LP_DATABASE, type ContentObject } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function DatabaseSection() {
  return (
    <ScrollRevealContainer>
      <div>
        {LP_DATABASE.map(({ key, content, className }: ContentObject) => (
          <p key={key} className={className}>
            {content}
          </p>
        ))}
      </div>
    </ScrollRevealContainer>
  );
}

export default DatabaseSection;
