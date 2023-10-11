'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from '@/constants/type';

export default function IconButton({
  icon,
  size,
  color,
  setClickHandler,
}: IconButton) {
  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={async () => {
          await setClickHandler();
          alert('toggle');
        }}
      >
        <FontAwesomeIcon icon={icon} className={size} color={color} />
      </button>
    </div>
  );
}
