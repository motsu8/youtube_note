import React from 'react';

function PlayTab({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (num: number) => void;
}) {
  return (
    <div className="flex justify-between w-11/12 mb-5 px-12 py-3 border-b">
      <div className="flex space-x-10">
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
      <div>新規作成</div>
    </div>
  );
}

export default PlayTab;
