import { supabase } from '@/lib/supabase';

/**
 * Returns the public URL for a photo in the 'photos' Supabase bucket.
 */
export function getPhotoUrl(photoPath: string | null): string | null {
  if (!photoPath) return null;
  const { data } = supabase.storage.from('photos').getPublicUrl(photoPath);
  return data.publicUrl || null;
}

/**
 * Returns the public URL for a music track in the 'music' Supabase bucket.
 */
export function getMusicUrl(musicPath: string | null): string | null {
  if (!musicPath) return null;
  const { data } = supabase.storage.from('music').getPublicUrl(musicPath);
  return data.publicUrl || null;
}
