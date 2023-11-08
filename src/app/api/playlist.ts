import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

export default class Playlist {
  private session: Session | null;

  private data: any[] | null;

  constructor(session: Session | null) {
    this.data = null;
    this.session = session;
  }

  /**
   * DBへビデオデータを保存する
   * @param videosData
   */
  public async insert(videosData: any) {
    const { data, error } = await supabase
      .from('Playlist')
      .insert([
        {
          user_id: this.session?.user.id,
          title: videosData.title,
          videos: videosData.videos,
        },
      ])
      .select();
    if (error) alert(error.message);
    console.log(data);
    await this.fetchAllData();
  }

  /**
   * インスタンス変数のdataへ取得したデータを格納する
   */
  public async fetchAllData() {
    const { data } = await supabase
      .from('Playlist')
      .select('*')
      .eq('user_id', this.session?.user.id);
    this.data = data;
  }

  /**
   * ファイルidが紐づけされたプレイリストを返す
   * @param relationDocId
   * @returns
   */
  public getRelationDocument(relationDocId: string | null) {
    return this.data?.filter((ele) => ele.doc_id === relationDocId);
  }

  /**
   * 指定したビデオidのデータを返す
   * @param videoId
   * @returns
   */
  public getData(videoId?: string) {
    return videoId ? this.data?.find((ele) => ele.id === videoId) : this.data;
  }

  /**
   * 指定したurlのデータを返す
   * @param url
   * @returns
   */
  public getUrlData(url?: string) {
    return this.data?.find((ele) => ele.url === url);
  }

  /**
   * インスタンス変数dataに指定urlがあるか判定する
   * @param url
   * @returns boolean
   */
  public contain(url: string): boolean {
    const res = this.data!.some((ele) => ele.url === url);
    return res;
  }

  /**
   * DBデータを削除する
   * @param list
   * @returns
   */
  public async deleteData(list: any[]) {
    const results = [];
    for (const playlist of list) {
      results.push(
        supabase
          .from('Playlist')
          .delete()
          .eq('user_id', this.session?.user.id)
          .eq('id', playlist.id)
      );
    }
    const data = await Promise.all(results);
    console.log(data);
    return this.fetchAllData();
  }
}
