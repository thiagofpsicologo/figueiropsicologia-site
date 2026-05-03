import React from 'react';
import { motion } from 'motion/react';
import { Heart, Shield, GraduationCap, Award, Briefcase } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-40 px-6 md:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative mb-16 max-w-sm w-full mx-auto"
      >
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-olive/20 rounded-tr-3xl -z-0" 
        />
        <motion.div 
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-olive/20 rounded-bl-3xl -z-0" 
        />

        <div className="absolute inset-0 bg-olive/5 rounded-[48px] rotate-3 -z-10 translate-x-3 translate-y-3" />
        
        <div className="aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden cinematic-shadow border-[6px] border-white relative z-10 bg-natural-stone/10 ring-1 ring-olive/5">
          <img 
            src="https://drive.google.com/thumbnail?id=1tVcHVoHn9pV_CfvuJdn98sLlY3de_Ysh&sz=w1000" 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            alt="Thiago Figueiró" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex flex-col items-center text-center"
        >
          <div className="h-[1px] w-8 bg-olive/30 mb-4" />
          <div className="px-4 py-1.5 rounded-full bg-olive/5 border border-olive/10">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-olive font-bold">CRP 04/48708</span>
          </div>
        </motion.div>

        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-olive/5 rounded-full blur-[100px] -z-20" />
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-olive-light/10 rounded-full blur-[100px] -z-20" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 md:space-y-10 max-w-3xl"
      >
        <div className="space-y-4">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Sobre Mim</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight md:leading-[1.1] text-natural-ink italic">
            Um espaço seguro <br className="hidden sm:block"/><span className="italic text-olive">para o seu sentir.</span>
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto text-left space-y-6 md:space-y-8 py-4">
          <p className="text-lg md:text-xl text-natural-ink/80 font-light leading-relaxed">
            Psicólogo clínico formado pela <span className="font-medium text-olive">FUMEC</span>. Desde 2017, acompanho pessoas em seus processos de autoconhecimento, ajudando-as a compreender emoções, romper padrões de sofrimento e construir novas narrativas com mais clareza e leveza.
          </p>
          
          <p className="text-lg md:text-xl text-natural-ink/80 font-light leading-relaxed border-l-2 border-olive/20 pl-6 md:pl-8 italic">
            Acredito na força da escuta qualificada, no acolhimento e na construção de um espaço seguro, onde cada pessoa possa explorar suas emoções com autenticidade. Minha prática clínica é guiada por uma postura humana, sensível e sem julgamentos, favorecendo clareza, autoconhecimento e transformação.
          </p>

          <p className="text-lg md:text-xl text-natural-ink/80 font-light leading-relaxed">
            Trabalho para ajudar você a compreender padrões, ressignificar experiências e desenvolver caminhos mais leves e possíveis para sua história.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 pt-4 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-olive/5 border border-olive/10 p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4"
          >
            <Heart className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            <h4 className="font-serif text-xl md:text-2xl italic">Empatia</h4>
            <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Escuta ativa e um ambiente livre de quaisquer julgamentos.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-olive/5 border border-olive/10 p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4"
          >
            <Shield className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            <h4 className="font-serif text-xl md:text-2xl italic">Sigilo</h4>
            <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Privacidade absoluta garantida em todas as sessões presenciais ou online.</p>
          </motion.div>
        </div>

        <div className="pt-12 md:pt-16 space-y-8 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Qualificações e Experiência</span>
            <h3 className="text-3xl md:text-4xl font-serif text-natural-ink italic">Trajetória Profissional</h3>
          </motion.div>

          <div className="grid gap-6">
            {[
              { icon: GraduationCap, title: 'Formação Acadêmica', desc: 'Graduação em Psicologia pela FUMEC' },
              { icon: Award, title: 'Especializações', desc: 'Psicólogo clínico com atuação desde 2017' },
              { icon: Briefcase, title: 'Experiência Clínica', desc: 'Acompanhamento clínico individual em processos de autoconhecimento e saúde mental.' }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex gap-5 items-start font-sans"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center cinematic-shadow border border-olive/5">
                  <item.icon className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="font-bold text-sm md:text-base text-natural-ink mb-1">{item.title}</h5>
                  <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
