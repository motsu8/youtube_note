import { faFolder, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Library from '@/app/api/library';

import IconButton from './iconButton';

interface Data {
  title: any;
  created_at: any;
  id: any;
  content: any;
  lib_id: any;
}

function Breadcrumb({
  bread,
  setCurrLibId,
  file,
}: {
  bread: Library[] | null;
  file: Data;
  setCurrLibId: (id: string, title?: string) => void;
}) {
  const iconSize = 'h-8';
  const iconColor = '#bbbbbb';
  const bgClass = ['flex', 'justify-center', 'items-center'];

  if (bread === null) return <p>Loading...</p>;

  return (
    <div className="flex space-x-4 items-center">
      {bread!.map((ele) => {
        if (ele === null)
          return (
            <div key={ele}>
              <IconButton
                icon={faFolder}
                iconClass={iconSize}
                bgClass={bgClass}
                color={iconColor}
                setClickHandler={() => setCurrLibId(ele)}
              />
            </div>
          );
        return (
          <div key={ele.id} className="flex space-x-4">
            <IconButton
              icon={faChevronRight}
              iconClass={iconSize}
              bgClass={bgClass}
              color={iconColor}
            />
            <div>
              <button
                type="button"
                onClick={() => setCurrLibId(ele.id as string)}
              >
                {ele.title}
              </button>
            </div>
          </div>
        );
      })}
      {file ? (
        <div key={file.id} className="flex space-x-4">
          <IconButton
            icon={faChevronRight}
            iconClass={iconSize}
            bgClass={bgClass}
            color={iconColor}
          />
          <div>
            <button type="button">{file.title}</button>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Breadcrumb;
