'use client';

import React from 'react';

import Library from '@/app/api/library';

import Breadcrumb from './parts/breadcrumb';
import Button from './parts/button';

function NoteHead({
  bread,
  setCurrLibId,
  drawDelete,
  setVisible,
  deleteFolderAction,
  deleteFileAction,
}: {
  bread: Library[] | null;
  drawDelete: boolean;
  setVisible: (bool: boolean) => void;
  setCurrLibId: (id: string, title?: string) => void;
  deleteFolderAction: () => void;
  deleteFileAction: () => void;
}) {
  const pink = [
    'bg-rose-300',
    'py-2',
    'px-4',
    'rounded-lg',
    'shadow-md',
    'hover:bg-rose-200',
  ];
  const deleteBtn = pink.concat(drawDelete ? 'block' : 'hidden');

  return (
    <div className="w-10/12 flex items-center justify-between">
      <Breadcrumb bread={bread} setCurrLibId={setCurrLibId} />
      <div className="flex space-x-2">
        <Button
          title="削除"
          className={deleteBtn}
          setClickHandler={() => {
            deleteFolderAction();
            deleteFileAction();
            console.log('click');
          }}
        />
        <Button
          title="新規作成"
          className={pink}
          setClickHandler={() => {
            setVisible(true);
            console.log('click');
          }}
        />
      </div>
    </div>
  );
}

export default NoteHead;
