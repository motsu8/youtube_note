import { Session } from '@supabase/supabase-js';

import { VideoData } from '@/types/components';
import supabase from '@/utils/supabaseClient';

export default class Video {
  private session: Session | null;

  private data: any[] | null;

  private newData: any[] | null;

  constructor(session: Session | null) {
    this.data = null;
    this.newData = null;
    this.session = session;
  }

  /**
   * ビデオデータをDBへ保存する
   * @param video
   */
  public async insertVideo(video: VideoData) {
    const { data, error } = await supabase
      .from('Video')
      .insert([
        {
          url: video.url,
          user_id: this.session?.user.id,
          channel: video.channel,
          title: video.title,
          thumbnails: video.thumbnails,
          channel_thumbnails: video.channel_thumbnails,
        },
      ])
      .select();
    if (error) alert(error.message);
    await this.fetchAllData();
    console.log(data);
  }

  /**
   * インスタンス変数dataへ取得したデータを格納する
   */
  public async fetchAllData() {
    const { data } = await supabase
      .from('Video')
      .select('*')
      .eq('user_id', this.session?.user.id);
    this.data = data;
    this.newData = [...data!];
    this.newData.reverse();
  }

  /**
   * ファイルidが紐づけされたビデオデータを返す
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
   * 新しく保存した順番になったデータを返す
   * @returns
   */
  public getNewData() {
    return this.newData;
  }

  /**
   * 指定したurlのビデオデータを返す
   * @param url
   * @returns
   */
  public getUrlData(url?: string) {
    return this.data?.find((ele) => ele.url === url);
  }

  /**
   * インスタンス変数dataに指定urlのデータがあるか判定する
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
          .from('Video')
          .delete()
          .eq('user_id', this.session?.user.id)
          .eq('id', playlist.id)
      );
    }
    await Promise.all(results);
    return this.fetchAllData();
  }
}
