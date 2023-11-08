import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

import Document from './document';

interface Data {
  title: any;
  created_at: any;
  id: any;
  libs: any;
}

export default class Library {
  public session: Session | null;

  public libs: string[] | undefined;

  public type: string = 'book';

  public parent: Library | null;

  public title: string | null;

  public id: string | null;

  public createdAt: string | undefined;

  public parentId: string | undefined;

  private acquired: boolean;

  private data: Data[] | null;

  public document: Document;

  constructor(session: Session | null) {
    this.title = null;
    this.id = null;
    this.parent = null;
    this.data = null;
    this.session = session;
    this.acquired = false;
    this.document = new Document(this.session);
  }

  /**
   * インスタンス変数dataへ取得したデータを格納する
   */
  public async fetchAllData() {
    const { data } = await supabase
      .from('Library')
      .select('title,created_at,id,libs')
      .eq('user_id', this.session?.user.id);
    this.data = data;
  }

  /**
   * 親フォルダidから表示するフォルダリストを取得する
   * @param parentId
   * @returns folders[]
   */
  public getDrawList(parentId: string) {
    const res = this.data?.filter((ele) => ele.libs === parentId);
    return res;
  }

  /**
   * フォルダidに紐づけされたファイルリストを返す
   * @param currentId
   * @returns files[]
   */
  public getDrawFiles(currentId: string | null) {
    const res = this.document.getFiles(currentId);
    return res;
  }

  /**
   * パンくずリスト取得
   * @param currentId : string
   * @returns (Data|null)[]
   */
  public getBread(currentId: string | null) {
    const current = this.getData(currentId);
    return this.getBreadHelper(current!, []);
  }

  /**
   * getBread()の再帰関数ヘルパー
   * @param current
   * @param list
   * @returns (folder|null)[]
   */
  private getBreadHelper(
    current: Data | undefined,
    list: (Data | null)[]
  ): any {
    // 現在のidがnullの場合
    if (current === null) return [null, ...list];
    const parent = this.getData(current!.libs);
    return this.getBreadHelper(parent!, [current!, ...list]);
  }

  /**
   * DBデータを削除する
   * @param list
   * @returns undefined
   */
  public async delete(list: string[]) {
    const results = [];
    for (const id of list) {
      results.push(
        supabase
          .from('Library')
          .delete()
          .eq('user_id', this.session?.user.id)
          .eq('id', id)
      );
    }
    await Promise.all(results);
    return this.fetchAllData();
  }

  /**
   * フォルダタイトルをDBへ保存する
   * @param title
   */
  public async insertData(title: string) {
    const { data } = await supabase
      .from('Library')
      .insert([{ title, user_id: this.session?.user.id }])
      .select();
    console.log(data);
  }

  /**
   * folderIdでDBデータを取得する
   * @param libId
   */
  public async fetchData(libId: string): Promise<any>;

  public async fetchData(libId: string | null): Promise<any>;

  public async fetchData(libId: string | null): Promise<
    | {
        title: any;
        created_at: any;
        id: any;
        libs: any;
      }[]
    | null
  > {
    if (libId === null) {
      const { data } = await supabase
        .from('Library')
        .select('title,created_at,id,libs')
        .eq('user_id', this.session?.user.id)
        .is('libs', libId);
      this.acquired = true;
      this.id = libId;
      this.data = data;
      this.title = null;
      return data;
    }
    const { data } = await supabase
      .from('Library')
      .select('title,created_at,id,libs')
      .eq('user_id', this.session?.user.id)
      .eq('libs', libId);
    this.acquired = true;
    this.id = libId;
    this.data = data;
    this.setTitle();
    return data;
  }

  /**
   * インスタンス変数parentを更新する
   * @param parent
   */
  public setParent(parent: Library | null) {
    this.parent = parent;
  }

  /**
   * インスタンス変数parentを返す
   * @returns folder
   */
  public getParent() {
    return this.parent;
  }

  /**
   * folderIdでインスタンス変数のdataを返す
   * @param id
   * @returns
   */
  public getData(id: string | null) {
    if (id === null) return null;
    return this.data?.find((ele) => ele.id === id);
  }

  /**
   * インスタンス変数のdataを返す
   */
  public get getAllData() {
    return this.data;
  }

  /**
   * インスタンス変数のタイトルを設定する
   * @returns
   */
  private async setTitle() {
    if (this.id === null) {
      this.title = null;
      return;
    }
    const { data } = await supabase
      .from('Library')
      .select('title')
      .eq('user_id', this.session?.user.id)
      .eq('id', this.id);

    this.title = data?.pop()?.title;
  }

  /**
   *タイトルとフォルダキーを指定して保存する
   * @param title
   * @param libs
   */
  public async postTitle(title: string, libs: string | null) {
    const { data } = await supabase
      .from('Library')
      .insert([{ title, libs, user_id: this.session!.user.id }])
      .select();
    console.log(data);
  }

  /**
   * タイトルを検索する
   * @param name
   * @returns folder[]
   */
  public search(name: string) {
    const reg = new RegExp(name);
    return this.data?.filter((ele) => reg.test(ele.title));
  }
}
