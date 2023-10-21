import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Session } from '@supabase/supabase-js';

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

export type PostDocument = {
  session: Session | null;
  setClickHandler: () => void;
};
