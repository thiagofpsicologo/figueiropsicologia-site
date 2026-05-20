import React from 'react';
import { motion } from 'motion/react';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-natural-bg flex flex-col items-center justify-center p-6 overflow-hidden select-none"
    >
      {/* Background animated elegant orbs */}
      <motion.div 
        animate={{
          x: [0, 15, -10, 0],
          y: [0, -15, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-12 -left-12 w-72 h-72 bg-primary-blue/[0.03] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{
          x: [0, -15, 10, 0],
          y: [0, 15, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-16 -right-16 w-80 h-80 bg-primary-blue/[0.04] rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: [0.9, 1, 1.025, 1],
            opacity: 1 
          }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: {
              duration: 3.6,
              ease: "easeInOut",
              times: [0, 0.15, 0.6, 1],
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-blue shadow-2xl relative z-10"
        >
          <img 
            src="https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=1000" 
            alt="Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-blue/20 mix-blend-color" />
        </motion.div>
        
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-primary-blue rounded-full blur-2xl -z-0"
        />
      </div>

      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 text-center space-y-2"
      >
        <h2 className="font-serif text-2xl md:text-3xl italic text-natural-ink">Thiago Figueiró</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-primary-blue/30" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-natural-ink font-bold">Psicólogo Clínico</span>
          <div className="h-[1px] w-8 bg-primary-blue/30" />
        </div>
      </motion.div>

      {/* Modern thin progress indicator nested inside a pill container */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.3em] text-natural-ink/30 font-medium">Carregando</span>
        <div className="w-36 h-[2px] bg-primary-blue/10 overflow-hidden rounded-full relative">
          <motion.div
            animate={{
              left: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary-blue/60 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};
