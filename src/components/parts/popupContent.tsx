import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react';

import { TOP_RIGHT } from '@/constants/iconBackGround';

import IconButton from './iconButton';

function PopupContent({
  visible,
  children,
  closeFnc,
}: {
  visible: string;
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

  return visible ? (
    <div className="w-screen h-screen fixed" ref={modalRef}>
      <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          aria-label="mask"
          onClick={() => closeFnc()}
          className="w-screen h-screen bg-black opacity-80 "
        />
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-main rounded-md shadow-md p-4 w-1/3 h-1/2 ">
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
