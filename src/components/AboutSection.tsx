import React from 'react';
import { motion } from 'motion/react';
import { Heart, Shield, GraduationCap, Award, Briefcase } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-48 px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        {/* Left Side: Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1"
        >
          {/* CRP badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-4 -left-4 md:-top-8 md:-left-8 z-20 bg-white px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[32px] cinematic-shadow border border-primary-blue/5"
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary-blue font-black">CRP 04/48708</span>
          </motion.div>

          <div className="relative z-10 aspect-[3/4] rounded-[60px] md:rounded-[100px] overflow-hidden cinematic-shadow border-8 border-white">
            <img 
              src="https://drive.google.com/thumbnail?id=1tVcHVoHn9pV_CfvuJdn98sLlY3de_Ysh&sz=w1000" 
              className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
              alt="Thiago Figueiró" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-blue/10 rounded-full blur-[100px] -z-10" />
        </motion.div>

        {/* Right Side: Content */}
        <div className="space-y-12 md:space-y-16 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary-blue font-bold">Sobre Mim</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-natural-ink italic">
                Um espaço seguro <span className="text-primary-blue/60 italic">para o seu sentir.</span>
              </h2>
            </div>
            
            <div className="text-left space-y-6 md:space-y-10 py-4">
              <p className="text-lg md:text-xl text-natural-ink/80 font-light leading-relaxed">
                Psicólogo clínico formado pela <span className="font-medium text-primary-blue">FUMEC</span>. Desde 2017, acompanho pessoas em seus processos de autoconhecimento, ajudando-as a compreender emoções, romper padrões de sofrimento e construir novas narrativas com mais clareza e leveza.
              </p>
              
              <div className="border-l-4 border-primary-blue/20 pl-8 py-2">
                <p className="text-lg md:text-xl text-natural-ink/70 font-light leading-relaxed italic">
                  Acredito na força da escuta qualificada, no acolhimento e na construção de um espaço seguro, onde cada pessoa possa explorar suas emoções com autenticidade. Minha prática clínica é guiada por uma postura humana, sensível e sem julgamentos, favorecendo clareza, autoconhecimento e transformação.
                </p>
              </div>

              <p className="text-lg md:text-xl text-natural-ink/80 font-light leading-relaxed">
                Trabalho para ajudar você a compreender padrões, ressignificar experiências e desenvolver caminhos mais leves e possíveis para sua história.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-16 md:mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-primary-blue/5 p-10 rounded-[40px] cinematic-shadow text-left space-y-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary-blue/5 flex items-center justify-center text-primary-blue">
            <Heart size={24} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-serif italic text-natural-ink">Empatia</h4>
            <p className="text-sm text-natural-ink/50 leading-relaxed">Escuta ativa e um ambiente livre de quaisquer julgamentos.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white border border-primary-blue/5 p-10 rounded-[40px] cinematic-shadow text-left space-y-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary-blue/5 flex items-center justify-center text-primary-blue">
            <Shield size={24} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-serif italic text-natural-ink">Sigilo</h4>
            <p className="text-sm text-natural-ink/50 leading-relaxed">Privacidade absoluta garantida em todas as sessões presenciais ou online.</p>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-4xl mt-24 md:mt-32 text-left">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary-blue/60 font-bold">QUALIFICAÇÕES E EXPERIÊNCIA</span>
            <h2 className="text-4xl md:text-5xl font-serif text-natural-ink italic">Trajetória Profissional</h2>
          </div>

          <div className="grid gap-12">
            {[
              { 
                icon: GraduationCap, 
                title: 'Formação Acadêmica', 
                desc: 'Graduação em Psicologia pela FUMEC' 
              },
              { 
                icon: Award, 
                title: 'Especializações', 
                desc: 'Psicólogo clínico com atuação desde 2017' 
              },
              { 
                icon: Briefcase, 
                title: 'Experiência Clínica', 
                desc: 'Acompanhamento clínico individual em processos de autoconhecimento e saúde mental.' 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex gap-8 items-start group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-primary-blue/5 border border-primary-blue/10 flex items-center justify-center text-primary-blue transition-colors group-hover:bg-primary-blue group-hover:text-white">
                  <item.icon size={idx === 0 ? 24 : 26} strokeWidth={1.2} />
                </div>
                <div className="space-y-1 pt-2">
                  <h5 className="text-lg md:text-xl font-bold text-natural-ink">{item.title}</h5>
                  <p className="text-sm md:text-base text-natural-ink/50 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
