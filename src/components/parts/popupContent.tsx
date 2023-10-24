import React from 'react';

import Mask from './mask';

function PopupContent({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Mask visible={visible} />
      <div
        className={`bg-neutral-200 absolute z-20 !top-1/4  rounded-md shadow-md p-4 w-1/3 ${
          visible ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </>
  );
}

export default PopupContent;
