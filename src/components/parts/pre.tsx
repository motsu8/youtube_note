import React from 'react';
import Syntaxhighlighter from 'react-syntax-highlighter/dist/cjs/default-highlight';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import type { ClassAttributes, HTMLAttributes } from 'react';
import type { ExtraProps } from 'react-markdown';

// シンタックスハイライト
export default function Pre({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) {
  if (!children || typeof children !== 'object') {
    return <code {...props}>{children}</code>;
  }
  const childType = 'type' in children ? children.type : '';

  if (childType !== 'code') {
    return <code {...props}>{children}</code>;
  }
  const childProps = 'props' in children ? children.props : {};
  const { className, children: code } = childProps;
  const classList = className ? className.split(':') : [];
  const language = classList[0].replace('language-', '');
  const fileName = classList[1];

  const preStyle: React.CSSProperties = {
    borderBottomLeftRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    borderTopLeftRadius: fileName ? '0' : '0.5rem',
    borderTopRightRadius: fileName ? '0' : '0.5rem',
  };

  return (
    <div className="w-3/4 shadow-xl">
      {fileName && (
        <div className="bg-neutral-300 rounded-t pl-2">
          <span>{fileName}</span>
        </div>
      )}
      <Syntaxhighlighter
        customStyle={preStyle}
        language={language}
        style={darcula}
      >
        {String(code).replace(/\n$/, '')}
      </Syntaxhighlighter>
    </div>
  );
}
