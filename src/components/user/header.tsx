'use client';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { ICON_COLOR, ICON_SIZE } from '@/constants/iconBackGround';

import IconButton from '../parts/iconButton';
import Title from '../parts/title';

function UserHeader() {
  return (
    <div className="absolute w-full flex justify-between px-10 py-4 h-16 shadow">
      <Title />
      <IconButton
        icon={faUser}
        iconClass={ICON_SIZE}
        bgClass={['flex']}
        color={ICON_COLOR}
        setClickHandler={() => alert('click')}
      />
    </div>
  );
}

export default UserHeader;
