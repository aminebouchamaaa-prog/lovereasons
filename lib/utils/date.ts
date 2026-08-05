import { config } from '@/lib/config';

export type ExperienceState = 'before' | 'during' | 'after';

export interface DateInfo {
  state: ExperienceState;
  letterNumber: number | null;
  daysRemaining: number | null;
  today: string;
}

/**
 * Returns today's date in YYYY-MM-DD format using Algeria local timezone (Africa/Algiers, UTC+1).
 */
export function getTodayInAlgeria(): string {
  return new Date().toLocaleDateString('en-CA', {
    timeZone: 'Africa/Algiers',
  });
}

/**
 * Calculates the difference in calendar days between two YYYY-MM-DD strings (to - from).
 */
export function daysBetween(fromDateStr: string, toDateStr: string): number {
  const fromDate = new Date(fromDateStr + 'T00:00:00Z');
  const toDate = new Date(toDateStr + 'T00:00:00Z');
  const diffTime = toDate.getTime() - fromDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Comprehensive utility function returning the complete state of the 33-day experience.
 */
export function getDateInfo(): DateInfo {
  const today = getTodayInAlgeria();
  const daysSinceStart = daysBetween(config.START_DATE, today);
  const daysUntilMeeting = daysBetween(today, config.MEETING_DATE);

  if (daysSinceStart < 0) {
    return {
      state: 'before',
      letterNumber: null,
      daysRemaining: daysUntilMeeting,
      today,
    };
  }

  if (daysSinceStart >= config.TOTAL_LETTERS || daysUntilMeeting < 0) {
    return {
      state: 'after',
      letterNumber: null,
      daysRemaining: 0,
      today,
    };
  }

  const letterNumber = daysSinceStart + 1;

  return {
    state: 'during',
    letterNumber,
    daysRemaining: daysUntilMeeting,
    today,
  };
}

export function getCurrentLetterNumber(): number | null {
  return getDateInfo().letterNumber;
}
