import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Session } from '@supabase/supabase-js';

import { VideoData } from './components';

export type IconButton = {
  icon: IconProp;
  iconClass: string;
  bgClass: string[];
  color: string;
  setClickHandler?: () => void;
};

export type Search = {
  placeholder: string;
  session: Session | null;
  videoUrl: string;
  setVideoUrl: (content: string) => void;
  setVideoData: (content: VideoData) => void;
  setVisible: (bool: boolean) => void;
};
