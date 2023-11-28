'use client';

import { useRouter } from 'next/navigation';

import { BG_CENTER } from '@/constants/iconBackGround';
import { SideContent } from '@/types/components';

import IconButton from './iconButton';

export default function SideContent({
  toggle,
  icon,
  iconClass,
  iconColor,
  title,
  url,
  session,
  hidden,
}: SideContent) {
  const router = useRouter();
  const setTransition = (link: string) => {
    if (session) {
      router.push(link);
    }
  };

  return (
    <div
      className={`${
        hidden ? 'hidden' : 'flex'
      } px-3 py-1 hover:bg-rose-200 items-center ${
        toggle ? 'justify-start space-x-4' : 'justify-center'
      }`}
    >
      <IconButton
        icon={icon}
        iconClass={iconClass}
        bgClass={BG_CENTER}
        color={iconColor}
        title={title}
        toggle={toggle}
        isDisabled={session === null}
        setClickHandler={() => setTransition(url)}
      />
    </div>
  );
}
