import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type IconButton = {
  icon: IconProp;
  size: string;
  color: string;
  setClickHandler: () => void;
};
