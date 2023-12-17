import Image from 'next/image';
import React from 'react';

interface Props {
  className?: string;
}

function Title({ className }: Props) {
  return (
    <div className={className}>
      <Image
        src="/icon.png"
        alt="YouTube Note Icon"
        height={40}
        width={40}
        style={{ objectFit: 'contain' }}
      />
      <p className="text-lg lg:text-2xl font-extrabold align-middle">
        YouTube Note
      </p>
    </div>
  );
}

export default Title;
