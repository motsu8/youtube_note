'use client';

import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { DrawList } from '@/types/components';

import Content from './parts/content';
import IconButton from './parts/iconButton';

export default function DrawList({
  type,
  title,
  drawList,
  files,
  setCurrentLibrary,
  setDeleteList,
  setCurrFile,
  changeDeleteList,
  setDeleteFile,
  changeDeleteFile,
}: DrawList) {
  const iconSize = '';
  const iconColor = '#bbbbbb';
  const bgClass = ['flex', 'justify-center', 'items-center'];

  if (type === 'home') {
    return (
      <div className="bg-slate-200 w-11/12 max-h-max p-2 space-x-3 space-y-2">
        <p>{title}</p>
        <Content />
      </div>
    );
  }

  return (
    <div className="p-5 w-full">
      <div className="w-full p-3 flex flex-row items-center border-zinc-300 border-b-2">
        <input type="checkbox" name="" id="" className="basis-1/12 h-1/4" />
        <p className="basis-6/12">タイトル</p>
        <p className="basis-5/12">作成日</p>
      </div>

      {drawList ? (
        drawList.map((ele: any) => {
          return (
            <div
              key={ele.id}
              className="w-full p-3 flex flex-row justify-center items-center cursor-pointer hover:bg-neutral-50 border-zinc-300 border-b-2"
            >
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => {
                  if (e.target.checked) setDeleteList(e.target.value, 'folder');
                  else changeDeleteList(e.target.value, 'folder');
                }}
                value={ele.id}
                required
                className="basis-1/12 delete folder"
              />
              <button
                className="basis-6/12 flex space-x-2 items-center"
                type="button"
                onClick={() => setCurrentLibrary(ele.id, ele.title)}
              >
                <IconButton
                  icon={faFolder}
                  iconClass={iconSize}
                  bgClass={bgClass}
                  color={iconColor}
                />
                <p>{ele.title}</p>
              </button>
              <p className="basis-5/12">{ele.created_at}</p>
            </div>
          );
        })
      ) : (
        <p>no content</p>
      )}
      {files ? (
        files.map((ele) => {
          return (
            <div
              key={ele.id}
              className="w-full p-3 flex flex-row justify-center items-center cursor-pointer hover:bg-neutral-50 border-zinc-300 border-b-2"
            >
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => {
                  if (e.target.checked) setDeleteFile(e.target.value);
                  else changeDeleteFile(e.target.value);
                }}
                required
                value={ele.id}
                className="basis-1/12 delete file"
              />
              <button
                className="basis-6/12 flex space-x-2 items-center"
                type="button"
                onClick={() => setCurrFile(ele.id)}
              >
                <IconButton
                  icon={faFile}
                  iconClass={iconSize}
                  bgClass={bgClass}
                  color={iconColor}
                />
                <p>{ele.title}</p>
              </button>
              <p className="basis-5/12">{ele.created_at}</p>
            </div>
          );
        })
      ) : (
        <p>no content</p>
      )}
    </div>
  );
}
