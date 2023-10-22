import { faFolder, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Library from '@/app/api/library';

import IconButton from './iconButton';

function Breadcrumb({
  bread,
  setCurrLibId,
}: {
  bread: Library[] | null;
  setCurrLibId: (id: string, title?: string) => void;
}) {
  const iconSize = 'h-8';
  const iconColor = '#bbbbbb';
  const bgClass = ['flex', 'justify-center', 'items-center'];

  return (
    <div className="flex space-x-4">
      {bread!.map((ele) => {
        if (ele.id === null)
          return (
            <div key={ele.id}>
              <IconButton
                icon={faFolder}
                iconClass={iconSize}
                bgClass={bgClass}
                color={iconColor}
                setClickHandler={() => setCurrLibId(ele.id as string)}
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
    </div>
  );
}

export default Breadcrumb;
