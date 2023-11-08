import { SupabaseClient } from '@supabase/supabase-js';

import supabase from '@/utils/supabaseClient';

/**
 * セッション情報を取得する
 * @returns Session
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  console.log(data.session);
  return data.session;
}

/**
 * サインアウトする
 * @returns undefined
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
    return;
  }
  window.location.href = '/';
};

/**
 * 登録解除する
 * @param userId
 * @returns undefined
 */
export const deleteUser = async (userId: string) => {
  const client = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY as string
  );
  const { error } = await client.auth.admin.deleteUser(userId);
  if (error) {
    alert(error.message);
    return;
  }
  await signOut();
  window.location.href = '/';
};

/**
 * emailでログインする
 * @param email
 * @param password
 * @returns Session, User
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) alert(error.message);
  return data;
}

/**
 * emailでサインアップする
 * @param email
 * @param password
 * @returns Session, User
 */
export async function signUpNewUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://youtube-note-neon.vercel.app/home/',
    },
  });
  if (error) alert(error.message);
  return data;
}
