import React from 'react';

import NoteTabs from './noteTabs';

function NoteDetail() {
  return (
    <>
      <NoteTabs />
      <textarea className="bg-stone-100 p-3 h-full w-full overflow-auto rounded-b-lg" />
    </>
  );
}

export default NoteDetail;
