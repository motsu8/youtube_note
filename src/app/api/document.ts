import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

interface Data {
  title: any;
  created_at: any;
  id: any;
  content: any;
  lib_id: any;
  video_id: any;
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
      .select('title,created_at,id,lib_id,content,video_id')
      .eq('user_id', this.session?.user.id);
    this.data = data;
  }

  public getFiles(id: string | null) {
    return this.data?.filter((ele) => ele.lib_id === id);
  }

  public getFilesRelationalVideo(videoId: string | null) {
    return this.data?.filter((ele) => ele.video_id === videoId);
  }

  public getFile(id: string | null) {
    return this.data?.find((ele) => ele.id === id);
  }

  public async delete(list: string[]) {
    const results = [];
    for (const id of list) {
      results.push(
        supabase
          .from('Document')
          .delete()
          .eq('user_id', this.session?.user.id)
          .eq('id', id)
      );
    }
    await Promise.all(results);
    return this.fetchAllData();
  }

  public async postDocument(title: string, content: string) {
    const { data, error } = await supabase
      .from('Document')
      .insert([{ title, content, user_id: this.session!.user.id }])
      .select();
    console.log(data);
    console.log(error);
  }

  public async updateContent(id: string, content: string) {
    const { data } = await supabase
      .from('Document')
      .update({ content })
      .eq('id', id)
      .eq('user_id', this.session?.user.id)
      .select();
    console.log(data);
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

  public async insertDocument(title: string, videoId: string, libId: string) {
    const { data, error } = await supabase
      .from('Document')
      .insert([
        {
          title,
          lib_id: libId,
          user_id: this.session!.user.id,
          video_id: videoId,
        },
      ])
      .select();
    if (error) alert(error.message);
    console.log(data);
  }

  public async relateVideo(fileId: string, videoId: string) {
    const { data, error } = await supabase
      .from('Document')
      .update({ video_id: videoId })
      .eq('id', fileId)
      .eq('user_id', this.session?.user.id)
      .select();
    if (error) alert(error.message);
    await this.fetchAllData();
    console.log(data);
  }

  public search(name: string) {
    const reg = new RegExp(name);
    return this.data?.filter((ele) => reg.test(ele.title));
  }
}
