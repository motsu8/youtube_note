import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

export default class Document {
  private session: Session | null | undefined;

  private type: string | undefined;

  private data:
    | {
        title: any;
        created_at: any;
      }[]
    | null;

  constructor(session: Session | null) {
    this.data = null;
    this.session = session;
  }

  public async fetchData(key: string | null): Promise<any> {
    if (key === null) {
      const { data } = await supabase
        .from('Document')
        .select('title,created_at,content,id')
        .eq('user_id', this.session?.user.id)
        .is('lib_id', key);
      this.data = data;
      return data;
    }
    const { data } = await supabase
      .from('Document')
      .select('title,created_at,content,id')
      .eq('user_id', this.session?.user.id)
      .eq('lib_id', key);
    this.data = data;
    return data;
  }

  public async postDocument(title: string, content: string) {
    const { data, error } = await supabase
      .from('Document')
      .insert([{ title, content, user_id: this.session!.user.id }])
      .select();
    console.log(data);
    console.log(error);
  }

  get getData() {
    return this.data;
  }
}
