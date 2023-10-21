'use client';

import React from 'react';

import Breadcrumb from './parts/breadcrumb';
import Button from './parts/button';

function NoteHead() {
  return (
    <div className="w-full flex justify-around">
      <Breadcrumb />
      <Button
        title="新規作成"
        setClickHandler={() => alert('create new Docs')}
      />
    </div>
  );
}

export default NoteHead;
