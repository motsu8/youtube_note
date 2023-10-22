import { Session } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

export default class Library {
  public session: Session | null;

  public libs: string[] | undefined;

  public type: string = 'book';

  public parent: Library | null;

  public title: string | undefined;

  public id: string | null | undefined;

  public created_at: string | undefined;

  private acquired: boolean;

  constructor(session: Session | null) {
    this.parent = null;
    this.session = session;
    this.acquired = false;
  }

  public async insertData(title: string) {
    const { data } = await supabase
      .from('Library')
      .insert([{ title, user_id: this.session?.user.id }])
      .select();
    console.log(data);
  }

  public async getData(libId: string | null | undefined): Promise<
    | {
        title: any;
        created_at: any;
        id: any;
        libs: any;
      }[]
    | null
  > {
    const { data } = await supabase
      .from('Library')
      .select('title,created_at,id,libs')
      .eq('user_id', this.session?.user.id)
      .is('libs', libId);

    this.acquired = true;
    this.id = libId;
    return data;
  }

  public setParent(parent: Library | null) {
    this.parent = parent;
  }

  public getParent() {
    return this.parent;
  }

  public getBread(list: any[], curr: Library): string[] | null {
    list.unshift(curr.id);
    if (curr.parent === null) return list;
    return this.getBread(list, curr.parent);
  }
}
