import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, ChevronRight, Instagram } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

interface HeaderProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  openScheduling: () => void;
  setIsPrivacyOpen: (open: boolean) => void;
  setIsTermsOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isScrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  openScheduling,
  setIsPrivacyOpen,
  setIsTermsOpen
}) => {
  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 transition-all duration-700 ${isScrolled ? 'py-3 md:py-4' : 'py-6 md:py-10'}`}>
        <div className={`max-w-7xl mx-auto flex flex-row justify-between items-center transition-all duration-700`}>
          <a 
            href="#" 
            className={`flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border transition-all glass-morphism overflow-hidden shrink-0 group hover:shadow-2xl active:scale-95 ${isScrolled ? 'border-primary-blue/10' : 'border-white/20'}`}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform shadow-2xl">
              <img 
                src="https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=w1000" 
                alt="Logo Thiago Figueiró" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className={`font-serif text-sm md:text-lg font-medium tracking-tight transition-colors truncate text-natural-ink ${!isScrolled && 'md:text-natural-ink'}`}>Thiago Figueiró</span>
          </a>
  
          <div className={`hidden md:flex gap-6 lg:gap-8 items-center px-8 py-3 rounded-full border transition-all duration-700 glass-morphism ${isScrolled ? 'border-primary-blue/10 shadow-xl' : 'border-white/20'}`}>
            {[
              { name: 'Início', href: '#' },
              { name: 'Sobre Mim', href: '#about' },
              { name: 'Depoimentos', href: '#testimonials' },
              { name: 'Dúvidas comuns', href: '#faq' },
              { name: 'Contato', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`text-[10px] uppercase tracking-widest transition-all font-sans font-black relative group/link text-natural-ink/60 hover:text-primary-blue`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-500 group-hover/link:w-full bg-primary-blue`} />
              </a>
            ))}
            <div className={`w-[1px] h-4 mx-1 transition-colors bg-primary-blue/10`} />
            <div className="flex gap-4 items-center">
              <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125 duration-300 hover:-translate-y-0.5" title="Instagram">
                <img src="https://cdn.simpleicons.org/instagram/E4405F" className={`w-4 h-4`} alt="Instagram" />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125 duration-300 hover:-translate-y-0.5" title="WhatsApp">
                <img src="https://cdn.simpleicons.org/whatsapp/25D366" className={`w-4 h-4`} alt="WhatsApp" />
              </a>
            </div>
          </div>
  
          <button
            onClick={openScheduling}
            className={`hidden md:flex items-center gap-3 px-8 py-3 rounded-full shadow-2xl transition-all font-sans text-[10px] uppercase tracking-[0.2em] font-black group bg-primary-blue text-white hover:bg-natural-ink hover:-translate-y-1 active:scale-95`}
          >
            <Calendar size={14} className="group-hover:scale-110 transition-transform" />
            Agendar Consulta
          </button>
  
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all z-[120] glass-morphism border-white/20 active:scale-90`}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-[130] md:hidden flex flex-col p-6 overflow-y-auto overflow-x-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 filter blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 filter blur-[120px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
            <div className="flex justify-between items-center w-full mb-12 relative z-10 shrink-0">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all shadow-lg active:scale-95 group"
                aria-label="Fechar menu"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end text-right">
                  <span className="font-serif text-white text-sm tracking-tight leading-none mb-1">Thiago Figueiró</span>
                  <span className="text-[7px] uppercase tracking-[0.3em] text-white font-black">Psicólogo Clínico</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/20 ring-4 ring-white/5 shadow-xl">
                  <img 
                    src="https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=1000" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              <div className="w-full max-w-[280px] space-y-10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black ml-1 mb-6 block">Menu</span>
                  <nav className="flex flex-col gap-6">
                    {[
                      { name: 'Início', href: '#' },
                      { name: 'Sobre Mim', href: '#about' },
                      { name: 'Depoimentos', href: '#testimonials' },
                      { name: 'Dúvidas comuns', href: '#faq' },
                      { name: 'Contato', href: '#contact' }
                    ].map((link, idx) => (
                      <motion.a 
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
                        onClick={() => setIsMenuOpen(false)} 
                        href={link.href} 
                        className="group flex items-center justify-between py-1"
                      >
                        <span className="text-4xl text-white font-serif italic transition-all group-hover:pl-4 group-hover:text-white/60">
                          {link.name}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-all text-white/40 -translate-x-4 group-hover:translate-x-0">
                          <ChevronRight size={14} />
                        </div>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      openScheduling();
                    }} 
                    className="w-full bg-primary-blue text-white px-8 py-5 rounded-full font-sans text-[11px] uppercase tracking-[0.25em] font-black flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(30,64,175,0.25)] active:scale-95 hover:bg-white hover:text-primary-blue transition-all duration-300 ring-2 ring-primary-blue/20"
                  >
                    <Calendar size={18} className="animate-pulse" />
                    Agendar Consulta
                  </button>
                </motion.div>
              </div>
            </div>

            <div className="mt-auto pt-10 border-t border-white/5 relative z-10">
              <div className="flex flex-col items-center gap-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-10"
                >
                  <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:-translate-y-1 shadow-lg shadow-white/5">
                      <img src="https://cdn.simpleicons.org/instagram/white" className="w-5 h-5" alt="Instagram" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-black transition-colors group-hover:text-white">Instagram</span>
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:-translate-y-1 shadow-lg shadow-white/5">
                      <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-5 h-5" alt="WhatsApp" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-black transition-colors group-hover:text-white">WhatsApp</span>
                  </a>
                </motion.div>
                <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold flex flex-col items-center gap-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setIsMenuOpen(false); setIsPrivacyOpen(true); }} 
                      className="hover:text-primary-blue bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-all"
                    >
                      Privacidade
                    </button>
                    <button 
                      onClick={() => { setIsMenuOpen(false); setIsTermsOpen(true); }} 
                      className="hover:text-primary-blue bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-all"
                    >
                      Termos
                    </button>
                  </div>
                  <span className="opacity-60">&copy; {new Date().getFullYear()} Thiago Figueiró &bull; CRP 04/48708</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
