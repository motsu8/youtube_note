import React from 'react';

import { BTN_ACCENT } from '@/constants/buttonClass';
import { AUTH_SIGN_UP, ContentObject, LP_ENTRY } from '@/constants/lp';

import Button from '../button';

interface EntrySectionProps {
  visibleFnc: (str: string) => void;
}

function EntrySection({ visibleFnc }: EntrySectionProps) {
  return (
    <div className="w-3/4 flex flex-col justify-center items-center space-y-5">
      {LP_ENTRY.map(({ key, content, className }: ContentObject) => (
        <p key={key} className={className}>
          {content}
        </p>
      ))}
      <Button
        title="今すぐ始める"
        className={BTN_ACCENT}
        setClickHandler={() => visibleFnc(AUTH_SIGN_UP)}
      />
    </div>
  );
}

export default EntrySection;
