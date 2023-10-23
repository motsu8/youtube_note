import React from 'react';

function Button({
  title,
  setClickHandler,
  className,
}: {
  title: string;
  className: string[];
  setClickHandler: () => void;
}) {
  const classStr = className.join(' ');

  return (
    <button type="button" onClick={setClickHandler} className={classStr}>
      {title}
    </button>
  );
}

export default Button;
