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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-natural-ink z-[130] md:hidden flex flex-col p-8 overflow-y-auto overflow-x-hidden"
          >
            {/* Ambient background glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[80%] aspect-square bg-primary-blue/20 filter blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[100%] aspect-square bg-primary-blue/10 filter blur-[150px] rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-start w-full relative z-10 shrink-0 mb-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/10 ring-4 ring-white/5 shadow-2xl">
                  <img 
                    src="https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=1000" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white text-lg tracking-tight leading-none mb-1">Thiago Figueiró</span>
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/50 font-black">Psicólogo Clínico</span>
                </div>
              </div>

              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all shadow-lg active:scale-90 group"
                aria-label="Fechar menu"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="w-full space-y-12">
                <div className="space-y-4">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black ml-1 block mb-8">Navegação</span>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => setIsMenuOpen(false)} 
                        href={link.href} 
                        className="group flex items-baseline gap-6"
                      >
                        <span className="text-white/20 font-mono text-xs tracking-widest mt-1">
                          0{idx + 1}
                        </span>
                        <span className="text-5xl text-white font-serif italic transition-all group-hover:text-primary-blue group-hover:translate-x-2">
                          {link.name}
                        </span>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      openScheduling();
                    }} 
                    className="w-full bg-primary-blue text-white px-8 py-5 rounded-2xl font-sans text-[12px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(30,64,175,0.3)] active:scale-95 transition-all duration-300"
                  >
                    <Calendar size={18} />
                    Agendar Sessão
                  </button>
                </motion.div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 group">
                  <img src="https://cdn.simpleicons.org/instagram/white" className="w-6 h-6 transition-transform group-hover:scale-110" alt="Instagram" />
                  <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">Instagram</span>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 group">
                  <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-6 h-6 transition-transform group-hover:scale-110" alt="WhatsApp" />
                  <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">WhatsApp</span>
                </a>
              </div>
              
              <div className="mt-10 flex flex-col items-center gap-6 text-[8px] text-white/20 uppercase tracking-[0.3em] font-bold">
                <div className="flex gap-6">
                  <button onClick={() => { setIsMenuOpen(false); setIsPrivacyOpen(true); }} className="hover:text-white transition-colors underline decoration-white/10 underline-offset-4">Privacidade</button>
                  <button onClick={() => { setIsMenuOpen(false); setIsTermsOpen(true); }} className="hover:text-white transition-colors underline decoration-white/10 underline-offset-4">Termos</button>
                </div>
                <span className="opacity-40 text-center uppercase">&copy; {new Date().getFullYear()} Thiago Figueiró &bull; CRP 04/48708</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
