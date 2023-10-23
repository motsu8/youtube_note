import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Session } from '@supabase/supabase-js';

export type SideContent = {
  toggle: boolean;
  icon: IconProp;
  iconClass: string;
  iconColor: string;
  title: string;
  url: string;
  session: Session | null;
};

interface LibData {
  title: any;
  created_at: any;
  id: any;
  libs: any;
}

export type DrawList = {
  title: string;
  type: string;
  drawList: LibData[] | null;
  files:
    | {
        title: any;
        created_at: any;
        content: any;
        id: any;
      }[]
    | null;
  setCurrentLibrary: (id: string, title: string) => void;
  setCurrFile: (id: string | null) => void;
  setDeleteList: (id: string) => void;
  changeDeleteList: (id: string) => void;
};

export type SupabaseSession = {
  session: Session | null;
};

export type VideoData = {
  url: string;
  channel: string;
  title: string;
  thumbnails: {
    default: {
      url: string;
      height: number;
      width: number;
    };
    high: {
      url: string;
      height: number;
      width: number;
    };
    maxres: {
      url: string;
      height: number;
      width: number;
    };
    medium: {
      url: string;
      height: number;
      width: number;
    };
    standard: {
      url: string;
      height: number;
      width: number;
    };
  };
};

export type ConfirmVideo = {
  visible: boolean;
  session: Session | null;
  videoData: VideoData | null;
  setVisible: (variable: boolean) => void;
  setVideoData: (variable: VideoData | null) => void;
};
