'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from '@/types/parts';

export default function IconButton({
  icon,
  iconClass,
  bgClass,
  color,
  setClickHandler,
}: IconButton) {
  if (setClickHandler !== undefined) {
    return (
      <div className={bgClass.join(' ')}>
        <button
          type="button"
          onClick={() => {
            setClickHandler();
          }}
        >
          <FontAwesomeIcon icon={icon} className={iconClass} color={color} />
        </button>
      </div>
    );
  }

  return (
    <div className={bgClass.join(' ')}>
      <FontAwesomeIcon icon={icon} className={iconClass} color={color} />
    </div>
  );
}
