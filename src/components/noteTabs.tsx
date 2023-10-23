import React, { useState } from 'react';

import Button from './parts/button';

function NoteTabs() {
  const [selected, setSelected] = useState(0);
  const write = () => {
    setSelected(0);
    alert('write');
  };
  const preview = () => {
    setSelected(1);
    alert('preview');
  };
  const save = () => {
    alert('save');
  };
  const bg = 'bg-slate-100 text-black';
  const opacity = 'bg-inherit text-black';
  const writeClass = [
    'bg-slate-100',
    'hover:text-slate-700',
    'text-lg',
    'p-2',
    'mt-2',
    'space-x-1',
    'ml-2',
    'rounded-t-lg',
    selected === 0 ? bg : opacity,
  ];
  const previewClass = [
    'bg-slate-100',
    'hover:text-slate-700',
    'text-lg',
    'p-2',
    'mt-2',
    'rounded-t-lg',
    selected === 1 ? bg : opacity,
  ];
  const saveClass = [
    'bg-slate-100',
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
        <Button title="Write" setClickHandler={write} className={writeClass} />
        <Button
          title="Preview"
          setClickHandler={preview}
          className={previewClass}
        />
      </div>
      <Button title="保存する" setClickHandler={save} className={saveClass} />
    </div>
  );
}

export default NoteTabs;
