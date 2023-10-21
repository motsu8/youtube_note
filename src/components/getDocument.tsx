import React from 'react';

import Document from '@/app/api/document';
import { SupabaseSession } from '@/types/components';

async function GetDocument({ session }: SupabaseSession) {
  const document = new Document(session!);

  return (
    <div className="bg-slate-200 w-11/12 p-2 space-x-3 space-y-2">
      <p>Get Document</p>
      {document.getData!.map((doc) => {
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
