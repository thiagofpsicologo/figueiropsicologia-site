import React, { useEffect } from 'react';
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
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.height = '';
    };
  }, [isMenuOpen]);

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
          <>
            {/* Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-natural-ink/20 backdrop-blur-sm z-[125] md:hidden"
            />
            
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 h-[100dvh] bg-white z-[130] md:hidden flex flex-col p-6 overflow-hidden border-l border-white/20 overscroll-none"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/10 filter blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-blue/5 filter blur-[120px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              
              <div className="flex justify-between items-center w-full mb-8 relative z-10 shrink-0">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-primary-blue/5 border border-primary-blue/10 flex items-center justify-center text-primary-blue active:scale-95 group shadow-sm transition-all"
                  aria-label="Fechar menu"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end text-right">
                    <span className="font-serif text-natural-ink text-sm tracking-tight leading-none mb-1">Thiago Figueiró</span>
                    <span className="text-[7px] uppercase tracking-[0.3em] text-primary-blue font-black">Psicólogo Clínico</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-primary-blue/10 ring-4 ring-primary-blue/5 shadow-md">
                    <img 
                      src="https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=w1000" 
                      alt="Logo" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
  
              <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-4">
                <div className="w-full max-w-[300px] space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-natural-ink/40 font-black ml-1 block">Navegação</span>
                    <nav className="flex flex-col gap-4">
                      {[
                        { name: 'Início', href: '#' },
                        { name: 'Sobre Mim', href: '#about' },
                        { name: 'Depoimentos', href: '#testimonials' },
                        { name: 'Dúvidas comuns', href: '#faq' },
                        { name: 'Contato', href: '#contact' }
                      ].map((link, idx) => (
                        <motion.a 
                          key={link.name}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                          onClick={() => setIsMenuOpen(false)} 
                          href={link.href} 
                          className="group flex items-center justify-between py-2.5 px-1 rounded-xl transition-all active:bg-primary-blue/5"
                        >
                          <span className="text-3xl text-natural-ink font-serif italic transition-all group-active:text-primary-blue">
                            {link.name}
                          </span>
                          <ChevronRight size={18} className="text-primary-blue/30" />
                        </motion.a>
                      ))}
                    </nav>
                  </div>
  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                  >
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        openScheduling();
                      }} 
                      className="w-full bg-primary-blue text-white px-8 py-5 rounded-full font-sans text-[11px] uppercase tracking-[0.25em] font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all duration-300"
                    >
                      <Calendar size={18} />
                      Agendar Consulta
                    </button>
                  </motion.div>
                </div>
              </div>
  
              <div className="mt-auto pt-8 border-t border-primary-blue/10 relative z-10 shrink-0">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex gap-10">
                    <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                      <div className="w-12 h-12 rounded-2xl bg-primary-blue/5 border border-primary-blue/10 flex items-center justify-center active:bg-primary-blue/10 transition-colors">
                        <img src="https://cdn.simpleicons.org/instagram/0F172A" className="w-5 h-5" alt="Instagram" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-natural-ink/40 font-black">Instagram</span>
                    </a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                      <div className="w-12 h-12 rounded-2xl bg-primary-blue/5 border border-primary-blue/10 flex items-center justify-center active:bg-primary-blue/10 transition-colors">
                        <img src="https://cdn.simpleicons.org/whatsapp/0F172A" className="w-5 h-5" alt="WhatsApp" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-natural-ink/40 font-black">WhatsApp</span>
                    </a>
                  </div>
                  <div className="text-[9px] text-natural-ink/30 uppercase tracking-[0.2em] font-bold flex flex-col items-center gap-3">
                    <div className="flex gap-6">
                      <button onClick={() => { setIsMenuOpen(false); setIsPrivacyOpen(true); }} className="hover:text-primary-blue transition-colors">Privacidade</button>
                      <button onClick={() => { setIsMenuOpen(false); setIsTermsOpen(true); }} className="hover:text-primary-blue transition-colors">Termos</button>
                    </div>
                    <span className="opacity-60 font-medium">&copy; {new Date().getFullYear()} Thiago Figueiró &bull; CRP 04/48708</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
