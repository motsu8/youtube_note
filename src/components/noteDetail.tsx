import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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

  const defaultClass = [
    'bg-stone-100',
    'p-5',
    'h-full',
    'w-full',
    'overflow-auto',
    'rounded-b-lg',
  ];

  const textareaClass = defaultClass.concat(tab === 0 ? 'block' : 'hidden');
  const markdownClass = defaultClass.concat([
    tab === 1 ? 'block' : 'hidden',
    'markdown-preview',
  ]);

  return (
    <>
      <NoteTabs saveContent={saveContent} updateTab={updateTab} tab={tab} />
      <textarea
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        className={textareaClass.join(' ')}
      />
      <ReactMarkdown className={markdownClass.join(' ')}>
        {content}
      </ReactMarkdown>
    </>
  );
}

export default NoteDetail;
