import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://imsvncczxpzqybwjjapx.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltc3ZuY2N6eHB6cXlid2pqYXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTc3NTksImV4cCI6MjEwNDA5Mzc1OX0.KfXTDTjP_UPCoaV0O1bfnC7zJAOoy4-vAr0CqIBZXSk';

// Retrieve credentials from localStorage, Vite env, or default project
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const localUrl = localStorage.getItem('lfs_supabase_url');
  const localKey = localStorage.getItem('lfs_supabase_anon_key');

  const url = localUrl || envUrl || DEFAULT_SUPABASE_URL;
  const key = localKey || envKey || DEFAULT_SUPABASE_KEY;

  const isConfigured = Boolean(
    url && 
    key && 
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
