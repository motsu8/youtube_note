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

  /**
   * インスタンス変数のdataへ取得したデータを格納する
   */
  public async fetchAllData() {
    const { data } = await supabase
      .from('Document')
      .select('title,created_at,id,lib_id,content,video_id')
      .eq('user_id', this.session?.user.id);
    this.data = data;
  }

  /**
   * フォルダidに属しているファイルを返す
   * @param フォルダid
   * @returns ファイル[]
   */
  public getFiles(folderId: string | null) {
    return this.data?.filter((ele) => ele.lib_id === folderId);
  }

  /**
   * ビデオidを参照しているファイルを返す
   * @param videoId
   * @returns ファイル[]
   */
  public getFilesRelationalVideo(videoId: string | null) {
    return this.data?.filter((ele) => ele.video_id === videoId);
  }

  /**
   * ファイルidのファイルデータを返す
   * @param fileId
   * @returns
   */
  public getFile(fileId: string | null) {
    return this.data?.find((ele) => ele.id === fileId);
  }

  /**
   * ファイルidのデータをDBから削除する
   * @param fileList
   * @returns undefined (インスタンス変数: dataを更新)
   */
  public async delete(fileList: string[]) {
    const results = [];
    for (const id of fileList) {
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

  /**
   * DBへ新規保存する
   * @param title
   * @param content
   */
  public async postDocument(title: string, content: string) {
    const { data, error } = await supabase
      .from('Document')
      .insert([{ title, content, user_id: this.session!.user.id }])
      .select();
    console.log(data);
    console.log(error);
  }

  /**
   * ファイルidのコンテンツを更新する
   * @param id
   * @param content
   */
  public async updateContent(id: string, content: string) {
    const { data } = await supabase
      .from('Document')
      .update({ content })
      .eq('id', id)
      .eq('user_id', this.session?.user.id)
      .select();
    console.log(data);
  }

  /**
   * ファイルのタイトルとフォルダをDBへ新規保存する
   * @param title
   * @param lib
   */
  public async postTitle(title: string, lib: string | null) {
    const { data } = await supabase
      .from('Document')
      .insert([{ title, lib_id: lib, user_id: this.session!.user.id }])
      .select();
    console.log(data);
  }

  /**
   * インスタンス変数のdataを返す
   */
  public get getData() {
    return this.data;
  }

  /**
   * ファイルのタイトル、外部キーのビデオid フォルダidをDBへ新規保存する
   * @param title
   * @param videoId
   * @param libId
   */
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

  /**
   * ファイルidでDBのビデオidを更新する
   * @param fileId
   * @param videoId
   */
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

  /**
   * ファイルタイトルで検索する
   * @param name
   * @returns ファイルデータ
   */
  public search(name: string) {
    const reg = new RegExp(name);
    return this.data?.filter((ele) => reg.test(ele.title));
  }
}
