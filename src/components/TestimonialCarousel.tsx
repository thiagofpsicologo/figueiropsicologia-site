import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.98
    })
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto py-16 px-4">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative min-h-[500px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                next();
              } else if (info.offset.x > swipeThreshold) {
                prev();
              }
            }}
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.5 },
              filter: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-center">
              <div className="relative group max-w-[280px] md:max-w-none mx-auto w-full">
                <div className="aspect-[4/5] overflow-hidden rounded-[30px] md:rounded-[60px] cinematic-shadow relative z-10 border-4 md:border-8 border-white">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary-blue/10 mix-blend-multiply" />
                </div>
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary-blue/10 rounded-[60px] translate-x-1 translate-y-1" />
                <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 bg-natural-stone/30 rounded-3xl -z-10" />
                
                <div className="absolute top-10 -right-10 z-20 hidden lg:block">
                  <span className="text-7xl font-serif text-primary-blue/10 select-none">
                    0{currentIndex + 1}
                  </span>
                </div>
              </div>

              <div className="relative space-y-8 md:space-y-10 text-left">
                <span className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-8xl md:text-9xl font-serif text-primary-blue/5 select-none pointer-events-none italic">
                  &ldquo;
                </span>

                <div className="space-y-8 relative z-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} size={14} className="text-primary-blue fill-primary-blue/10" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-natural-ink italic">
                    {testimonial.quote}
                  </p>

                  <div className="space-y-1 pt-6 border-t border-primary-blue/10 max-w-[200px]">
                    <h4 className="font-sans font-bold text-sm md:text-base text-natural-ink uppercase tracking-[0.2em]">
                      {testimonial.name}
                    </h4>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-primary-blue font-black">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex md:hidden items-center justify-between pt-4">
                  <div className="flex gap-2">
                    <button onClick={prev} className="p-3 bg-white border border-primary-blue/10 rounded-full text-primary-blue active:scale-90 transition-all shadow-sm">
                      <ArrowLeft size={18} />
                    </button>
                    <button onClick={next} className="p-3 bg-white border border-primary-blue/10 rounded-full text-primary-blue active:scale-90 transition-all shadow-sm">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary-blue/40 font-mono">
                    0{currentIndex + 1} / 0{TESTIMONIALS.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hidden md:flex items-center justify-between mt-12 px-6">
        <div className="flex items-center gap-10">
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-primary-blue/10 bg-white text-primary-blue hover:bg-primary-blue hover:text-white transition-all cinematic-shadow group active:scale-90"
              aria-label="Anterior"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-primary-blue/10 bg-white text-primary-blue hover:bg-primary-blue hover:text-white transition-all cinematic-shadow group active:scale-90"
              aria-label="Próximo"
            >
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-primary-blue' : 'w-1.5 bg-primary-blue/20 hover:bg-primary-blue/40'}`}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary-blue/30 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-primary-blue/10" />
          Depoimentos Reais
        </div>
      </div>
    </div>
  );
};
