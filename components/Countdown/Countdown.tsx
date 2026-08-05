import type { DateInfo } from '@/lib/utils/date';
import { config } from '@/lib/config';

interface CountdownProps {
  dateInfo: DateInfo;
}

/** Shared glassmorphism card wrapper */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center px-10 py-8 rounded-3xl border border-pink-100/80 
        bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(236,72,153,0.08)] 
        animate-in fade-in zoom-in duration-500 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function Countdown({ dateInfo }: CountdownProps) {
  /* ─── BEFORE STATE ─── */
  if (dateInfo.state === 'before') {
    return (
      <Card>
        <p
          className="text-6xl font-light tracking-wide leading-none tabular-nums"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--rose-accent)' }}
        >
          {dateInfo.daysRemaining}
        </p>
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-500 mt-3">
          {dateInfo.daysRemaining === 1 ? 'Day remaining' : 'Days remaining'}
        </p>
        <div className="w-8 h-px bg-pink-200 my-4" />
        <p className="text-sm italic text-gray-400">The journey begins soon ❤️</p>
      </Card>
    );
  }

  /* ─── AFTER STATE ─── */
  if (dateInfo.state === 'after') {
    return (
      <Card>
        <span className="text-4xl mb-2 animate-pulse" role="img" aria-label="love">💕</span>
        <p
          className="text-3xl font-light italic leading-tight"
          style={{ fontFamily: 'var(--font-dancing), cursive', color: 'var(--rose-accent)' }}
        >
          We finally met!
        </p>
        <div className="w-8 h-px bg-pink-200 my-4" />
        <p className="text-sm text-gray-500">
          All <span className="font-semibold text-gray-700">{config.TOTAL_LETTERS}</span> letters unlocked
        </p>
      </Card>
    );
  }

  /* ─── DURING STATE ─── */
  const letterNumber = dateInfo.letterNumber ?? 0;
  const progress = Math.min(100, Math.round((letterNumber / config.TOTAL_LETTERS) * 100));

  return (
    <Card className="w-full max-w-xs gap-5">
      {/* Days counter */}
      <div className="flex flex-col items-center gap-1.5">
        <p
          className="text-6xl font-light tracking-wide leading-none tabular-nums"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--rose-accent)' }}
        >
          {dateInfo.daysRemaining}
        </p>
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-500">
          {dateInfo.daysRemaining === 1 ? 'Day remaining' : 'Days remaining'}
        </p>
      </div>

      {/* Progress section */}
      <div className="w-full space-y-2.5">
        <div
          className="h-2 w-full rounded-full bg-pink-50 overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${letterNumber} of ${config.TOTAL_LETTERS} letters unlocked`}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out relative"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--pink-medium), var(--rose-accent))',
            }}
          >
            {/* Subtle shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>
            Letter <span className="font-semibold text-gray-600 tabular-nums">{letterNumber}</span>
            <span className="mx-0.5">/</span>
            <span className="tabular-nums">{config.TOTAL_LETTERS}</span>
          </span>
          <span className="tabular-nums font-medium text-gray-500">{progress}%</span>
        </div>
      </div>
    </Card>
  );
}