import React, { useState } from 'react';

import Library from '@/app/api/library';
import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';

function CreateContent({
  library,
  currLibId,
  setVisible,
  setDrawList,
}: {
  library: Library | null;
  currLibId: string | null;
  setVisible: (bool: boolean) => void;
  setDrawList: (data: any[], type: string) => void;
}) {
  const [content, setContent] = useState('');
  const [libs, setLibs] = useState<string | null>(null);
  const [type, setType] = useState<string>('');

  if (library === null) return <p>loading...</p>;

  const postTitle = async (str: string, lib: string | null) => {
    if (type === 'folder') {
      await library.postTitle(str, lib);
      await library.fetchAllData();
      const drawData = library.getDrawList(currLibId!);
      setDrawList(drawData!, type);
    }
    if (type === 'file') {
      await library.document.postTitle(str, lib);
      await library.document.fetchAllData();
      const drawData = library.document.getFiles(currLibId);
      setDrawList(drawData!, type);
    }
    setVisible(false);
  };

  return (
    <form
      action=""
      className="flex flex-col items-center px-3 w-full space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        postTitle(content, libs);
        return false;
      }}
    >
      <p className="text-2xl font-bold">新規作成</p>
      <div className="w-full">
        <label htmlFor="folder" className="block">
          作成種別
          <select
            name=""
            id="folder"
            className="w-full rounded py-1 pl-2 bg-slate-100"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">----</option>
            <option value="folder">フォルダ</option>
            <option value="file">ファイル</option>
          </select>
        </label>
      </div>
      <div className="w-full">
        <label htmlFor="folder" className="block">
          フォルダに挿入
          <select
            name=""
            id="folder"
            className="w-full rounded py-1 pl-2 bg-slate-100"
            onChange={(e) => setLibs(e.target.value)}
          >
            <option value="">----</option>
            {library!.getAllData?.map((ele) => {
              return (
                <option key={ele.id} value={ele.id}>
                  {ele.title}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="w-full">
        <label htmlFor="title" className="block">
          タイトル
          <input
            type="text"
            id="title"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full rounded py-1 pl-2 bg-slate-100"
          />
        </label>
      </div>
      <div className="flex justify-around w-full">
        <button
          type="button"
          className={BTN_DEFAULT}
          onClick={() => setVisible(false)}
        >
          閉じる
        </button>
        <button
          type="button"
          className={BTN_ACCENT}
          onClick={() => postTitle(content, libs)}
        >
          作成する
        </button>
      </div>
    </form>
  );
}

export default CreateContent;
