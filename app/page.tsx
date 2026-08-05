import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PasswordForm from '@/components/Password/PasswordForm';
import Image from 'next/image';

const images = [
  { src: '/decor/lillie1.png', top: '8%', left: '10%', rotate: '-8deg', size: 250 },
  { src: '/decor/lillie2.png', top: '15%', left: '75%', rotate: '6deg', size: 160 },
  { src: '/decor/tie.png', top: '65%', left: '8%', rotate: '5deg', size: 170 },
  { src: '/decor/fly.png', top: '70%', left: '72%', rotate: '-5deg', size: 220 },
];

export default async function Home() {
  // If already authenticated, skip the password gate entirely.
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (session?.value === 'authenticated') {
    redirect('/love');
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-8 p-4 overflow-hidden bg-pink-50">
      {/* Scattered background photos */}
      {images.map((img, i) => (
        <div
          key={i}
          className="hidden sm:block absolute rounded-lg overflow-hidden shadow-lg pointer-events-none"
          style={{
            top: img.top,
            left: img.left,
            width: img.size,
            height: img.size,
            transform: `rotate(${img.rotate})`,
            border: '6px solid white',
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            priority
            sizes="200px"
            className="object-cover"
          />
        </div>
      ))}

      {/* Soft overlay so text/card stay readable over the photos */}
      <div className="absolute inset-0 bg-white/50  pointer-events-none" />

      {/* Foreground content, above the background layers */}
      <div className="relative z-10 text-center space-y-3">
        <p className="text-sm tracking-[0.3em] uppercase opacity-50">
          A private place
        </p>
        <h1
          className="text-3xl md:text-4xl font-light"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          31 Reasons Why
          <br />
          <span className="italic font-normal">I Love You</span>
        </h1>
        <div className="w-8 h-px mx-auto opacity-20 bg-current" />
      </div>

      <div className="relative z-10">
        <PasswordForm />
      </div>
    </main>
  );
}