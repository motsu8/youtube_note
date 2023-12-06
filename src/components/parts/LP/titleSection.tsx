import Image from 'next/image'
import React from 'react'

import { BTN_ACCENT } from '@/constants/buttonClass'
import { AUTH_SIGN_UP } from '@/constants/lp'

import Button from '../button'


interface TitleSectionProps {
  visibleFnc: (str: string) => void
}

function TitleSection({ visibleFnc }: TitleSectionProps) {
  return (
    <div className="w-3/4 h-1/2 flex justify-around items-center">
      <div className="space-y-8">
        <div>
          <p className="text-6xl">エンジニア志向</p>
          <p className="text-6xl">ノート学習アプリ</p>
        </div>
        <p className="w-96">
          YouTube動画を見ながら、マークダウンエディタでノートを取って学習することができます。
        </p>
        <Button
          title="新規登録"
          className={BTN_ACCENT}
          setClickHandler={() => visibleFnc(AUTH_SIGN_UP)}
        />
      </div>

      <Image
        src="/service.png"
        alt="サービスイメージ"
        height={350}
        width={500}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          boxShadow: '1px 2px 9px #aaaaaa',
        }}
      />
    </div>
  )
}

export default TitleSection