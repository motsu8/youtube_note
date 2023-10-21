import { Session } from '@supabase/supabase-js';

import { VideoData } from '@/types/components';
import supabase from '@/utils/supabaseClient';

export default class Video {
  private session: Session | null;

  private videoData: VideoData | null;

  constructor(session: Session | null) {
    this.videoData = null;
    this.session = session;
  }

  public async insertVideo(video: VideoData) {
    this.videoData = video;
    const { data, error } = await supabase
      .from('Video')
      .insert([
        {
          url: this.videoData.url,
          user_id: this.session?.user.id,
          thumbnail_width: this.videoData.thumbnails.standard.width,
          thumbnail_height: this.videoData.thumbnails.standard.height,
          thumbnail_url: this.videoData.thumbnails.standard.url,
          channel: this.videoData.channel,
          title: this.videoData.title,
        },
      ])
      .select();
    if (error) console.log(error);
    console.log(data);
  }
}
