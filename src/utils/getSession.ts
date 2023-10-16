import supabase from '@/utils/supabaseClient';

export default async function getSession() {
  const { data } = await supabase.auth.getSession();
  console.log(data);
  return data.session;
}
