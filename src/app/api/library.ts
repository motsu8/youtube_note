import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

import Document from './document';

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

  private data:
    | {
        title: any;
        created_at: any;
        id: any;
        libs: any;
      }[]
    | null;

  private document: Document;

  constructor(session: Session | null) {
    this.title = null;
    this.data = null;
    this.id = null;
    this.parent = null;
    this.session = session;
    this.acquired = false;
    this.document = new Document(this.session);
  }

  public async insertData(title: string) {
    const { data } = await supabase
      .from('Library')
      .insert([{ title, user_id: this.session?.user.id }])
      .select();
    console.log(data);
  }

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

  public setParent(parent: Library | null) {
    this.parent = parent;
  }

  public getParent() {
    return this.parent;
  }

  public getBread(list: Library[], curr: Library): Library[] | null {
    list.unshift(curr);
    if (curr.parent === null) return list;
    return this.getBread(list, curr.parent);
  }

  public get getData() {
    return this.data;
  }

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

  public async getFiles() {
    const data = await this.document.fetchData(this.id);
    return data;
  }
}
