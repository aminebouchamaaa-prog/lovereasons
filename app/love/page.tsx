import { getDateInfo } from '@/lib/utils/date';
import { getTodaysDay } from '@/lib/services/days';
import Countdown from '@/components/Countdown/Countdown';
import Envelope from '@/components/Envelope/Envelope';
import Image from 'next/image';

const images = [
  { src: '/decor/lillie1.png', top: '8%', left: '10%', rotate: '-8deg', size: 250, priority: true },
  { src: '/decor/lillie2.png', top: '15%', left: '75%', rotate: '6deg', size: 160 },
  { src: '/decor/tie.png', top: '65%', left: '8%', rotate: '5deg', size: 170 },
  { src: '/decor/fly.png', top: '70%', left: '72%', rotate: '-5deg', size: 220 },
];

export default async function LovePage() {
  const dateInfo = getDateInfo();
  const day = await getTodaysDay();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-8 p-4 overflow-hidden bg-pink-50">
      {/* Scattered background photos */}
      {images.map((img, i) => (
        <div
          key={i}
          className="hidden md:block absolute rounded-lg overflow-hidden shadow-lg pointer-events-none"
          style={{
            top: img.top,
            left: img.left,
            width: img.size,
            height: img.size,
            maxWidth: '20vw',
            maxHeight: '20vw',
            transform: `rotate(${img.rotate})`,
            border: '6px solid white',
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            priority={img.priority}
            sizes="250px"
            className="object-cover"
          />
        </div>
      ))}

      {/* Soft overlay so text/card stay readable over the photos */}
      <div className="absolute inset-0 bg-white/50 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 text-center space-y-6 mb-8 animate-[fadeIn_0.8s_ease-out]">
        <p className="text-sm tracking-[0.3em] uppercase opacity-70">
          A journey of love
        </p>
        <h1
          className="text-4xl md:text-5xl font-light leading-tight"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          31 Reasons Why
          <br />
          <span className="italic font-normal">I Love You</span>
        </h1>
        <div className="w-12 h-px mx-auto opacity-30 bg-current" />
      </section>

      {/* Envelope Section */}
      <section className="relative z-10 flex flex-col items-center w-full max-w-lg animate-[fadeIn_1s_ease-out]">
        {day ? (
          <Envelope day={day} />
        ) : (
          <div
            className="flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border border-pink-100 bg-white/70 backdrop-blur-sm"
            style={{ boxShadow: '0 8px 30px var(--shadow-soft)' }}
          >
            <span className="text-2xl">💌</span>
            <p
              className="text-lg italic text-center opacity-70"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              Today&apos;s letter isn&apos;t available yet
            </p>
          </div>
        )}
      </section>
      <Countdown dateInfo={dateInfo} />
    </main>
  );
}