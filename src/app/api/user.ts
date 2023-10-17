import { Session } from '@supabase/supabase-js';

export default class User {
  private id: string;

  private name: string | undefined;

  private type: string | undefined;

  constructor(session: Session | null) {
    this.id = session!.user.id;
  }

  get getId() {
    return this.id;
  }
}
