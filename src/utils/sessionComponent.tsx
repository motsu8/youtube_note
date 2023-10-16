import React from 'react';

import getSession from './getSession';

function GetSession() {
  return (
    <button
      type="button"
      className="hover:bg-slate-100"
      onClick={() => getSession()}
    >
      getSession
    </button>
  );
}

export default GetSession;
