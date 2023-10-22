'use client';

import React from 'react';

import Library from '@/app/api/library';

import Breadcrumb from './parts/breadcrumb';
import Button from './parts/button';

function NoteHead({
  bread,
  setCurrLibId,
}: {
  bread: Library[] | null;
  setCurrLibId: (id: string, title?: string) => void;
}) {
  return (
    <div className="w-10/12 flex items-center justify-between">
      <Breadcrumb bread={bread} setCurrLibId={setCurrLibId} />
      <Button
        title="新規作成"
        setClickHandler={() => alert('create new Docs')}
      />
    </div>
  );
}

export default NoteHead;
