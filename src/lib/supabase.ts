import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://placeholder.supabase.co';
const supabaseAnonKey = 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);