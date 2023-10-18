import { Session } from '@supabase/supabase-js';

import { Doc } from '@/types/schema';
import supabase from '@/utils/supabaseClient';

export default class Document {
  private session: Session | null | undefined;

  private type: string | undefined;

  private data: Doc[] | null;

  constructor(session: Session) {
    this.data = null;
    this.session = session;
  }

  private async fetchAllData() {
    const { data } = await supabase
      .from('Document')
      .select('*')
      .eq('user_id', this.session?.user.id);

    this.data = data;
  }

  public async postDocument(title: string, content: string) {
    const { data } = await supabase
      .from('Document')
      .insert([{ title, content, user_id: this.session!.user.id }])
      .select();
    console.log(data);
  }

  get getData() {
    return this.data;
  }
}
