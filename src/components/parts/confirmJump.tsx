import React from 'react';

import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';

import Button from './button';

function ConfirmJump({
  close,
  jumpLink,
}: {
  close: () => void;
  jumpLink: () => void;
}) {
  return (
    <div className="flex flex-col space-y-2 p-2">
      <p>保存しましたか？</p>
      <div>
        <Button
          title="保存せず移動する"
          className={BTN_DEFAULT}
          setClickHandler={close}
        />
        <Button
          title="保存して移動する"
          className={BTN_ACCENT}
          setClickHandler={jumpLink}
        />
      </div>
    </div>
  );
}

export default ConfirmJump;
