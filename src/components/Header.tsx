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
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-3 md:py-6 flex flex-row justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-primary-blue/5 py-2 md:py-4' : 'bg-transparent py-4'}`}>
        <a 
          href="#" 
          className={`flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border transition-all group backdrop-blur-md shrink-0 max-w-[70%] hover:scale-102 active:scale-95 ${isScrolled ? 'bg-white border-primary-blue/10 shadow-sm' : 'bg-white/40 border-white/30'}`}
        >
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform shadow-md border border-primary-blue/10">
            <img 
              src="https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=w1000" 
              alt="Logo Thiago Figueiró" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className={`font-serif text-[10px] md:text-base font-medium tracking-tight transition-colors truncate ${isScrolled ? 'text-natural-ink' : 'text-white'}`}>Thiago Figueiró</span>
        </a>
 
        <div className={`hidden md:flex gap-6 lg:gap-8 items-center px-8 py-3 rounded-full border transition-all duration-500 backdrop-blur-md ${isScrolled ? 'bg-white/90 border-primary-blue/10 shadow-lg' : 'bg-white/20 border-white/20'}`}>
          {[
            { name: 'Início', href: '#' },
            { name: 'Sobre Mim', href: '#about' },
            { name: 'Depoimentos', href: '#testimonials' },
            { name: 'Contato', href: '#contact' }
          ].map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className={`text-xs transition-all font-sans font-bold relative group/link ${isScrolled ? 'text-natural-ink/70 hover:text-primary-blue' : 'text-white hover:text-white/80'}`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover/link:w-full ${isScrolled ? 'bg-primary-blue/40' : 'bg-white/40'}`} />
            </a>
          ))}
          <div className={`w-[1px] h-4 mx-1 transition-colors ${isScrolled ? 'bg-primary-blue/20' : 'bg-white/20'}`} />
          <div className="flex gap-4 items-center">
            <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125 duration-300" title="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/E4405F" className={`w-4 h-4 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-90'}`} alt="Instagram" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125 duration-300" title="WhatsApp">
              <img src="https://cdn.simpleicons.org/whatsapp/25D366" className={`w-4 h-4 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-90'}`} alt="WhatsApp" />
            </a>
          </div>
        </div>

        <button
          onClick={openScheduling}
          className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full shadow-xl transition-all font-sans text-xs uppercase tracking-widest font-bold ${isScrolled ? 'bg-primary-blue text-white shadow-primary-blue/20 hover:bg-natural-ink' : 'bg-primary-blue text-white shadow-primary-blue/20 hover:bg-white hover:text-primary-blue'}`}
        >
          <Calendar size={14} />
          Agendar Consulta
        </button>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all z-[120] backdrop-blur-md ${isMenuOpen ? 'bg-white/10 border-white/20 text-white' : (isScrolled ? 'bg-white border-primary-blue/10 text-natural-ink shadow-sm' : 'bg-white/40 border-white/30 text-white')}`}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/10 filter blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-blue/5 filter blur-[120px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
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
                  <span className="text-[7px] uppercase tracking-[0.3em] text-primary-blue font-black">Psicólogo Clínico</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/20 ring-4 ring-white/5 shadow-xl">
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
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary-blue font-black ml-1 mb-6 block">Menu</span>
                  <nav className="flex flex-col gap-6">
                    {[
                      { name: 'Início', href: '#' },
                      { name: 'Sobre Mim', href: '#about' },
                      { name: 'Depoimentos', href: '#testimonials' },
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
                        <span className="text-4xl text-white font-serif italic transition-all group-hover:pl-4 group-hover:text-primary-blue">
                          {link.name}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-all text-primary-blue -translate-x-4 group-hover:translate-x-0">
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
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary-blue group-hover:border-primary-blue group-hover:-translate-y-1">
                      <img src="https://cdn.simpleicons.org/instagram/white" className="w-5 h-5" alt="Instagram" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold group-hover:text-white/60 transition-colors">Instagram</span>
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:-translate-y-1">
                      <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-5 h-5" alt="WhatsApp" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold group-hover:text-white/60 transition-colors">WhatsApp</span>
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
