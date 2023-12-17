'use client';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLenis } from '@studio-freight/react-lenis';
import React, { useState } from 'react';

import { BTN_ACCENT, BTN_DEFAULT } from '@/constants/buttonClass';
import { ICON_COLOR, ICON_SIZE } from '@/constants/iconBackGround';
import { AUTH_SIGN_IN, AUTH_SIGN_UP, LP_TABS } from '@/constants/lp';

import Button from '../button';
import IconButton from '../iconButton';
import PopupContent from '../popupContent';

interface MenuProps {
  updateVisibleAuth: (type: string) => void;
}

function Menu({ updateVisibleAuth }: MenuProps) {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const lenis = useLenis();

  const updateVisibleMenu = () => {
    const position = visibleMenu ? 'static' : 'fixed';
    setVisibleMenu(!visibleMenu);
    document.body.style.position = position;
  };

  const closeMenu = () => {
    setVisibleMenu(false);
    document.body.style.position = 'static';
  };

  /**
   * アンカージャンプ
   */
  const anchorJump = (id: string) => lenis.scrollTo(id, { offset: 0 });

  return (
    <div
      id="menu"
      className="col-span-4 md:col-span-8 xl:col-span-10 flex justify-end lg:justify-between items-center relative"
    >
      <IconButton
        iconClass={ICON_SIZE}
        bgClass={['lg:hidden z-50']}
        color={ICON_COLOR}
        setClickHandler={updateVisibleMenu}
        icon={visibleMenu ? faXmark : faBars}
      />
      <ul className="hidden lg:flex items-center justify-around text-black font-bold lg:space-x-10">
        {LP_TABS.map((ele) => {
          return (
            <li key={ele.key}>
              <button
                type="button"
                onClick={() => {
                  anchorJump(ele.id);
                  closeMenu();
                }}
              >
                {ele.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="lg:flex hidden">
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

      <PopupContent
        visible={visibleMenu}
        height="h-1/2"
        width="w-3/4"
        closeFnc={closeMenu}
        closeBtn={false}
      >
        <ul className="w-full h-full flex flex-col items-center justify-around text-black font-bold z-50">
          {LP_TABS.map((ele) => {
            return (
              <li
                key={ele.key}
                className="w-full p-3 hover:bg-main-dark flex justify-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    setTimeout(() => {
                      anchorJump(ele.id);
                    }, 500);
                  }}
                >
                  {ele.title}
                </button>
              </li>
            );
          })}
          <div className="flex space-x-5">
            <Button
              title="ログイン"
              className={BTN_DEFAULT}
              setClickHandler={() => {
                updateVisibleAuth(AUTH_SIGN_IN);
                closeMenu();
              }}
            />
            <Button
              title="新規登録"
              className={BTN_ACCENT}
              setClickHandler={() => {
                updateVisibleAuth(AUTH_SIGN_UP);
                closeMenu();
              }}
            />
          </div>
        </ul>
      </PopupContent>
    </div>
  );
}

export default Menu;
