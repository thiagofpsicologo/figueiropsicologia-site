import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface SceneProps {
  scene: {
    id: string;
    title: string;
    accent: string;
    image?: string;
    subtitle?: string;
    sideImage?: string;
  };
  index: number;
}

export const Scene: React.FC<SceneProps> = ({ scene, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1.1, 1, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative h-screen h-[100dvh] w-full flex overflow-hidden ${index === 0 ? 'justify-start items-end pb-28 pl-4 md:pl-16 lg:pl-20 lg:pb-24' : 'justify-center items-center'} ${!scene.image ? 'bg-[#F7F5F2]' : ''}`}>
      {scene.image && (
        <motion.div 
          style={{ opacity, scale, y: imageY }}
          className="absolute inset-0 z-0 h-[120%] top-[-10%]"
        >
          <img 
            src={scene.image} 
            alt={scene.title}
            className={`w-full h-full object-cover object-[85%_center] sm:object-[45%_20%] ${scene.id === 'identificacao' ? 'brightness-[0.8] contrast-[0.9]' : (index === 0 ? 'brightness-[1.1]' : '')}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${index === 0 ? 'bg-gradient-to-r from-[#1A1A1A]/60 via-[#1A1A1A]/20 to-transparent' : (scene.id === 'identificacao' ? 'bg-black/60 backdrop-blur-[2px]' : 'bg-black/30')}`} />
        </motion.div>
      )}

      {!scene.image && (
        <div className="absolute inset-0 bg-gradient-to-b from-olive/20 to-natural-bg z-0" />
      )}

      <motion.div 
        style={{ opacity: scene.image ? opacity : 1, y: index === 0 ? 0 : y }}
        className={`relative z-10 w-full max-w-6xl px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 ${index === 0 ? 'text-left lg:pl-0' : 'justify-center'}`}
      >
        <div className={`max-w-xs sm:max-w-xl ${index === 0 ? 'text-left' : (scene.sideImage ? 'text-left' : (scene.id === 'identificacao' ? 'text-center max-w-[85%] mx-auto' : 'text-center'))}`}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`block font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 font-bold ${scene.image ? 'text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]' : 'text-olive'}`}
          >
            {scene.accent}
          </motion.span>
          {scene.subtitle && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`block font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 font-medium italic ${scene.image ? 'text-white/80 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]' : 'text-olive/80'}`}
            >
              {scene.subtitle}
            </motion.span>
          )}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic ${scene.id === 'identificacao' ? 'leading-[1.5]' : 'leading-[1.1]'} ${scene.image ? 'text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] transition-all' : 'text-natural-ink'}`}
          >
            {scene.title}
          </motion.h2>
        </div>

        {scene.sideImage && (
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-56 h-72 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] shrink-0"
          >
            <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-white/20 backdrop-blur-sm cinematic-shadow group transition-transform duration-500 hover:scale-105">
              <img 
                src={scene.sideImage} 
                alt="Thiago Figueiró Professional" 
                className="w-full h-full object-cover object-top md:object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-white/10 rounded-[40px]" />
          </motion.div>
        )}
      </motion.div>

      {index === 0 && (
        <motion.div 
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-widest">Role para iniciar</span>
          <ChevronDown size={24} className="md:w-7 md:h-7" />
        </motion.div>
      )}
    </div>
  );
};
