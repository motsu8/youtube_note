import React, { useState } from 'react';

import Relate from './relate';
import SelectFile from './selectFile';

function JumpToNote({
  files,
  relationalFiles,
  setClose,
  jumpTo,
  relateNote,
}: {
  files: any[];
  relationalFiles: any[];
  jumpTo: (id: string) => void;
  relateNote: (fileId: string) => void;
  setClose: (bool: boolean) => void;
}) {
  const [toggleTab, setToggleTab] = useState(0);
  return (
    <div className="flex flex-col space-y-4 justify-around items-center h-full py-4">
      {files.length === 0 && relationalFiles.length === 0 ? (
        <p>ノートを作成してください</p>
      ) : (
        <div className="flex space-x-2 justify-around">
          <button
            type="button"
            className={`rounded px-2 py-1 ${
              toggleTab === 0 ? 'bg-slate-100' : ''
            }`}
            onClick={() => setToggleTab(0)}
          >
            既存のノートを参照する
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 ${
              toggleTab === 1 ? 'bg-slate-100' : ''
            }`}
            onClick={() => setToggleTab(1)}
          >
            参照ノートを選択する
          </button>
        </div>
      )}

      {/* 参照コンポーネント */}
      <Relate
        jumpTo={jumpTo}
        relateNote={relateNote}
        setToggleTab={setToggleTab}
        setClose={setClose}
        files={files}
        toggle={toggleTab}
        id={0}
      />

      {/* 選択コンポーネント */}
      <SelectFile
        jumpTo={jumpTo}
        setToggleTab={setToggleTab}
        setClose={setClose}
        files={relationalFiles}
        toggle={toggleTab}
        id={1}
      />
    </div>
  );
}

export default JumpToNote;
