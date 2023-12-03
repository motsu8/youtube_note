'use client';

import {
  faTags,
  faFilm,
  faHouse,
  faBookOpen,
  // faGear,
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

  return session ? (
    <div className="bg-main text-lg w-full md:w-60 flex flex-row md:flex-col md:space-y-5 md:pt-5 justify-start max-h-min">
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
  ) : null;
}
