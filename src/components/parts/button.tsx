import React from 'react';

function Button({
  title,
  setClickHandler,
  className,
}: {
  title: string;
  className: string;
  setClickHandler: () => void;
}) {
  return (
    <button type="button" onClick={setClickHandler} className={className}>
      {title}
    </button>
  );
}

export default Button;
