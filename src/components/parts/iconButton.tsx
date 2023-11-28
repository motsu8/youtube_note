'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from '@/types/parts';

export default function IconButton({
  icon,
  iconClass,
  bgClass,
  color,
  title,
  isDisabled,
  toggle,
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
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={title ?? 'ページ遷移ボタン'}
      >
        <FontAwesomeIcon icon={icon} className={iconClass} color={color} />
        {toggle === undefined ? (
          <p>{title}</p>
        ) : (
          <p className={toggle ? 'block' : 'hidden'}>{title}</p>
        )}
      </button>
    );
  }

  return (
    <div className={bgClass.join(' ')} aria-label={title}>
      <FontAwesomeIcon icon={icon} className={iconClass} color={color} />
      <p>{title}</p>
    </div>
  );
}
