import React from 'react';

import { LP_AUTH, type ContentObject } from '@/constants/lp';

import ScrollRevealContainer from '../scrollRevealContainer';

function AuthSection() {
  return (
    <ScrollRevealContainer>
      <div>
        {LP_AUTH.map(({ key, content, className }: ContentObject) => (
          <p key={key} className={className}>
            {content}
          </p>
        ))}
      </div>
    </ScrollRevealContainer>
  );
}

export default AuthSection;
