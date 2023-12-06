'use client';

import React, { useEffect, useState } from 'react';

import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';
import { AUTH_SIGN_IN, AUTH_SIGN_UP, LP_TABS } from '@/constants/lp';

import Button from '../button';
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

  // スクロールイベント
  useEffect(() => {
    window.addEventListener('scroll', scrollFnc);
    return () => window.removeEventListener('scroll', scrollFnc);
  }, []);

  return (
    <div
      id="lp-header"
      className={`w-full flex justify-around z-50 items-center py-3 mb-1 shadow bg-white fixed duration-1000 left-0 ${
        isDown ? '-top-32' : 'top-0'
      }`}
    >
      <div className="w-3/4 flex justify-between">
        <div className="flex space-x-3 items-center">
          <Title />
          <ul className="pl-8 flex text-black font-bold space-x-4">
            {LP_TABS.map((ele) => {
              return (
                <li key={ele.key}>
                  <a href={ele.id}>{ele.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="auth">
          <Button
            title="ログイン"
            className={BTN_DEFAULT}
            setClickHandler={() => updateVisibleAuth(AUTH_SIGN_IN)}
          />
          <Button
            title="新規登録"
            className={BTN_ACCENT}
            setClickHandler={() => updateVisibleAuth(AUTH_SIGN_UP)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
