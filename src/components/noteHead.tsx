'use client';

import React from 'react';

import Library from '@/app/api/library';
import { BTN_ACCENT } from '@/constants/buttonClass';

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
  return (
    <div className="w-10/12 flex items-center justify-between">
      <Breadcrumb bread={bread} setCurrLibId={setCurrLibId} />
      <div className="flex space-x-2">
        {drawDelete ? (
          <Button
            title="削除"
            className={BTN_ACCENT}
            setClickHandler={() => {
              deleteFolderAction();
              deleteFileAction();
            }}
          />
        ) : null}
        <Button
          title="新規作成"
          className={BTN_ACCENT}
          setClickHandler={() => {
            setVisible(true);
          }}
        />
      </div>
    </div>
  );
}

export default NoteHead;
