import { faFolder, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import IconButton from './iconButton';

function Breadcrumb({
  bread,
  setCurrLibId,
}: {
  bread: string[] | null;
  setCurrLibId: (id: string) => void;
}) {
  const iconSize = 'h-8';
  const iconColor = '#bbbbbb';
  const bgClass = ['flex', 'justify-center', 'items-center'];

  return (
    <div className="flex space-x-4">
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
          <div key={ele} className="flex space-x-4">
            <IconButton
              icon={faChevronRight}
              iconClass={iconSize}
              bgClass={bgClass}
              color={iconColor}
            />
            <div>
              <button type="button" onClick={() => setCurrLibId(ele)}>
                {ele}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
