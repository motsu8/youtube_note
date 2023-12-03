'use client';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ICON_COLOR, ICON_SIZE } from '@/constants/iconBackGround';

import IconButton from '../parts/iconButton';
import Title from '../parts/title';

function UserHeader() {
  const router = useRouter();
  const jumpToUser = () => router.push('/user');

  return (
    <div className="absolute w-full flex justify-between items-center px-10 py-1 h-16 shadow">
      <Title />
      <IconButton
        icon={faUser}
        iconClass={ICON_SIZE}
        bgClass={['hover:bg-main-dark', 'rounded-full', 'w-12', 'h-12']}
        color={ICON_COLOR}
        setClickHandler={() => jumpToUser()}
      />
    </div>
  );
}

export default UserHeader;
