'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Day } from '@/types/day';
import Letter from '@/components/Letter/Letter';

interface EnvelopeProps {
  day: Day;
}

export default function Envelope({ day }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg pb-10">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 flex items-start justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              background: 'rgba(20, 15, 25, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onClick={() => setIsOpen(false)}
          >
            {/* Close button - fixed top right */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close letter"
              className="fixed top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-stone-600 hover:text-stone-900 hover:bg-white transition-all duration-200 z-50 shadow-lg hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Letter container - transparent, just holds the Letter */}
            <motion.div
              key="letter"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full my-8 max-w-[820px]"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            >
              <Letter day={day} />

              {/* Subtle close text at bottom */}
              <div className="text-center pt-6 pb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-[0.25em] font-medium px-4 py-2 hover:underline underline-offset-4"
                >
                  ✕ Close letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ENVELOPE BUTTON ─── */}
      <motion.button
        type="button"
        aria-label={isOpen ? 'Close envelope' : 'Open envelope'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-[320px] h-[220px] sm:w-[380px] sm:h-[260px] cursor-pointer focus:outline-none mt-6"
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          perspective: 1200,
        }}
        animate={!isOpen ? { y: [0, -8, 0] } : { y: 0 }}
        whileHover={!isOpen ? { scale: 1.02 } : undefined}
        transition={!isOpen ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
      >
        {/* Envelope Shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(214, 71, 138, 0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: isOpen ? 0.9 : 1.1,
            opacity: isOpen ? 0.3 : 0.6,
            y: isOpen ? -10 : 10,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Envelope Container */}
        <div className="absolute inset-0">
          {/* Base */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #fff0f5 0%, #ffd1e3 100%)',
              boxShadow: '0 20px 40px -10px rgba(214, 71, 138, 0.25), inset 0 -2px 10px rgba(0,0,0,0.05)',
            }}
          />

          {/* Left Flap */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, #ffb3cf 0%, #ffd1e3 100%)',
              clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
            }}
          />

          {/* Right Flap */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(-90deg, #ffb3cf 0%, #ffd1e3 100%)',
              clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)',
            }}
          />

          {/* Bottom Flap */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, #ff9cc0 0%, #ffd1e3 100%)',
              clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)',
            }}
          />

          {/* Inner shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.08) 0%, transparent 40%)',
            }}
          />

          {/* Sticker */}
          <motion.div
            className="absolute top-3 right-3 z-10 pointer-events-none"
            animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 10 : 6 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/decor/sticker.png"
              alt=""
              className="w-20 h-20 object-contain drop-shadow-md select-none"
              draggable={false}
            />
          </motion.div>

          {/* String and Button */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
            <div
              className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-pink-300"
              style={{ background: 'radial-gradient(circle, #fff0f5 0%, #ffd1e3 100%)' }}
            />
          </motion.div>

          {/* Top Flap */}
          <motion.div
            className="absolute inset-0 origin-top pointer-events-none z-30"
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #fff0f5 0%, #ffd1e3 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
                backfaceVisibility: 'hidden',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #ff9cc0 0%, #f472a8 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>

          {/* Pin */}
          <motion.div
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center pointer-events-none"
            animate={{
              scale: isOpen ? 0 : 1,
              opacity: isOpen ? 0 : 1,
              rotate: isOpen ? -30 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src="/decor/pin.png"
              alt=""
              className="w-14 h-14 object-contain select-none"
              draggable={false}
              style={{ filter: 'drop-shadow(0 4px 10px rgba(214, 71, 138, 0.4))' }}
            />
          </motion.div>
        </div>
      </motion.button>

      <motion.div
        className="flex flex-col items-center mt-8 select-none"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1 h-1 bg-pink-300 rounded-full" />
          <p className="text-xs text-pink-500/80 font-medium tracking-[0.15em] uppercase">
            Tap to open
          </p>
          <div className="w-1 h-1 bg-pink-300 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}