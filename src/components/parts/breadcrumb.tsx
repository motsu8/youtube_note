import { faFolder, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { ICON_COLOR } from '@/constants/iconBackGround';

import IconButton from './iconButton';

function Breadcrumb({
  bread,
  setCurrLibId,
}: {
  bread: any[] | null;
  setCurrLibId: (id: string, title?: string) => void;
}) {
  const iconSize = 'h-8';
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
                color={ICON_COLOR}
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
              color={ICON_COLOR}
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
