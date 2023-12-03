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
    'bg-white',
    'p-5',
    'h-full',
    'w-full',
    'overflow-auto',
    'rounded-b-lg',
  ];

  const markdownClass = defaultClass.concat(['markdown-preview', 'rounded-b']);

  return (
    <div className="w-full h-full flex flex-col border rounded-t-lg">
      <NoteTabs saveContent={saveContent} updateTab={updateTab} tab={tab} />
      {tab === 0 ? (
        <textarea
          value={content}
          onChange={(e) => updateContent(e.target.value)}
          className={defaultClass.join(' ')}
        />
      ) : (
        <ReactMarkdown
          components={{ pre: Pre }}
          className={markdownClass.join(' ')}
          remarkPlugins={[remarkGfm]}
        >
          {markdownString}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default NoteDetail;
