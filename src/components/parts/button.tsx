import React from 'react';

function Button({
  title,
  setClickHandler,
}: {
  title: string;
  setClickHandler: () => void;
}) {
  return (
    <button
      type="button"
      onClick={setClickHandler}
      className="bg-rose-300 py-2 px-4 rounded-lg shadow-md"
    >
      {title}
    </button>
  );
}

export default Button;
