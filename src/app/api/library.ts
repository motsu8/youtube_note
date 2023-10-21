import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

export default class Library {
  public session: Session | null;

  public libs: string[] | undefined;

  constructor(session: Session | null) {
    this.session = session;
  }

  public async insertData(title: string) {
    const { data } = await supabase
      .from('Library')
      .insert([{ title, user_id: this.session?.user.id }])
      .select();
    console.log(data);
  }

  public async getAllData(): Promise<{ title: string }[] | null> {
    const { data } = await supabase
      .from('Library')
      .select('title')
      .eq('user_id', this.session?.user.id);
    return data;
  }
}
