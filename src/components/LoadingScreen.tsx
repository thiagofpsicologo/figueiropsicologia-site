import React from 'react';
import { motion } from 'motion/react';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-natural-bg flex flex-col items-center justify-center p-6"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
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
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-primary-blue rounded-full blur-2xl -z-0"
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-center space-y-2"
      >
        <h2 className="font-serif text-2xl md:text-3xl italic text-natural-ink">Thiago Figueiró</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-primary-blue/30" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-natural-ink font-black">Psicólogo Clínico</span>
          <div className="h-[1px] w-8 bg-primary-blue/30" />
        </div>
      </motion.div>

      <div className="absolute bottom-12 w-32 h-[1px] bg-primary-blue/10 overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full bg-primary-blue/40"
        />
      </div>
    </motion.div>
  );
};
