import { BG_CENTER } from '@/constants/iconBackGround';
import { SideContent } from '@/types/components';

import IconButton from './parts/iconButton';

export default function SideContent({
  toggle,
  icon,
  iconClass,
  iconColor,
  setClickHandler,
  title,
}: SideContent) {
  return (
    <div
      className={`flex px-3 items-center ${
        toggle ? 'justify-start space-x-4' : 'justify-center'
      }`}
    >
      <IconButton
        icon={icon}
        iconClass={iconClass}
        bgClass={BG_CENTER}
        color={iconColor}
        setClickHandler={toggle ? undefined : setClickHandler}
      />
      <button type="button" onClick={setClickHandler}>
        <p className={toggle ? 'block' : 'hidden'}>{title}</p>
      </button>
    </div>
  );
}
