import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

interface Data {
  title: any;
  created_at: any;
  id: any;
  content: any;
  lib_id: any;
}

export default class Document {
  private session: Session | null | undefined;

  private type: string | undefined;

  private data: Data[] | null;

  constructor(session: Session | null) {
    this.data = null;
    this.session = session;
  }

  public async fetchAllData() {
    const { data } = await supabase
      .from('Document')
      .select('title,created_at,id,lib_id,content')
      .eq('user_id', this.session?.user.id);
    this.data = data;
  }

  public getFiles(libId: string | null) {
    return this.data?.filter((ele) => ele.lib_id === libId);
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

  public async postTitle(title: string, lib: string | null) {
    const { data } = await supabase
      .from('Document')
      .insert([{ title, lib_id: lib, user_id: this.session!.user.id }])
      .select();
    console.log(data);
  }

  get getData() {
    return this.data;
  }
}
