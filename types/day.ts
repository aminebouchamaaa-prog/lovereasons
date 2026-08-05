// @/types/day.ts
export interface Day {
  id: string;
  title: string;
  content: string;
  date?: string;
  photo_path?: string;
  music_path?: string;

  // ➕ Add these new fields
  number?: number | string;
  from_name?: string;
  to_name?: string;
  music_name?: string;
  music_artist?: string;
  song_title?: string;
  song_artist?: string;
}