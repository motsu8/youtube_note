import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type IconButton = {
  icon: IconProp;
  iconClass: string;
  bgClass: string[];
  color: string;
  setClickHandler: () => void;
};

export type Search = {
  placeholder: string;
  setInputValue: (content: string) => void;
  setSubmitAction: () => void;
};
