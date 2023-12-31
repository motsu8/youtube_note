import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Session } from '@supabase/supabase-js';

export type SideContent = {
  icon: IconProp;
  iconClass: string;
  iconColor: string;
  title: string;
  url: string;
  hidden?: boolean;
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
  message?: string;
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
  setDeleteList: (id: string, type: string) => void;
  changeDeleteList: (id: string, type: string) => void;
  setDeleteFile: (id: string) => void;
  changeDeleteFile: (id: string) => void;
};

export type DrawVideosProps = {
  videos: any[];
  visible: number;
  id: number;
  isGrid?: boolean;
  jumpToNote?: (videoId: string) => void;
  setCheckboxAction?: (dbId: string, checked: boolean) => void;
};

export type SupabaseSession = {
  session: Session | null;
};

export type VideoData = {
  url: string;
  channel: string;
  title: string;
  channel_thumbnails: {
    default: {
      url: string;
      height: number;
      width: number;
    };
    medium: {
      url: string;
      height: number;
      width: number;
    };
    high: {
      url: string;
      height: number;
      width: number;
    };
  };
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
  videoData: VideoData | null;
  addVideo: () => void;
  setVisible: (variable: boolean) => void;
  setVideoData: (variable: VideoData | null) => void;
};
