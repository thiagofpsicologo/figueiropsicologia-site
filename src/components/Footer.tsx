import React from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

interface FooterProps {
  openScheduling: () => void;
  setIsPrivacyOpen: (open: boolean) => void;
  setIsTermsOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  openScheduling, 
  setIsPrivacyOpen, 
  setIsTermsOpen 
}) => {
  return (
    <footer className="bg-[#F7F5F2] pt-20 pb-12 px-6 md:px-12 border-t border-olive/10 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center opacity-[0.02] pointer-events-none select-none overflow-hidden whitespace-nowrap">
        <span className="font-serif italic text-[20vw] leading-none text-natural-ink">Thiago Figueiró</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-20 lg:mb-32 text-left">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center overflow-hidden cinematic-shadow border border-olive/5 ring-4 ring-olive/5">
                <img 
                  src="https://drive.google.com/thumbnail?id=1yzSCUAze6LpYcEM5Em-MU2MnLm5NUgze&sz=w1000" 
                  alt="Logo Thiago Figueiró" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-natural-ink">Thiago Figueiró</h3>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-olive font-black">Psicólogo Clínico</p>
                  <div className="px-2.5 py-1 rounded-full border border-olive/20 bg-white/50 backdrop-blur-sm flex items-center shadow-sm">
                     <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-olive font-bold">CRP 04/48708</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <p className="text-sm md:text-base text-natural-ink/50 leading-relaxed max-w-xs font-light">
              Acompanhando processos de autoconhecimento e transformação com ética, sensibilidade e acolhimento.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all group" title="Instagram">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all group" title="WhatsApp">
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:thiagomeirelesfigueiro@hotmail.com.br" className="w-10 h-10 rounded-full border border-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all group" title="Email">
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-olive">Navegação</h4>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Início', href: '#' },
                { name: 'Sobre Mim', href: '#about' },
                { name: 'Atendimentos', href: '#services' },
                { name: 'Depoimentos', href: '#testimonials' },
                { name: 'Contato', href: '#contact' }
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-sm font-medium text-natural-ink/70 hover:text-olive transition-all flex items-center gap-2 group w-fit"
                >
                  <span className="w-0 h-px bg-olive transition-all group-hover:w-4" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-olive">Contatos</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-xl bg-olive/5 flex items-center justify-center text-olive shrink-0">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-natural-ink/40 font-bold mb-1">Telefone</span>
                  <a href="tel:+5531994238535" className="text-sm font-medium text-natural-ink/80 hover:text-olive transition-colors">(31) 99423-8535</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-xl bg-olive/5 flex items-center justify-center text-olive shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-natural-ink/40 font-bold mb-1">Localização</span>
                  <span className="text-sm font-medium text-natural-ink/80">Belo Horizonte, MG</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-xl bg-olive/5 flex items-center justify-center text-olive shrink-0">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-natural-ink/40 font-bold mb-1">Email</span>
                  <a href="mailto:thiagomeirelesfigueiro@hotmail.com.br" className="text-sm font-medium text-natural-ink/80 hover:text-olive transition-colors">thiagomeirelesfigueiro@@hotmail.com.br</a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 bg-white/40 p-8 rounded-[32px] border border-olive/5 cinematic-shadow">
            <div className="space-y-2">
              <h4 className="font-serif text-xl italic text-natural-ink">Reserve seu horário</h4>
              <p className="text-xs text-natural-ink/50 leading-relaxed">
                Consulte a disponibilidade em tempo real e inicie sua jornada.
              </p>
            </div>
            <button 
              onClick={openScheduling}
              className="w-full bg-olive text-white py-4 rounded-2xl font-sans text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg shadow-olive/10 hover:shadow-olive/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              id="footer-scheduling-btn"
            >
              <Calendar size={14} />
              Agendar Consulta
            </button>
            <div className="pt-2 flex items-center justify-center gap-2 grayscale hover:grayscale-0 transition-opacity opacity-40 hover:opacity-100">
              <Shield size={12} className="text-olive" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Ambiente 100% Seguro</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-olive/10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-natural-ink/30 font-bold text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Thiago Figueiró &bull; CRP 04/48708 &bull; Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsPrivacyOpen(true)}
               className="text-[9px] uppercase tracking-[0.2em] text-natural-ink/40 font-black hover:text-olive hover:bg-olive/5 px-4 py-2 rounded-full border border-olive/10 transition-all cursor-pointer backdrop-blur-sm"
               id="privacy-policy-link"
             >
               Políticas de Privacidade
             </button>
             <button 
               onClick={() => setIsTermsOpen(true)}
               className="text-[9px] uppercase tracking-[0.2em] text-natural-ink/40 font-black hover:text-olive hover:bg-olive/5 px-4 py-2 rounded-full border border-olive/10 transition-all cursor-pointer backdrop-blur-sm"
               id="terms-of-use-link"
             >
               Termos de Uso
             </button>
          </div>
        </div>

        <div className="mt-16 flex justify-center opacity-[0.05]">
          <h2 className="font-serif italic text-4xl md:text-6xl text-natural-ink tracking-tighter">
            Thiago Figueiró
          </h2>
        </div>
      </div>
    </footer>
  );
};
