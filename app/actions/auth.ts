'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { PasswordActionState } from '@/types/password';

export async function checkPassword(
  _prevState: PasswordActionState,
  formData: FormData
): Promise<PasswordActionState> {
  try {
    const input = formData.get('password');

    if (typeof input !== 'string' || input.trim() === '') {
      return { status: 'error', message: "That's not the right key ❤️" };
    }

    const correct = process.env.WEBSITE_PASSWORD;

    if (!correct) {
      return {
        status: 'error',
        message: 'Something went wrong.\nPlease try again.',
      };
    }

    if (input !== correct) {
      return { status: 'error', message: "That's not the right key ❤️" };
    }

    // Password is correct — set the session cookie.
    const cookieStore = await cookies();
    cookieStore.set('session', 'authenticated', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong.\nPlease try again.',
    };
  }

  // redirect() throws internally — must be called outside try/catch.
  redirect('/love');
}
