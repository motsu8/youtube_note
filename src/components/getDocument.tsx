import React from 'react';

import supabase from '@/utils/supabaseClient';

async function GetDocument() {
  const { data } = await supabase.auth.getSession();
  const document = await supabase
    .from('Document')
    .select('*')
    .eq('user_id', data.session?.user.id);

  return (
    <div className="bg-slate-200 w-1/2 p-2 space-x-3 space-y-2">
      <p>Get Document</p>
      {document!.data!.map((doc) => {
        return (
          <div key={doc.id} className="bg-stone-100 max-w-max">
            <p>title: {doc.title}</p>
            <p>content: {doc.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default GetDocument;
