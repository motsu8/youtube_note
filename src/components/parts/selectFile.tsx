import React, { useState } from 'react';

import { BTN_DEFAULT, BTN_PINK } from '@/constants/buttonClass';

import Button from './button';

function SelectFile({
  files,
  toggle,
  id,
  setClose,
  setToggleTab,
  jumpTo,
}: {
  files: any[];
  toggle: number;
  id: number;
  setClose: (bool: boolean) => void;
  setToggleTab: (num: number) => void;
  jumpTo: (jumpId: string) => void;
}) {
  const [fileId, setFileId] = useState('');
  return toggle === id ? (
    <>
      {files.length !== 0 ? (
        <select
          className="w-3/4 px-2 py-1"
          onChange={(e) => setFileId(e.target.value)}
        >
          <option value="">----</option>
          {files.map((ele) => {
            return (
              <option key={ele.id} value={ele.id}>
                {ele.title}
              </option>
            );
          })}
        </select>
      ) : (
        <p>参照しているノートがありません。</p>
      )}

      {/* ボタン */}
      <div className="flex justify-around w-full">
        <Button
          title="閉じる"
          setClickHandler={() => {
            setClose(false);
            setToggleTab(0);
          }}
          className={BTN_DEFAULT}
        />
        <Button
          title="移動する"
          setClickHandler={() => {
            jumpTo(fileId);
          }}
          className={BTN_PINK}
        />
      </div>
    </>
  ) : null;
}

export default SelectFile;
