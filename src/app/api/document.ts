import { Session } from '@supabase/supabase-js';

import { Doc } from '@/types/schema';
import supabase from '@/utils/supabaseClient';

import User from './user';

export default class Document {
  private session: Session | null | undefined;

  private type: string | undefined;

  private data: Doc[] | null | undefined;

  constructor() {
    this.getAllData();
  }

  private async getAllData() {
    this.session = await User.getSession();
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
}
