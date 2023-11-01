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
}: SideContent) {
  const setTransition = (link: string) => {
    if (session) {
      window.location.href = link;
    }
  };

  return (
    <div
      className={`flex px-3 py-1 hover:bg-neutral-200 items-center ${
        toggle ? 'justify-start space-x-4' : 'justify-center'
      }`}
    >
      <IconButton
        icon={icon}
        iconClass={iconClass}
        bgClass={BG_CENTER}
        color={iconColor}
        setClickHandler={() => setTransition(url)}
      />
      <button type="button" onClick={() => setTransition(url)}>
        <p className={toggle ? 'block' : 'hidden'}>{title}</p>
      </button>
    </div>
  );
}
