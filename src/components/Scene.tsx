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
    <div ref={ref} className={`relative h-screen h-[100dvh] w-full flex overflow-hidden ${index === 0 ? 'justify-center items-end lg:justify-start lg:items-end pb-32 lg:pb-16 p-6 lg:pl-16' : 'justify-center items-center'} ${!scene.image ? 'bg-[#F7F5F2]' : ''}`}>
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
          <div className={`absolute inset-0 ${index === 0 ? 'bg-black/10 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#1A1A1A]/40 lg:via-transparent lg:to-transparent' : (scene.id === 'identificacao' ? 'bg-black/60 backdrop-blur-[2px]' : 'bg-black/30')}`} />
        </motion.div>
      )}

      {!scene.image && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/20 to-natural-bg z-0" />
      )}

      <motion.div 
        style={{ opacity: index === 0 ? 1 : opacity, y: index === 0 ? 0 : y }}
        className={`relative z-10 w-full max-w-[1440px] px-6 lg:px-12 flex items-center lg:items-end justify-center lg:justify-start`}
      >
        <div className={`max-w-xl lg:max-w-4xl flex flex-col ${index === 0 ? 'items-center lg:items-start text-center lg:text-left' : (scene.sideImage ? 'text-left items-start' : (scene.id === 'identificacao' ? 'text-center max-w-4xl mx-auto items-center' : 'text-center items-center'))}`}>
          <div className="overflow-hidden mb-1">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`block font-sans text-[10px] md:text-xs lg:text-sm tracking-[0.3em] lg:tracking-[0.4em] font-black ${scene.image ? 'text-white drop-shadow-sm' : 'text-primary-blue'}`}
            >
              {scene.accent}
            </motion.span>
          </div>
          
          {scene.subtitle && (
            <div className={`overflow-hidden ${index === 0 ? 'mb-2 lg:mb-6' : 'mb-4'}`}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`block font-sans text-[11px] md:text-sm lg:text-base tracking-[0.2em] font-bold italic ${scene.image ? 'text-white/90 drop-shadow-sm' : 'text-primary-blue/80'}`}
              >
                {scene.subtitle}
              </motion.span>
            </div>
          )}

          <div className="relative">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif italic ${scene.id === 'identificacao' ? 'leading-[1.1] md:leading-[1.1]' : (index === 0 ? 'leading-[1] lg:leading-[0.9] lg:-ml-1' : 'leading-[1.1]')} ${scene.image ? 'text-white' : 'text-natural-ink'}`}
            >
              {scene.title}
            </motion.h2>
            
            {index === 0 && (
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                className="h-px bg-white/30 mt-8 hidden md:block"
              />
            )}
          </div>
        </div>

        {scene.sideImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-64 h-[400px] md:w-80 md:h-[500px] lg:w-[420px] lg:h-[600px] shrink-0"
          >
            <div className="w-full h-full rounded-[60px] md:rounded-[100px] overflow-hidden border border-white/20 glass-morphism cinematic-shadow group transition-all duration-700 hover:rounded-[40px]">
              <img 
                src={scene.sideImage} 
                alt="Thiago Figueiró Professional" 
                className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Elegant Floating Element */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 rounded-full glass-morphism border border-white/30 flex items-center justify-center p-4 text-center z-20 shadow-2xl"
            >
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-natural-ink italic">Espaço de Escuta</span>
            </motion.div>
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
