import { supabase } from '@/lib/supabase';
import { getCurrentLetterNumber } from '@/lib/utils/date';
import type { Day } from '@/types/day';

/**
 * Service to retrieve today's letter based on current calculated letter number.
 * Returns null if before start date, after end date, or if record is not found in database.
 */
export async function getTodaysDay(): Promise<Day | null> {
  try {
    const letterNumber = getCurrentLetterNumber();

    if (letterNumber === null) {
      return null;
    }

    const { data, error } = await supabase
      .from('days')
      .select('*')
      .eq('id', letterNumber)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Day;
  } catch {
    return null;
  }
}
