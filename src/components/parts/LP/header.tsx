import Image from 'next/image'
import React from 'react'

import { BTN_BASE, BTN_ACCENT } from '@/constants/buttonClass'

import Button from '../button'


function Header() {
  const headerTab = [
    {
      key: 1,
      title: 'プレイリスト',
      id: '#section-playlist'
    },
    {
      key: 2,
      title: 'ノート',
      id: '#section-note'
    }
  ];

  return (
    <div id="header" className="w-full flex justify-around py-3">
      <div className="w-3/4 flex justify-between">
        <div className="flex space-x-3 items-center">
          <Image
            src="/icon.png"
            alt="YouTube Note Icon"
            height={40}
            width={40}
            style={{ objectFit: 'contain' }}
          />
          <p className="text-3xl font-extrabold align-middle">YouTube Note</p>
          <ul className="pl-8 flex text-black font-bold space-x-4">
            {headerTab.map(ele => {
              return (
                <li key={ele.key}>
                  <a href={ele.id}>
                    {ele.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="auth">
          <Button
            title="ログイン"
            className={BTN_BASE}
            setClickHandler={() => alert('click')}
          />
          <Button
            title="新規登録"
            className={BTN_ACCENT}
            setClickHandler={() => alert('click')}
          />
        </div>
      </div>
    </div>
  )
}

export default Header