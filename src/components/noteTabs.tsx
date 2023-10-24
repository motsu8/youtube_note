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
  const bg = 'bg-slate-50 text-black';
  const opacity = 'bg-transparent text-black';

  console.log(tab);

  const writeClass = [
    'hover:text-slate-700',
    'text-lg',
    'p-2',
    'mt-2',
    'rounded-t-lg',
    tab === 0 ? bg : opacity,
  ];
  const previewClass = [
    'hover:text-slate-700',
    'text-lg',
    'p-2',
    'mt-2',
    'rounded-t-lg',
    tab === 1 ? bg : opacity,
  ];
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
    <div className="flex bg-blue-100 w-full rounded-t-lg justify-between">
      <div>
        <Button
          title="Write"
          setClickHandler={() => updateTab(0)}
          className={writeClass}
        />
        <Button
          title="Preview"
          setClickHandler={() => updateTab(1)}
          className={previewClass}
        />
      </div>
      <Button
        title="保存する"
        setClickHandler={saveContent}
        className={saveClass}
      />
    </div>
  );
}

export default NoteTabs;
