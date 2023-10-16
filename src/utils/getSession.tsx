import React from 'react';

import supabase from './supabaseClient';

const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  console.log(data.session);
};

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
