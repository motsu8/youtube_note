import React from 'react';

import { BTN_PINK } from '@/constants/buttonClass';

import Button from './parts/button';

const PlayTab = React.memo(({
  tab,
  draw,
  setTab,
  deleteAction,
  setCreatePlayList,
}: {
  draw: boolean;
  tab: number;
  deleteAction: () => void;
  setTab: (num: number) => void;
  setCreatePlayList: (bool: boolean) => void;
}) => {
  const popBtn = BTN_PINK.concat(draw ? 'block' : 'hidden');
  return (
    <div className="flex justify-between w-11/12 mb-5 px-3 py-3 sm:px-12 sm:py-3 border-b text-sm sm:text-base">
      <div className="flex space-x-3 sm:space-x-10">
        <button
          type="button"
          className={tab === 0 ? 'border-b' : ''}
          onClick={() => setTab(0)}
        >
          動画
        </button>
        <button
          type="button"
          className={tab === 1 ? 'border-b' : ''}
          onClick={() => setTab(1)}
        >
          プレイリスト
        </button>
      </div>
      <div className="space-x-2 flex">
        <Button
          title="削除する"
          className={popBtn}
          setClickHandler={() => deleteAction()}
        />
        <Button
          title="プレイリスト作成"
          className={BTN_PINK}
          setClickHandler={() => setCreatePlayList(true)}
        />
      </div>
    </div>
  );
});

PlayTab.displayName = 'PlayTab';

export default PlayTab;
