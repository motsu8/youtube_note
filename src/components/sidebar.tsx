import {
  faMagnifyingGlass,
  faChevronRight,
  faTags,
  faFilm,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

import IconButton from './parts/iconButton';

async function toggleBar() {
  'use server';

  console.log('toggle!!!');
  return null;
}

export default async function Sidebar() {
  const iconClass = 'h-[50px]';
  const iconColor = '#bbbbbb';

  return (
    <div className="flex flex-col bg-slate-100 h-screen p-3 pt-7 space-y-7">
      <IconButton
        icon={faChevronRight}
        size={iconClass}
        color={iconColor}
        setClickHandler={toggleBar}
      />
      <IconButton
        icon={faMagnifyingGlass}
        size={iconClass}
        color={iconColor}
        setClickHandler={toggleBar}
      />
      <IconButton
        icon={faFilm}
        size={iconClass}
        color={iconColor}
        setClickHandler={toggleBar}
      />
      <IconButton
        icon={faBookOpen}
        size={iconClass}
        color={iconColor}
        setClickHandler={toggleBar}
      />
      <IconButton
        icon={faTags}
        size={iconClass}
        color={iconColor}
        setClickHandler={toggleBar}
      />
    </div>
  );
}
