import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// Conserva tus claves actuales de Supabase
const supabaseUrl = "https://bcokihqmyfbdbbekpxva.supabase.co";
const supabaseAnonKey = "sb_publishable_7WMbFdYaw6oDtduCl4GgDQ_ehNGTKgh";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});