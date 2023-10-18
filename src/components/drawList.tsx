import React from 'react';

import { DrawList } from '@/types/components';

import Content from './parts/content';

function DrawList({ title }: DrawList) {
  return (
    <div className="bg-slate-200 w-11/12 max-h-max p-2 space-x-3 space-y-2">
      <p>{title}</p>
      <Content />
    </div>
  );
}

export default DrawList;
