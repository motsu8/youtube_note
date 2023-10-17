import React from 'react';

import Document from '@/app/api/document';

import getSession from './getSession';

function GetSession() {
  const doc = new Document();

  const getData = () => {
    console.log(doc);
  };

  return (
    <button
      type="button"
      className="hover:bg-slate-100"
      onClick={() => {
        getSession();
        getData();
      }}
    >
      getSession
    </button>
  );
}

export default GetSession;
