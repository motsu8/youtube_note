import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import NoteTabs from './noteTabs';
import Pre from './parts/pre';

function NoteDetail({
  saveContent,
  updateContent,
  content,
  updateMarkdownString,
  markdownString,
}: {
  content: string;
  markdownString: string;
  saveContent: () => void;
  updateContent: (str: string) => void;
  updateMarkdownString: () => void;
}) {
  const [tab, setTab] = useState(0);

  const updateTab = (num: number) => {
    if (num === 1) updateMarkdownString();
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
    'rounded-b',
  ]);

  return (
    <div className="w-full h-full flex flex-col">
      <NoteTabs saveContent={saveContent} updateTab={updateTab} tab={tab} />
      <textarea
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        className={textareaClass.join(' ')}
      />
      <ReactMarkdown
        components={{ pre: Pre }}
        className={markdownClass.join(' ')}
        remarkPlugins={[remarkGfm]}
      >
        {markdownString}
      </ReactMarkdown>
    </div>
  );
}

export default NoteDetail;
