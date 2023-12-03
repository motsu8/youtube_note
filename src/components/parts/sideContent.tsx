'use client';

import { useRouter } from 'next/navigation';

import { BG_CENTER } from '@/constants/iconBackGround';
import { SideContent } from '@/types/components';

import IconButton from './iconButton';

export default function SideContent({
  icon,
  iconClass,
  iconColor,
  title,
  url,
}: SideContent) {
  const router = useRouter();
  const setTransition = (link: string) => router.push(link);

  return (
    <button
      type="button"
      onClick={() => setTransition(url)}
      className="w-full flex justify-start px-3 py-1 hover:bg-main-dark items-center"
    >
      <IconButton
        icon={icon}
        iconClass={iconClass}
        bgClass={BG_CENTER}
        color={iconColor}
        title={title}
      />
    </button>
  );
}
