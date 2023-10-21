'use client';

import React from 'react';

import { DrawList } from '@/types/components';

import Content from './parts/content';

export default function DrawList({ type, title, drawList }: DrawList) {
  if (type === 'home') {
    return (
      <div className="bg-slate-200 w-11/12 max-h-max p-2 space-x-3 space-y-2">
        <p>{title}</p>
        <Content />
      </div>
    );
  }

  return (
    <div className="py-8">
      {title}
      {drawList!.map((ele: any) => {
        return <p key={ele.title}>{ele.title}</p>;
      })}
    </div>
  );
}
