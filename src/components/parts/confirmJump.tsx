import React from 'react';

import Button from './button';

function ConfirmJump({
  close,
  jumpLink,
}: {
  close: () => void;
  jumpLink: () => void;
}) {
  const defaultClass = [
    'hover:text-slate-700',
    'text-lg',
    'p-2',
    'mt-2',
    'space-x-1',
    'ml-2',
    'rounded-t-lg',
    'bg-blue-100',
  ];
  return (
    <>
      <p>保存しましたか？</p>
      <Button
        title="保存せず移動する"
        className={defaultClass}
        setClickHandler={close}
      />
      <Button
        title="保存して移動する"
        className={defaultClass}
        setClickHandler={jumpLink}
      />
    </>
  );
}

export default ConfirmJump;
