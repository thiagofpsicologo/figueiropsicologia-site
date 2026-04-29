import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

interface CTASectionProps {
  openScheduling: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ openScheduling }) => {
  return (
    <section id="contact" className="py-32 md:py-48 bg-natural-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1.05, opacity: 0.4 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-natural-ink via-natural-ink/60 to-natural-ink/80" />
      </div>

      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none z-1">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0" stroke="currentColor" strokeWidth="0.05" fill="none" />
          <path d="M0 0 L100 100" stroke="currentColor" strokeWidth="0.05" fill="none" />
        </svg>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12 md:space-y-16"
        >
          <div className="space-y-6 text-center flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#D1D3C4] font-black"
            >
              Dê o primeiro passo
            </motion.span>
            <h2 className="text-6xl md:text-9xl font-serif italic text-white leading-[0.9] tracking-tighter">
              Sua jornada <br /> <span className="text-[#D1D3C4]">começa aqui.</span>
            </h2>
          </div>

          <p className="text-lg md:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed font-serif italic text-center">
            "Não é sobre ser perfeito, é sobre ser inteiro. Estou aqui para caminhar esse processo com você."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <motion.a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-olive text-white px-10 md:px-16 py-5 md:py-6 rounded-full font-sans text-[11px] md:text-xs uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all cursor-pointer w-full sm:w-auto ring-1 ring-white/10"
              id="cta-whatsapp-btn"
            >
              <MessageCircle size={18} />
              Agendar via WhatsApp
            </motion.a>
            
            <button 
              onClick={openScheduling}
              className="group bg-white/5 backdrop-blur-xl border border-white/20 text-white px-10 md:px-16 py-5 md:py-6 rounded-full font-sans text-[11px] md:text-xs uppercase tracking-[0.3em] font-black hover:bg-white/10 transition-all flex items-center justify-center gap-4 cursor-pointer w-full sm:w-auto"
              id="cta-availability-btn"
            >
              <Calendar size={18} className="text-[#D1D3C4] group-hover:scale-110 transition-transform" />
              Ver Disponibilidade
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-64 bg-olive/20 blur-[150px] rounded-full pointer-events-none opacity-40 text-center" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80%] h-48 bg-[#D1D3C4]/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
