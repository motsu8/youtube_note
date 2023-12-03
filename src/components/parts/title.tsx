import Image from 'next/image';
import React from 'react';

function Title() {
  return (
    <div className="flex space-x-2 items-center">
      <Image
        src="/icon.png"
        alt="YouTube Note Icon"
        height={40}
        width={40}
        style={{ objectFit: 'contain' }}
      />
      <p className="text-2xl font-extrabold align-middle">YouTube Note</p>
    </div>
  );
}

export default Title;
