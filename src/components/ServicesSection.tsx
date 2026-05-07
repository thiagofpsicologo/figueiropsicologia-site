import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  openScheduling: (plan?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ openScheduling }) => {
  return (
    <section id="services" className="py-20 md:py-40 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary-blue font-bold">Planos e Formatos</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-natural-ink italic">Formas de atendimento</h2>
          <p className="text-lg md:text-xl text-natural-ink/60 font-light leading-relaxed">
            Cada pessoa tem um momento diferente. Escolha o formato que faz mais sentido para você.
          </p>


        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white border border-primary-blue/10 p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow group h-full transition-all"
        >          <div className="space-y-8 text-left">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-serif text-natural-ink italic leading-tight">Atendimento pontual</h3>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-primary-blue/30" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary-blue font-black">Foco em clareza imediata</p>
              </div>
            </div>
            
            <p className="text-sm md:text-base text-natural-ink/80 leading-relaxed font-light">
              Ideal para quem busca clareza sobre uma situação ou decisão específica, oferecendo escuta técnica e apoio imediato.
            </p>

            <div className="space-y-1 pt-4">
              {[
                { label: 'Duração', value: '50 minutos' },
                { label: 'Formato', value: 'Sessão avulsa' },
                { label: 'Modalidade', value: 'Online / Presencial' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-primary-blue/5">
                  <span className="text-[9px] uppercase tracking-widest text-natural-ink/80 font-bold">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-widest text-primary-blue font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 space-y-8">
            <div className="text-center group-hover:scale-110 transition-transform duration-500">
              <span className="text-[10px] uppercase tracking-widest text-natural-ink/50 font-bold">Investimento</span>
              <p className="text-4xl font-serif text-natural-ink mt-2">R$ 120 <span className="text-xs italic font-light opacity-60">/sessão</span></p>
            </div>
            <button
              onClick={() => openScheduling('Atendimento Pontual')}
              className="w-full py-5 rounded-2xl border border-primary-blue/20 text-primary-blue font-sans text-[10px] uppercase tracking-[0.3em] font-black hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all transform active:scale-95 cinematic-shadow"
            >
              Iniciar Conversa
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -15 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-natural-ink text-white p-8 md:p-14 rounded-[50px] flex flex-col justify-between cinematic-shadow relative overflow-hidden h-full z-10 border border-white/5"
        >
          {/* Decorative grain/glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/10 rounded-full blur-[100px] -z-10" />
          
          <div className="space-y-8 text-left">
            <div className="space-y-5">
              <div className="inline-block">
                <motion.span 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-primary-blue text-white px-5 py-2 rounded-full text-[9px] uppercase tracking-[0.3em] font-black shadow-2xl shadow-primary-blue/20"
                >
                  Mais escolhido
                </motion.span>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-serif italic leading-tight">Psicoterapia semanal</h3>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-white/30" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary-blue font-black italic">Acompanhamento Contínuo</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
              Continuidade terapêutica para aprofundar questões emocionais e padrões de comportamento, visando transformações reais.
            </p>

            <div className="space-y-1 pt-4">
              {[
                { label: 'Frequência', value: '1x por semana' },
                { label: 'Processo', value: 'Longo Prazo' },
                { label: 'Foco', value: 'Autoconhecimento' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-[9px] uppercase tracking-widest text-white/80 font-bold">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 space-y-8">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold font-sans">Compromisso Mensal</span>
              <p className="text-4xl font-serif text-white mt-2">R$ 400 <span className="text-xs italic font-light opacity-60">/mês</span></p>
            </div>
            <button
              onClick={() => openScheduling('Psicoterapia Semanal')}
              className="w-full py-5 rounded-2xl bg-white text-natural-ink font-sans text-[10px] uppercase tracking-[0.3em] font-black shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Começar Jornada
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="bg-white border border-primary-blue/10 p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow group h-full transition-all"
        >
          <div className="space-y-8 text-left">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-serif text-natural-ink italic leading-tight">Psicoterapia quinzenal</h3>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-primary-blue/30" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary-blue font-black">Ritmo Equilibrado</p>
              </div>
            </div>
            
            <p className="text-sm md:text-base text-natural-ink/80 leading-relaxed font-light">
              Ideal para manutenção de processos ou para quem prefere um ritmo mais espaçado, mantendo o cuidado constante.
            </p>

            <div className="space-y-1 pt-4">
              {[
                { label: 'Frequência', value: '2x por mês' },
                { label: 'Modalidade', value: 'Online / Presencial' },
                { label: 'Plano', value: 'Quinzenal' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-primary-blue/5">
                  <span className="text-[9px] uppercase tracking-widest text-natural-ink/80 font-bold">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-widest text-primary-blue font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 space-y-8">
            <div className="text-center group-hover:scale-110 transition-transform duration-500">
              <span className="text-[10px] uppercase tracking-widest text-natural-ink/50 font-bold">Investimento</span>
              <p className="text-4xl font-serif text-natural-ink mt-2">R$ 250 <span className="text-xs italic font-light opacity-60">/mês</span></p>
            </div>
            <button
              onClick={() => openScheduling('Psicoterapia Quinzenal')}
              className="w-full py-5 rounded-2xl border border-primary-blue/20 text-primary-blue font-sans text-[10px] uppercase tracking-[0.3em] font-black hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all transform active:scale-95 cinematic-shadow"
            >
              Ver Disponibilidade
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-xl mx-auto mt-20 text-center px-6"
      >
        <div className="h-[1px] w-12 bg-primary-blue/20 mx-auto mb-6" />
        <p className="text-sm md:text-base text-natural-ink/60 font-medium italic">
          A frequência pode ser ajustada conforme a necessidade ao longo do processo.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex flex-col md:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-primary-blue/[0.03] border border-primary-blue/10 max-w-2xl mx-auto mt-6"
        >
          <div className="flex items-center gap-2 text-primary-blue flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Sigilo e Segurança</span>
          </div>
          <div className="w-px h-4 bg-primary-blue/20 hidden md:block" />
          <p className="text-[10px] md:text-[11px] text-natural-ink/75 leading-relaxed font-light text-center md:text-left">
            As sessões ocorrem em ambiente virtual seguro e privativo. Utilizo tecnologias que garantem a criptografia dos dados, assegurando que todo o conteúdo do atendimento seja estritamente confidencial, conforme as normas do Conselho Federal de Psicologia.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
