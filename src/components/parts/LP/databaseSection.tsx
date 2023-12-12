import React from 'react';

import { LP_DATABASE, type ContentObject } from '@/constants/lp';

function DatabaseSection() {
  return (
    <div>
      {LP_DATABASE.map(({ key, content, className }: ContentObject) => (
        <p key={key} className={className}>
          {content}
        </p>
      ))}
    </div>
  );
}

export default DatabaseSection;
