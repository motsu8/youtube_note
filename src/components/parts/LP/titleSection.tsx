import React from 'react';

import { BTN_ACCENT } from '@/constants/buttonClass';
import { AUTH_SIGN_UP } from '@/constants/lp';

import Button from '../button';

interface TitleSectionProps {
  visibleFnc: (str: string) => void;
}

function TitleSection({ visibleFnc }: TitleSectionProps) {
  return (
    <div
      id="section-title"
      className="w-full h-full absolute flex flex-col items-start justify-start px-12 lg:px-48 py-32 xl:justify-start xl:items-start"
    >
      <div className="space-y-8">
        <p className="text-6xl">エンジニア志向ノート学習アプリ</p>
        <p className="w-96">
          YouTube動画を見ながら、マークダウンエディタでノートを取って学習することができます。
        </p>
        <Button
          title="新規登録"
          className={BTN_ACCENT}
          setClickHandler={() => visibleFnc(AUTH_SIGN_UP)}
        />
      </div>
    </div>
  );
}

export default TitleSection;
