'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';
import { AUTH_SIGN_IN, AUTH_SIGN_UP, LP_TABS } from '@/constants/lp';

import Button from '../button';

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
      className={`w-full flex justify-around py-3 mb-1 shadow bg-white fixed duration-1000 ${
        isDown ? '-top-32' : 'top-0'
      }`}
    >
      <div className="w-3/4 flex justify-between">
        <div className="flex space-x-3 items-center">
          <Image
            src="/icon.png"
            alt="YouTube Note Icon"
            height={40}
            width={40}
            style={{ objectFit: 'contain' }}
          />
          <p className="text-3xl font-extrabold align-middle">YouTube Note</p>
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
