'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from '@/types/parts';

export default function IconButton({
  icon,
  iconClass,
  bgClass,
  color,
  title,
  setClickHandler,
}: IconButton) {
  if (setClickHandler !== undefined) {
    return (
      <button
        type="button"
        onClick={() => {
          setClickHandler();
        }}
        className={bgClass.join(' ')}
      >
        <FontAwesomeIcon icon={icon} className={iconClass} color={color} />
        <p>{title}</p>
      </button>
    );
  }

  return (
    <div className={bgClass.join(' ')}>
      <FontAwesomeIcon icon={icon} className={iconClass} color={color} />
      <p>{title}</p>
    </div>
  );
}
