import supabase from '@/utils/supabaseClient';

export default class User {
  public static async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
}
