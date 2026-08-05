'use client';

import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react';
import { getPhotoUrl } from '@/lib/storage';
import type { Day } from '@/types/day';
import MusicPlayer from '@/components/Music/MusicPlayer';

interface LetterProps {
  day: Day;
}

// ✅ FIX 2: Use a callback ref to avoid "cannot access ref during render" warnings
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const rect = node.getBoundingClientRect();
      const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isAlreadyVisible) {
        setIsInView(true);
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        { threshold, rootMargin: '50px' }
      );
      
      observerRef.current.observe(node);
    }
  }, [threshold]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { targetRef, isInView };
}

const hideBackFace: CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

export default function Letter({ day }: LetterProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);

  // ✅ FIX 1: Reset state when prop changes WITHOUT useEffect (avoids cascading effect warning)
  const [prevPhotoPath, setPrevPhotoPath] = useState(day.photo_path);
  if (day.photo_path !== prevPhotoPath) {
    setPrevPhotoPath(day.photo_path);
    setImageError(false);
    setImageLoaded(false);
    setIsPhotoFlipped(false);
  }

  const photoUrl = day.photo_path ? getPhotoUrl(day.photo_path) : null;
  const showPhoto = Boolean(photoUrl) && !imageError;

  const headInView = useInView(0.1);
  const metaInView = useInView(0.1);
  const bodyInView = useInView(0.05);
  const photoInView = useInView(0.05);
  const musicInView = useInView(0.1);

  const letterNumber = day.number || day.id || 1;
  const fromName = day.from_name || 'Amine';
  const toName = day.to_name || 'Hadil';

  const smallNote = day.title?.trim() || 'Our memory ❤';

  return (
    <div className="relative w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* FEUILLE A4 */}
      <div className="relative mx-auto max-w-[794px] bg-white px-7 py-12 sm:px-14 sm:py-16 md:px-20 md:py-20 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.35)]">
        {/* TITRE */}
        <header ref={headInView.targetRef} className="text-center mb-12 sm:mb-14">
          <h1
            className={`
              text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.08em] text-stone-900
              transition-all duration-700 ease-out
              ${headInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Reason <span className="text-rose-500 italic">{letterNumber}</span> of Love
          </h1>
        </header>

        {/* FROM / TO + TIMBRE */}
        <div
          ref={metaInView.targetRef}
          className={`
            flex items-start justify-between gap-6 mb-12 sm:mb-14
            transition-all duration-700 delay-100
            ${metaInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="space-y-3 pt-1">
            <p className="flex items-baseline gap-3">
              <span className="w-14 shrink-0 text-[11px] uppercase tracking-[0.25em] text-stone-400">
                From :
              </span>
              <span
                className="text-xl sm:text-2xl text-red-500 font-semibold"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                {fromName}
              </span>
            </p>

            <p className="flex items-baseline gap-3">
              <span className="w-14 shrink-0 text-[11px] uppercase tracking-[0.25em] text-stone-400">
                To :
              </span>
              <span
                className="text-xl sm:text-2xl text-red-500 font-semibold"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                {toName}
              </span>
            </p>
          </div>

          {/* PIN avec petit mouvement au hover */}
          <div className="relative shrink-0">
            <div
              className="
                rotate-2 border border-stone-200 bg-white p-1.5 shadow-md
                transition-transform duration-300 ease-out
                hover:-translate-y-1 hover:rotate-6 hover:scale-105
              "
            >
              <img
                src="/decor/postalpin.png"
                alt="Postal pin"
                className="h-28 w-24 object-cover sm:h-32 sm:w-28"
              />
            </div>
          </div>
        </div>

        {/* CORPS DE LA LETTRE */}
        <section ref={bodyInView.targetRef}>
          {day.date && (
            <p
              className={`
                mb-8 text-right text-xs uppercase tracking-[0.25em] text-stone-400
                transition-opacity duration-700
                ${bodyInView.isInView ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {new Date(day.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          <p
            className={`
              mb-6 text-xl sm:text-2xl italic text-stone-700
              transition-all duration-700 delay-100
              ${bodyInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            My dearest {toName},
          </p>

          <p
            className={`
              text-lg sm:text-xl leading-loose text-stone-800 whitespace-pre-line
              transition-all duration-700 delay-200
              ${bodyInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ fontFamily: 'var(--font-dancing), cursive' }}
          >
            {day.content}
          </p>

          <div
            className={`
              mt-10 flex justify-end
              transition-all duration-700 delay-300
              ${bodyInView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
          >
            <div className="text-right">
              <p
                className="text-lg italic text-stone-500"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                Forever yours,
              </p>
              <p
                className="mt-1 text-2xl italic text-rose-500"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                {fromName} &#10084;
              </p>
            </div>
          </div>
        </section>

        {/* PHOTO : LE CONTENEUR EN ENTIER SE RETOURNE */}
        {showPhoto && (
          <section ref={photoInView.targetRef} className="mt-14 sm:mt-16 flex justify-center">
            <div
              className={`
                w-full max-w-xl transition-all duration-700 ease-out
                ${photoInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
            >
              <div className="w-full" style={{ perspective: '1200px' }}>
                <button
                  type="button"
                  onClick={() => setIsPhotoFlipped((prev) => !prev)}
                  aria-expanded={isPhotoFlipped}
                  aria-label={
                    isPhotoFlipped
                      ? 'Flip the photo card back to the image'
                      : 'Flip the photo card to reveal the remark'
                  }
                  className="block w-full rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70"
                >
                  <div
                    className="relative w-full transition-transform duration-700 ease-in-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isPhotoFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* FACE AVANT : CONTENEUR PHOTO */}
                    <figure
                      className="
                        relative border border-stone-200 bg-white p-3 pb-4
                        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]
                      "
                      style={hideBackFace}
                    >
                      {!imageLoaded && (
                        <div className="w-full aspect-[4/3] animate-pulse bg-stone-100" />
                      )}

                      <img
                        src={photoUrl ?? ''}
                        alt={day.title || 'Photo'}
                        onError={() => setImageError(true)}
                        onLoad={() => setImageLoaded(true)}
                        className={`
                          w-full h-auto object-cover
                          transition-all duration-700
                          ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}
                        `}
                      />

                      <figcaption
                        className="mt-3 text-center text-lg italic text-stone-500"
                        style={{ fontFamily: 'var(--font-dancing), cursive' }}
                      >
                        Click the frame to reveal the remark
                      </figcaption>
                    </figure>

                    {/* FACE ARRIÈRE : TITLE DU DATABASE */}
                    <div
                      className="
                        absolute inset-0 overflow-hidden border border-stone-200
                        bg-[#fff8f5] p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]
                      "
                      style={{
                        ...hideBackFace,
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-2 text-center">
                        <span className="text-rose-400 text-lg">&#10084;</span>

                        <p
                          className="text-xl leading-relaxed text-stone-700"
                          style={{ fontFamily: 'var(--font-dancing), cursive' }}
                        >
                          {smallNote}
                        </p>

                        <span
                          className="mt-2 text-sm italic text-stone-400"
                          style={{ fontFamily: 'var(--font-dancing), cursive' }}
                        >
                          Click again to return
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* MUSIC PLAYER */}
        <footer
          ref={musicInView.targetRef}
          className={`
            mt-14 sm:mt-16 flex justify-center
            transition-all duration-700
            ${musicInView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <MusicPlayer day={day} />
        </footer>
      </div>

      <div className="h-10" />
    </div>
  );
}