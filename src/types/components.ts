import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Session } from '@supabase/supabase-js';

export type SideContent = {
  toggle: boolean;
  icon: IconProp;
  iconClass: string;
  iconColor: string;
  setClickHandler?: () => void;
  title: string;
};

export type DrawList = {
  title: string;
};

export type SupabaseSession = {
  session: Session | null;
};
