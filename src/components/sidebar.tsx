'use client';

import {
  faTags,
  faFilm,
  faHouse,
  faBookOpen,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

import { getSession } from '@/app/api/supabase';
import { ICON_COLOR, ICON_SIZE } from '@/constants/iconBackGround';

import SideContent from './parts/sideContent';

export default function Sidebar() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getSession();
      setSession(data);
    })();
  }, []);

  return (
    <div
      className={`flex w-60 shadow-inner sm:flex-col justify-between bg-main p-3 sm:pt-7 text-lg ${
        session ? 'block' : 'hidden'
      }`}
    >
      <div className="sm:space-y-7 flex sm:flex sm:flex-col w-full justify-around max-h-min">
        <SideContent
          icon={faHouse}
          iconClass={ICON_SIZE}
          iconColor={ICON_COLOR}
          title="ホーム"
          url="/home"
        />
        <SideContent
          icon={faFilm}
          iconClass={ICON_SIZE}
          iconColor={ICON_COLOR}
          title="プレイリスト"
          url="/play"
        />
        <SideContent
          icon={faBookOpen}
          iconClass={ICON_SIZE}
          iconColor={ICON_COLOR}
          title="ノート"
          url="/note"
        />
        <SideContent
          icon={faTags}
          iconClass={ICON_SIZE}
          iconColor={ICON_COLOR}
          title="単語帳"
          url="/card"
        />
      </div>

      <div className="hidden sm:block space-y-7">
        <SideContent
          icon={faGear}
          iconClass={ICON_SIZE}
          iconColor={ICON_COLOR}
          title="設定"
          url="/setting"
        />
      </div>
    </div>
  );
}
