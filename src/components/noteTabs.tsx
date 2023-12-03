import React from 'react';

import Button from './parts/button';

function NoteTabs({
  saveContent,
  updateTab,
  tab,
}: {
  tab: number;
  saveContent: () => void;
  updateTab: (num: number) => void;
}) {
  const opacity = 'bg-transparent text-slate-600 hover:text-slate-900';

  const defaultClass = ['text-lg', 'px-4', 'rounded-t-lg', 'h-full', 'm-0'];
  const writeClass = defaultClass.concat([
    tab === 0 ? 'bg-white border-r text-black' : opacity,
  ]);
  const previewClass = defaultClass.concat([
    tab === 1 ? 'bg-white border-x text-black' : opacity,
  ]);
  const saveClass = [
    'bg-slate-50',
    'hover:text-slate-800',
    'hover:shadow-lg',
    'text-md',
    'p-1',
    'my-1',
    'mx-3',
    'rounded-lg',
  ];
  return (
    <div className="flex bg-main-dark border-x border-t w-full rounded-t-lg justify-between">
      <div>
        <Button
          title="Write"
          setClickHandler={() => updateTab(0)}
          className={writeClass.join(' ')}
        />
        <Button
          title="Preview"
          setClickHandler={() => updateTab(1)}
          className={previewClass.join(' ')}
        />
      </div>
      <Button
        title="保存する"
        setClickHandler={saveContent}
        className={saveClass.join(' ')}
      />
    </div>
  );
}

export default NoteTabs;
