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

type thumbnail = {
  url: string;
  height: number;
  width: number;
};

export type VideoData = {
  channel: string;
  title: string;
  thumbnails: {
    default: thumbnail;
    high: thumbnail;
    maxres: thumbnail;
    medium: thumbnail;
    standard: thumbnail;
  };
};

export type ConfirmVideo = {
  visible: string;
  session: Session | null;
  videoData: VideoData | null;
};
