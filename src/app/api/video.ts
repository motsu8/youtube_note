import { Session } from '@supabase/supabase-js';

import { VideoData } from '@/types/components';
import supabase from '@/utils/supabaseClient';

export default class Video {
  private session: Session | null;

  private data: any[] | null;

  constructor(session: Session | null) {
    this.data = null;
    this.session = session;
  }

  public async insertVideo(video: VideoData) {
    const { data, error } = await supabase
      .from('Video')
      .insert([
        {
          url: video.url,
          user_id: this.session?.user.id,
          thumbnail_width: video.thumbnails.standard.width,
          thumbnail_height: video.thumbnails.standard.height,
          thumbnail_url: video.thumbnails.standard.url,
          channel: video.channel,
          title: video.title,
        },
      ])
      .select();
    if (error) console.log(error);
    console.log(data);
  }

  public async fetchAllData() {
    const { data } = await supabase
      .from('Video')
      .select('*')
      .eq('user_id', this.session?.user.id);
    this.data = data;
  }

  public getRelationDocument(relationDocId: string | null) {
    return this.data?.filter((ele) => ele.doc_id === relationDocId);
  }

  public getData(videoId: string) {
    return this.data?.find((ele) => ele.id === videoId);
  }
}
