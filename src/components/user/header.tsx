import { faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React from 'react';

import { ICON_COLOR, ICON_SIZE } from '@/constants/iconBackGround';

import IconButton from '../parts/iconButton';
import Title from '../parts/title';

function UserHeader() {
  return (
    <div className="absolute w-full flex justify-between items-center px-10 py-1 h-16 shadow">
      <Title className="flex space-x-3 items-center" />
      <Link href="/user">
        <IconButton
          icon={faUser}
          iconClass={`${ICON_SIZE} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          bgClass={[
            'hover:bg-main-dark',
            'relative',
            'rounded-full',
            'w-12',
            'h-12',
          ]}
          color={ICON_COLOR}
        />
      </Link>
    </div>
  );
}

export default UserHeader;
