'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react';

import { TOP_RIGHT } from '@/constants/iconBackGround';

import IconButton from './iconButton';

function PopupContent({
  visible,
  children,
  height,
  width,
  closeFnc,
}: {
  visible: string | boolean;
  height: string;
  width: string;
  children: React.ReactNode;
  closeFnc: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (visible) {
      document.body.style.top = `${window.scrollY * -1}px`;
      document.body.style.position = 'fixed';
      modalRef.current!.style.top = `${window.scrollY * -1}px`;
    } else {
      const { top } = document.body.style;
      document.body.style.position = 'static';
      window.scrollTo(0, parseInt(top || '0', 10) * -1);
    }
  }, [visible]);

  const createClassStr = (strList: string[]) => strList.join(' ');

  return visible ? (
    <div className="w-full h-full fixed z-20 left-0 top-0" ref={modalRef}>
      <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          aria-label="mask"
          onClick={() => closeFnc()}
          className="w-full h-full relative bg-black opacity-80"
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-main rounded-md shadow-md p-4 ${createClassStr(
            [height, width]
          )}`}
        >
          <IconButton
            icon={faXmark}
            bgClass={TOP_RIGHT}
            color="#bbbbbb"
            iconClass="h-[20px]"
            setClickHandler={() => closeFnc()}
          />
          {children}
        </div>
      </div>
    </div>
  ) : null;
}

export default PopupContent;
