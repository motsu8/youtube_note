import React, { useState } from 'react';

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
  const [tab, setTab] = useState(0);
  const updateTab = (num: number) => {
    setTab(num);
  };
  return (
    <>
      <NoteTabs saveContent={saveContent} updateTab={updateTab} tab={tab} />
      <textarea
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        className={`bg-stone-100 p-3 h-full w-full overflow-auto rounded-b-lg ${
          tab === 0 ? 'block' : 'hidden'
        }`}
      />
      <div
        className={`bg-stone-100 p-3 h-full w-full overflow-auto rounded-b-lg ${
          tab === 1 ? 'block' : 'hidden'
        }`}
      >
        {content}
      </div>
    </>
  );
}

export default NoteDetail;
