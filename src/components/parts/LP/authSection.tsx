import React from 'react';

import { LP_AUTH, type ContentObject } from '@/constants/lp';

function AuthSection() {
  return (
    <div>
      {LP_AUTH.map(({ key, content, className }: ContentObject) => (
        <p key={key} className={className}>
          {content}
        </p>
      ))}
    </div>
  );
}

export default AuthSection;
