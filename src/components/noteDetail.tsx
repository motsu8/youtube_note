import React from 'react';

import NoteTabs from './noteTabs';

function NoteDetail({
  saveContent,
  updateContent,
  content,
}: {
  content: string;
  saveContent: () => void;
  updateContent: (str: string) => void;
}) {
  return (
    <>
      <NoteTabs saveContent={saveContent} />
      <textarea
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        className="bg-stone-100 p-3 h-full w-full overflow-auto rounded-b-lg"
      />
    </>
  );
}

export default NoteDetail;
