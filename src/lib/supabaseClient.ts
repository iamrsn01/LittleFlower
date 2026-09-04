import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite environment variables (.env) or localStorage
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const localUrl = localStorage.getItem('lfs_supabase_url');
  const localKey = localStorage.getItem('lfs_supabase_anon_key');

  const url = localUrl || envUrl || '';
  const key = localKey || envKey || '';

  const isConfigured = Boolean(
    url && 
    key && 
    !url.includes('your-project-id') && 
    url.startsWith('https://')
  );

  return { url, key, isConfigured };
};

const config = getSupabaseConfig();

export const supabase = config.isConfigured 
  ? createClient(config.url, config.key)
  : null;

export const saveSupabaseConfig = (url: string, key: string) => {
  if (url && key) {
    localStorage.setItem('lfs_supabase_url', url.trim());
    localStorage.setItem('lfs_supabase_anon_key', key.trim());
  } else {
    localStorage.removeItem('lfs_supabase_url');
    localStorage.removeItem('lfs_supabase_anon_key');
  }
};
