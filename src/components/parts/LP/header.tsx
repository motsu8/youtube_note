'use client';

import React, { useEffect, useState } from 'react';

import Menu from './menu';
import Title from '../title';

interface HeaderProps {
  updateVisibleAuth: (type: string) => void;
}

function Header({ updateVisibleAuth }: HeaderProps) {
  const [isDown, setIsDown] = useState(false);
  let scrollPosition = 0;

  /**
   * 上下判定
   * @returns boolean
   */
  const isDownScroll = () => scrollPosition < window.scrollY;

  /**
   * スクロールイベント関数
   */
  const scrollFnc = () => {
    setIsDown(isDownScroll());
    scrollPosition = window.scrollY;
  };

  /**
   * スクロールイベント
   */
  useEffect(() => {
    window.addEventListener('scroll', scrollFnc);
    return () => window.removeEventListener('scroll', scrollFnc);
  }, []);

  return (
    <div
      id="lp-header"
      className={`w-full flex justify-around z-10 items-center py-3 mb-1 shadow bg-white fixed duration-1000 left-0 ${
        isDown ? '-top-32' : 'top-0'
      }`}
    >
      <div className="w-full grid grid-cols-12 gap-4 px-8 lg:px-16 justify-between">
        <Title className="flex space-x-3 items-center col-span-8 md:col-span-4 xl:col-span-2" />
        <Menu updateVisibleAuth={updateVisibleAuth} />
      </div>
    </div>
  );
}

export default Header;
