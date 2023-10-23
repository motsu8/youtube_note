import React from 'react';

function Mask({ visible }: { visible: boolean }) {
  return (
    <div
      className={`w-full h-full bg-black opacity-50 z-10 absolute !inset-0 ${
        visible ? 'block' : 'hidden'
      }`}
    />
  );
}

export default Mask;
