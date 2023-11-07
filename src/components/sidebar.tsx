'use client';

import {
  faChevronRight,
  faTags,
  faFilm,
  faHouse,
  faBookOpen,
  faChevronLeft,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

import { getSession } from '@/app/api/supabase';
import { BG_CENTER } from '@/constants/iconBackGround';

import IconButton from './parts/iconButton';
import SideContent from './parts/sideContent';

export default function Sidebar() {
  const iconSize = 'h-[50px]';
  const iconColor = '#bbbbbb';
  const [toggle, setToggle] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const toggleBar = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    (async () => {
      const data = await getSession();
      setSession(data);
    })();
  }, []);

  return (
    <div
      className={`flex w-full sm:flex-col justify-between bg-slate-100 sm:h-screen p-3 sm:pt-7 text-2xl ${
        toggle ? 'w-96' : 'sm:max-w-min'
      }`}
    >
      <div className="sm:space-y-7 flex sm:flex sm:flex-col w-full justify-around max-h-min">
        <div
          className={`hidden sm:flex items-center  ${
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
            icon={toggle ? faChevronLeft : faChevronRight}
            iconClass={iconSize}
            bgClass={BG_CENTER}
            color={iconColor}
            setClickHandler={toggleBar}
          />
        </div>

        <SideContent
          toggle={toggle}
          icon={faHouse}
          iconClass={iconSize}
          iconColor={iconColor}
          title="ホーム"
          url="/home"
          session={session}
        />
        <SideContent
          toggle={toggle}
          icon={faFilm}
          iconClass={iconSize}
          iconColor={iconColor}
          title="プレイリスト"
          url="/play"
          session={session}
        />
        <SideContent
          toggle={toggle}
          icon={faBookOpen}
          iconClass={iconSize}
          iconColor={iconColor}
          title="ノート"
          url="/note"
          session={session}
        />
        <SideContent
          toggle={toggle}
          icon={faTags}
          iconClass={iconSize}
          iconColor={iconColor}
          title="単語帳"
          url="/card"
          session={session}
        />
      </div>
      <div className="hidden sm:block space-y-7">
        <SideContent
          toggle={toggle}
          icon={faUser}
          iconClass={iconSize}
          iconColor={iconColor}
          title="ユーザー"
          url="/user"
          session={session}
        />
        <SideContent
          toggle={toggle}
          icon={faGear}
          iconClass={iconSize}
          iconColor={iconColor}
          title="設定"
          url="/setting"
          session={session}
        />
      </div>
    </div>
  );
}
