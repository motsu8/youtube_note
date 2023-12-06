import React from 'react'

import { BTN_ACCENT } from '@/constants/buttonClass'
import { AUTH_SIGN_UP } from '@/constants/lp'

import Button from '../button'

interface EntrySectionProps{
    visibleFnc: (str: string) => void
}

function EntrySection({visibleFnc}: EntrySectionProps) {
  return (
    <div className="w-full bg-main py-20 space-y-10 flex flex-col justify-center items-center shadow-sm h-full">
    <p className="text-3xl">無料で始める</p>
    <Button
      title="新規登録"
      className={BTN_ACCENT}
      setClickHandler={() => visibleFnc(AUTH_SIGN_UP)}
    />
  </div>
  )
}

export default EntrySection