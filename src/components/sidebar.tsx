'use client';

import {
  faMagnifyingGlass,
  faChevronRight,
  faTags,
  faFilm,
  faBookOpen,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { BG_CENTER } from '@/constants/iconBackGround';

import IconButton from './parts/iconButton';
import SideContent from './sideContent';

export default function Sidebar() {
  const iconSize = 'h-[50px]';
  const iconColor = '#bbbbbb';
  const [toggle, setToggle] = useState(false);

  const toggleBar = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className={`flex flex-col bg-slate-100 h-screen p-3 pt-7 space-y-7 text-2xl ${
        toggle ? 'w-96' : 'max-w-min'
      }`}
    >
      <div
        className={`flex items-center ${
          toggle ? 'justify-around' : 'justify-center'
        }`}
      >
        <FontAwesomeIcon
          icon={faBookOpen}
          className={`${iconSize} ${toggle ? 'block' : 'hidden'}`}
          color={iconColor}
        />
        <div className={`${toggle ? 'block' : 'hidden'}`}>
          <p>YouTube</p>
          <p>Note</p>
        </div>
        <IconButton
          icon={toggle ? faChevronRight : faChevronLeft}
          iconClass={iconSize}
          bgClass={BG_CENTER}
          color={iconColor}
          setClickHandler={toggleBar}
        />
      </div>

      <SideContent
        toggle={toggle}
        icon={faMagnifyingGlass}
        iconClass={iconSize}
        iconColor={iconColor}
        setClickHandler={toggleBar}
        title="検索"
      />

      <SideContent
        toggle={toggle}
        icon={faFilm}
        iconClass={iconSize}
        iconColor={iconColor}
        setClickHandler={toggleBar}
        title="プレイリスト"
      />
      <SideContent
        toggle={toggle}
        icon={faBookOpen}
        iconClass={iconSize}
        iconColor={iconColor}
        setClickHandler={toggleBar}
        title="ノート"
      />
      <SideContent
        toggle={toggle}
        icon={faTags}
        iconClass={iconSize}
        iconColor={iconColor}
        setClickHandler={toggleBar}
        title="単語帳"
      />
    </div>
  );
}
