import React from 'react';

import { DrawList } from '@/types/components';

import Content from './content';

function DrawList({ title }: DrawList) {
  return (
    <div>
      <p>{title}</p>
      <Content />
    </div>
  );
}

export default DrawList;
