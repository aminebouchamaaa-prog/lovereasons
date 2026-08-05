'use client';

import { useActionState, useRef, useState } from 'react';
import { checkPassword } from '@/app/actions/auth';
import type { PasswordActionState } from '@/types/password';

const initialState: PasswordActionState = { status: 'idle' };
const MASK_CHAR = '♥';

export default function PasswordForm() {
  const [state, action, pending] = useActionState(checkPassword, initialState);
  const [realValue, setRealValue] = useState('');
  const displayRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDisplay = e.target.value;
    const diff = newDisplay.length - realValue.length;
    const cursor = e.target.selectionStart ?? newDisplay.length;

    let next = realValue;

    if (diff > 0) {
      // Characters were typed/pasted — extract the actual new characters
      // (everything in newDisplay that isn't a mask char at the insertion point)
      const inserted = newDisplay.slice(cursor - diff, cursor);
      next = realValue.slice(0, cursor - diff) + inserted + realValue.slice(cursor - diff);
    } else if (diff < 0) {
      // Characters were deleted
      next = realValue.slice(0, cursor) + realValue.slice(cursor - diff);
    }

    setRealValue(next);

    // Restore cursor position after the display value re-renders as hearts
    requestAnimationFrame(() => {
      displayRef.current?.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <form action={action} className="flex flex-col items-center gap-5">
      {/* Visible input: shows hearts, captures keystrokes */}
      <input
        ref={displayRef}
        type="text"
        inputMode="text"
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        value={MASK_CHAR.repeat(realValue.length)}
        onChange={handleChange}
        placeholder="Enter the key..."
        aria-label="Password"
        className="w-64 text-center px-4 py-3 rounded-lg border border-pink-200 bg-white/60 text-base outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200/50 transition-all placeholder:text-pink-300/60 tracking-widest"
        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--rose-accent)' }}
      />

      {/* Hidden real input: what actually submits with the form */}
      <input type="hidden" name="password" value={realValue} />

      {state.status === 'error' && (
        <p
          role="alert"
          className="text-sm whitespace-pre-line"
          style={{ color: 'var(--rose-accent)' }}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="px-8 py-2.5 rounded-lg text-sm tracking-wider uppercase transition-all disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, var(--pink-medium), var(--rose-accent))',
          color: 'white',
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          boxShadow: '0 2px 10px var(--shadow-soft)',
        }}
      >
        {pending ? 'Checking...' : 'Enter'}
      </button>
    </form>
  );
}