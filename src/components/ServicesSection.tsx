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
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Planos e Formatos</span>
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
          className="bg-white border border-olive/10 p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow group h-full transition-all"
        >
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif text-natural-ink italic">Atendimento pontual</h3>
              <p className="text-xs uppercase tracking-widest text-olive font-bold italic">Foco em situações específicas.</p>
              <div className="h-[1px] w-12 bg-olive/20" />
            </div>
            <p className="text-sm md:text-base text-natural-ink/70 leading-relaxed min-h-[100px]">
              Se você precisa de clareza imediata sobre uma situação ou decisão específica, esse espaço oferece escuta e direcionamento terapêutico.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>⏱ 50 minutos</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>📅 Sessão avulsa</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>🌐 Online ou presencial</span>
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-6">
            <div className="text-center">
              <span className="text-sm text-natural-ink/40 font-medium">Valor por sessão</span>
              <p className="text-3xl font-serif text-natural-ink mt-1">R$ 120 <span className="text-sm italic font-light opacity-60">por sessão</span></p>
            </div>
            <button
              onClick={() => openScheduling('Atendimento Pontual')}
              className="w-full py-4 rounded-2xl border border-olive text-olive font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-olive hover:text-white transition-all transform active:scale-95"
            >
              Agendar sessão
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.8 }}
          className="bg-natural-ink text-white p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow relative overflow-hidden h-full z-10"
        >
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-olive text-white px-5 py-1.5 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black shadow-lg shadow-olive/30 border border-white/10">
                  ⭐ Mais escolhido
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif italic">Psicoterapia semanal</h3>
                <p className="text-xs uppercase tracking-widest text-olive-light font-bold italic">Transformação consistente.</p>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed min-h-[100px]">
              Continuidade terapêutica que aprofunda questões emocionais, favorecendo mudanças reais e duradouras ao longo do tempo.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/90 font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>⏱ 50 minutos por sessão</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/90 font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>📅 1 sessão por semana</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/90 font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>🌐 Online ou presencial</span>
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-6">
            <div className="text-center">
              <span className="text-sm text-white/40 font-medium font-sans">Valor mensal</span>
              <p className="text-3xl font-serif text-white mt-1">R$ 400 <span className="text-sm italic font-light opacity-60">por mês</span></p>
            </div>
            <button
              onClick={() => openScheduling('Psicoterapia Semanal')}
              className="w-full py-4 rounded-2xl bg-olive text-white font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-olive/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Começar acompanhamento
            </button>
          </div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-olive/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white border border-olive/10 p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow group h-full transition-all"
        >
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif text-natural-ink italic">Psicoterapia quinzenal</h3>
              <p className="text-xs uppercase tracking-widest text-olive font-bold italic">Um ritmo equilibrado.</p>
              <div className="h-[1px] w-12 bg-olive/20" />
            </div>
            <p className="text-sm md:text-base text-natural-ink/70 leading-relaxed min-h-[100px]">
              Ideal para manutenção e processos iniciados que preferem um ritmo mais espaçado, sem abrir mão do cuidado contínuo.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>⏱ 50 minutos por sessão</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>📅 2 sessões por mês</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                <Sparkles size={14} className="opacity-40" />
                <span>🌐 Online ou presencial</span>
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-6">
            <div className="text-center">
              <span className="text-sm text-natural-ink/40 font-medium">Valor mensal</span>
              <p className="text-3xl font-serif text-natural-ink mt-1">R$ 250 <span className="text-sm italic font-light opacity-60">por mês</span></p>
            </div>
            <button
              onClick={() => openScheduling('Psicoterapia Quinzenal')}
              className="w-full py-4 rounded-2xl border border-olive text-olive font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-olive hover:text-white transition-all transform active:scale-95"
            >
              Agendar sessões
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
        <div className="h-[1px] w-12 bg-olive/20 mx-auto mb-6" />
        <p className="text-sm md:text-base text-natural-ink/40 font-medium italic">
          A frequência pode ser ajustada conforme a necessidade ao longo do processo.
        </p>
      </motion.div>
    </section>
  );
};
