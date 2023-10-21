import React from 'react';

function Mask({ visible }: { visible: boolean }) {
  return (
    <div
      className={`h-full w-full bg-black opacity-50 absolute ${
        visible ? 'flex' : 'hidden'
      }`}
    />
  );
}

export default Mask;
