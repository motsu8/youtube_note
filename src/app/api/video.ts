import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

export default class Video {
  private session: Session | null;

  constructor(session: Session | null) {
    this.session = session;
  }

  public async insertVideo(url: string) {
    console.log(this.session);
    const { data } = await supabase
      .from('Video')
      .insert([{ url, user_id: this.session?.user.id }])
      .select();
    console.log(data);
  }
}
