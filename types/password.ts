export type PasswordActionState =
  | { status: 'idle' }
  | { status: 'error'; message: string };
