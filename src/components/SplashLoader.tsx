import React from 'react';
import { motion } from 'motion/react';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#F7F5F2]"
    >
      <div className="relative flex items-center justify-center">
        {/* Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { delay: 0.5, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }
          }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo with Loading Ring integrated */}
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Loading Ring - perfectly centered behind the logo */}
            <motion.svg
              width="160"
              height="160"
              viewBox="0 0 100 100"
              className="absolute z-0"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                stroke="#6B705C"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { duration: 1.2, ease: "easeInOut" }
                }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                stroke="#6B705C"
                strokeWidth="3"
                strokeDasharray="15 185"
                fill="none"
                animate={{ 
                  rotate: 360,
                  transition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.svg>

            {/* Pulsing Outer Glows */}
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 border-2 border-olive/10 rounded-full"
            />

            <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-2xl shadow-olive/20 border border-olive/10 overflow-hidden z-10">
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-full h-full"
              >
                <img 
                  src="https://drive.google.com/thumbnail?id=10taANe2B2DrYxggYuYrP098CD_pZntCN&sz=1000" 
                  alt="Logo Thiago Figueiró" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Soft Interior Glow */}
              <motion.div 
                animate={{
                  opacity: [0.05, 0.1, 0.05],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-olive rounded-full blur-2xl pointer-events-none"
              />

              {/* Shine effect */}
              <motion.div
                animate={{
                  x: [-300, 300],
                  transition: { duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }
                }}
                className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none"
              />
            </div>
          </div>

          {/* Name/Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.8, duration: 0.8, ease: "easeOut" }
            }}
            className="text-center"
          >
            <h1 className="text-2xl font-serif text-natural-ink italic tracking-wide">Thiago Figueiró</h1>
            <div className="flex items-center gap-2 justify-center mt-2">
              <div className="h-[1px] w-4 bg-olive/30" />
              <p className="text-[11px] uppercase tracking-[0.4em] text-olive font-bold">Psicólogo Clínico</p>
              <div className="h-[1px] w-4 bg-olive/30" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Auto-complete timer for demo purposes or trigger by parent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onAnimationComplete={() => {
           // Reduced time to advance to the main site
           setTimeout(onComplete, 200);
        }}
      />
    </motion.div>
  );
};
