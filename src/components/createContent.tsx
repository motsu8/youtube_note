import React, { useState } from 'react';

import Library from '@/app/api/library';

import Mask from './parts/mask';

function CreateContent({
  library,
  visible,
  setVisible,
}: {
  library: Library | null;
  visible: boolean;
  setVisible: (bool: boolean) => void;
}) {
  const [content, setContent] = useState('');
  const [libs, setLibs] = useState<string | null>(null);
  const [type, setType] = useState<string>('');

  if (library === null) return <p>loading...</p>;

  const postTitle = (str: string, lib: string | null) => {
    if (type === 'folder') library.postTitle(str, lib);
    if (type === 'file') library.document.postTitle(str, lib);
    setVisible(false);
  };

  return (
    <>
      <Mask visible={visible} />
      <div
        className={`bg-neutral-200 absolute z-20 !top-1/4  rounded-md shadow-md p-4 w-1/3 ${
          visible ? 'block' : 'hidden'
        }`}
      >
        <form
          action=""
          className="flex flex-col items-center px-3 w-full space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            postTitle(content, libs);
            return false;
          }}
        >
          <p className="text-lg">新規作成</p>
          <div className="w-full">
            <label htmlFor="folder" className="block">
              作成種別
              <select
                name=""
                id="folder"
                className="w-full rounded-sm py-1 pl-2"
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
                className="w-full rounded-sm py-1 pl-2"
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
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-sm py-1 pl-2"
              />
            </label>
          </div>
          <div className="flex justify-around w-full">
            <button
              type="button"
              className=""
              onClick={() => setVisible(false)}
            >
              閉じる
            </button>
            <button
              type="button"
              className=""
              onClick={() => postTitle(content, libs)}
            >
              作成する
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateContent;
