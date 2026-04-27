/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Calendar, MessageCircle, ChevronDown, Sparkles, Heart, Shield, Instagram, Linkedin, Menu, X, Mail, MapPin, Phone, GraduationCap, Award, Briefcase } from 'lucide-react';

// SCENE DATA based on the prompt provided by the user
const WHATSAPP_MESSAGE = encodeURIComponent(`Olá! Seja muito bem-vindo(a) 

Aqui é o Thiago Figueiró, psicólogo.

Fico feliz por você ter chegado até aqui, você deu um passo importante ao entrar em contato. 
Se quiser, pode me contar brevemente o que está buscando estou aqui para te ouvir.

Assim que possível, te respondo com atenção. Muito obrigado!`);

const WHATSAPP_LINK = `https://wa.me/5531994238535?text=${WHATSAPP_MESSAGE}`;

const SCENES = [
  {
    id: 'dor',
    title: 'Thiago Figueiró',
    audioText: 'piano leve e emocional',
    image: 'https://drive.google.com/thumbnail?id=1o0JTapO9ZtBT9LhP1KR3FpS1uF3UP74k&sz=w1000',
    accent: 'Psicólogo Clínico'
  },
  {
    id: 'identificacao',
    title: '"Ansiedade, excesso de pensamentos, dificuldade de se expressar…"',
    audioText: '',
    image: 'https://drive.google.com/thumbnail?id=1u2aQsIBEyBbn9BWVfEzzPGxROJwQ4-_3&sz=w1000',
    accent: 'Reflexão'
  },
  {
    id: 'transicao',
    title: '"Você não precisa lidar com isso sozinho."',
    audioText: '',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1080&h=1920',
    accent: 'Acolhimento'
  },
  {
    id: 'apresentacao',
    title: 'Psicólogo Thiago Figueiró',
    audioText: '',
    image: 'https://images.unsplash.com/photo-1556157382-97dee2dcb73c?auto=format&fit=crop&q=80&w=1080&h=1920',
    accent: 'Profissionalismo',
    sideImage: 'https://drive.google.com/thumbnail?id=10nGDSHCmTjRxdAQIpWBe-E5TdHPgWCBB&sz=w1000'
  },
  {
    id: 'transformacao',
    title: '"Entenda seus pensamentos. Cuide da sua mente. Viva com mais leveza."',
    audioText: '',
    image: 'https://drive.google.com/thumbnail?id=1xXM_yXyvLBJIWxk9pVkoduzthNrdM50D&sz=w1000',
    accent: 'Leveza'
  }
];

const TESTIMONIALS = [
  {
    name: "Ana P.",
    role: "Paciente a 1 ano",
    quote: "O Thiago tem uma sensibilidade única. Me senti acolhida desde a primeira sessão, sem julgamentos.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Carlos M.",
    role: "Acompanhamento Semanal",
    quote: "Processo transformador. Aprendi a lidar com minha ansiedade de uma forma que nunca imaginei ser possível.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Juliana R.",
    role: "Superação de Burnout",
    quote: "Um espaço de cura real. O Thiago é extremamente profissional e humano ao mesmo tempo.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=60&w=200&h=200"
  }
];

interface SceneProps {
  scene: typeof SCENES[0] & { sideImage?: string };
  index: number;
  total: number;
}

const Scene: React.FC<SceneProps> = ({ scene, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1.1, 1, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative h-screen h-[100dvh] w-full flex overflow-hidden ${index === 0 ? 'justify-start items-end pb-32 pl-8 md:pl-16 lg:pl-20 lg:pb-24' : 'justify-center items-center'}`}>
      <motion.div 
        style={{ opacity, scale, y: imageY }}
        className="absolute inset-0 z-0 h-[120%] top-[-10%]"
      >
        <img 
          src={scene.image} 
          alt={scene.title}
          className="w-full h-full object-cover object-[80%_20%] sm:object-[45%_20%] grayscale-[20%] sepia-[10%] brightness-[0.65]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/40 to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity, y: index === 0 ? 0 : y }}
        className={`relative z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 ${index === 0 ? 'text-left lg:pl-0' : 'justify-center'}`}
      >
        <div className={`max-w-xl ${index === 0 ? 'text-left' : (scene.sideImage ? 'text-left' : 'text-center')}`}>
          <motion.span 
            initial={index === 0 ? { opacity: 1, x: 0 } : { opacity: 0, y: 10 }}
            animate={index === 0 ? { opacity: 1, x: 0 } : {}}
            whileInView={index === 0 ? {} : { opacity: 1, y: 0 }}
            className="block font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-white mb-4 font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,1)]"
          >
            {scene.accent}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-serif leading-[1.1] italic drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            {scene.title}
          </h2>
        </div>

        {scene.sideImage && (
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-56 h-72 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] shrink-0"
          >
            <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-white/20 backdrop-blur-sm cinematic-shadow group transition-transform duration-500 hover:scale-105">
              <img 
                src={scene.sideImage} 
                alt="Thiago Figueiró Professional" 
                className="w-full h-full object-cover object-top md:object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Decolative element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-white/10 rounded-[40px]" />
          </motion.div>
        )}
      </motion.div>

      {index === 0 && (
        <motion.div 
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-widest">Role para iniciar</span>
          <ChevronDown size={24} className="md:w-7 md:h-7" />
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="natural-gradient selection:bg-olive selection:text-white min-h-screen transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-3 md:p-5 flex justify-between items-center transition-all">
        <a href="#" className="flex items-center gap-2 md:gap-3 bg-white/30 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 hover:bg-white/40 transition-all group">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
            <img 
              src="https://drive.google.com/thumbnail?id=10taANe2B2DrYxggYuYrP098CD_pZntCN&sz=w1000" 
              alt="Logo Thiago Figueiró" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-serif text-sm md:text-base text-white font-medium tracking-tight">Thiago Figueiró</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center bg-white/30 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20">
          <a href="#" className="text-xs uppercase tracking-widest text-white hover:text-white/80 transition-colors font-sans font-bold">Home</a>
          <a href="#about" className="text-xs uppercase tracking-widest text-white hover:text-white/80 transition-colors font-sans font-bold">Sobre Mim</a>
          <a href="#testimonials" className="text-xs uppercase tracking-widest text-white hover:text-white/80 transition-colors font-sans font-bold">Relatos</a>
          <div className="w-[1px] h-3 bg-white/20 mx-1" />
          <div className="flex gap-4 items-center">
            <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110" title="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/E4405F" className="w-4 h-4" alt="Instagram" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110" title="WhatsApp">
              <img src="https://cdn.simpleicons.org/whatsapp/25D366" className="w-4 h-4" alt="WhatsApp" />
            </a>
          </div>
        </div>

        {/* Desktop Agendar Button */}
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center gap-2 bg-olive text-white px-6 py-2.5 rounded-full shadow-xl hover:shadow-olive/20 transition-all font-sans text-xs uppercase tracking-widest font-bold"
        >
          <Calendar size={14} />
          Agendar Consulta
        </motion.a>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-[110]"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-natural-ink z-[105] flex flex-col justify-center items-center gap-12 p-8"
            >
              <nav className="flex flex-col items-center gap-8">
                <a onClick={() => setIsMenuOpen(false)} href="#" className="text-4xl text-white font-serif italic">Home</a>
                <a onClick={() => setIsMenuOpen(false)} href="#about" className="text-4xl text-white font-serif italic">Sobre Mim</a>
                <a onClick={() => setIsMenuOpen(false)} href="#testimonials" className="text-4xl text-white font-serif italic">Relatos</a>
                <motion.a 
                  onClick={() => setIsMenuOpen(false)} 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-olive text-white px-8 py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3"
                >
                  <Calendar size={16} />
                  Agendar Consulta
                </motion.a>
              </nav>
              <div className="flex gap-8 mt-4">
                <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-full shadow-lg transition-transform hover:scale-110">
                  <img src="https://cdn.simpleicons.org/instagram/E4405F" className="w-8 h-8" alt="Instagram Logo" />
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-full shadow-lg transition-transform hover:scale-110">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" className="w-8 h-8" alt="WhatsApp Logo" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cinematic Storytelling Sections */}
      <main className="relative">
        {SCENES.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} total={SCENES.length} />
        ))}

        {/* Presentation Section */}
        <section id="about" className="py-20 md:py-40 px-6 md:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative mb-16 max-w-lg w-full"
          >
            <div className="aspect-[3/4] rounded-[24px] md:rounded-[40px] overflow-hidden cinematic-shadow border-8 md:border-[12px] border-white relative z-10">
              <img 
                src="https://drive.google.com/thumbnail?id=1tVcHVoHn9pV_CfvuJdn98sLlY3de_Ysh&sz=w1000" 
                className="w-full h-full object-cover"
                alt="Thiago Figueiró"
                referrerPolicy='no-referrer'
              />
            </div>
            {/* Artistic deco element */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 -right-8 w-32 md:w-40 h-32 md:h-40 bg-olive/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-4 -left-4 md:-top-8 -left-8 w-32 md:w-40 h-32 md:h-40 bg-olive-light/20 rounded-full blur-3xl -z-0" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-10 max-w-3xl"
          >
            <div className="space-y-4">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Sobre Mim</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight md:leading-[1.1] text-natural-ink">
                Um espaço seguro <br className="hidden sm:block"/><span className="italic text-olive">para o seu sentir.</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed text-natural-ink/70 font-sans font-light max-w-lg mx-auto">
              Thiago Figueiró ajuda você a navegar pela ansiedade e excesso de pensamentos com uma abordagem 
              empática, moderna e profundamente acolhedora.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 pt-4 text-left">
              <div className="bg-olive-glow olive-border p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4">
                <Heart className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                <h4 className="font-serif text-xl md:text-2xl">Empatia</h4>
                <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Escuta ativa e um ambiente livre de quaisquer julgamentos.</p>
              </div>
              <div className="bg-olive-glow olive-border p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4">
                <Shield className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                <h4 className="font-serif text-xl md:text-2xl">Sigilo</h4>
                <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Privacidade absoluta garantida em todas as sessões presenciais ou online.</p>
              </div>
            </div>

            {/* Qualifications Subsection */}
            <div className="pt-12 md:pt-16 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Qualificações e Experiência</span>
                <h3 className="text-3xl md:text-4xl font-serif text-natural-ink italic">Trajetória Profissional</h3>
              </div>

              <div className="grid gap-6">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center cinematic-shadow border border-olive/5">
                    <GraduationCap className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm md:text-base text-natural-ink mb-1">Formação Acadêmica</h5>
                    <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Graduação em Psicologia Clínica</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center cinematic-shadow border border-olive/5">
                    <Award className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm md:text-base text-natural-ink mb-1">Especializações</h5>
                    <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Graduação em Psicologia pela FUMEC desde 2017</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center cinematic-shadow border border-olive/5">
                    <Briefcase className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm md:text-base text-natural-ink mb-1">Experiência Clínica</h5>
                    <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Vasta experiência em atendimento clínico individual, auxiliando pacientes em processos de autoconhecimento e superação de traumas.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services / Areas of Work Section */}
        <section id="services" className="py-24 md:py-32 bg-natural-bg relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">O que trabalhamos</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-natural-ink italic leading-tight">
                Como posso te ajudar
              </h2>
              <div className="w-12 h-[1px] bg-olive/30 mx-auto mt-8" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  id: "001",
                  title: "Sofrimento existencial e sentido de vida",
                  description: "A angústia, o vazio e a falta de direção não são falhas individuais, mas experiências humanas profundas que podem abrir caminhos de reflexão e transformação."
                },
                {
                  id: "002",
                  title: "Ansiedade, depressão e sofrimento psíquico",
                  description: "Compreendidos para além do sintoma, considerando as relações sociais, históricas e afetivas que atravessam cada sujeito."
                },
                {
                  id: "003",
                  title: "Identidade, raça e pertencimento",
                  description: "Reflexões sobre quem se é em um contexto que muitas vezes invisibiliza, exclui ou silencia determinadas existências."
                },
                {
                  id: "004",
                  title: "Relações afetivas e vínculos",
                  description: "Os encontros, desencontros, perdas e dependências que marcam nossa forma de existir com o outro."
                },
                {
                  id: "005",
                  title: "Corpo, sexualidade e desejo",
                  description: "Uma escuta ética e sem julgamentos sobre as expressões do corpo, do desejo e das vivências que nem sempre encontram espaço de fala."
                },
                {
                  id: "006",
                  title: "Crise, ruptura e recomeço",
                  description: "Momentos de mudança que desorganizam a vida, mas que também podem abrir possibilidades de novos caminhos."
                }
              ].map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-natural-ink/5 hover:border-olive/20 transition-all duration-500 flex flex-col group cursor-default"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-olive/40 py-1 px-2 bg-olive/5 rounded-md group-hover:text-olive transition-colors">
                      {item.id}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-olive opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-natural-ink mb-5 leading-snug group-hover:italic group-hover:translate-x-1 transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-natural-ink/60 leading-relaxed font-light mt-auto">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 md:py-40 bg-natural-ink text-natural-bg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
             <Sparkles className="w-full h-full text-white" />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-8 md:space-y-12"
            >
              <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-none tracking-tighter">
                Vamos conversar?
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light max-w-xl mx-auto leading-relaxed">
                Dê o primeiro passo para uma vida mais leve. Agende sua consulta presencial ou online hoje mesmo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-4 md:pt-8">
                <motion.a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-olive text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 shadow-2xl hover:bg-olive/90 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-4 h-4 md:w-[18px] md:h-[18px]" alt="WhatsApp" />
                  WhatsApp
                </motion.a>
                
                <motion.a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
                >
                  <Calendar size={18} />
                  Ver Horários
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-32 px-6 md:px-8 max-w-6xl mx-auto overflow-hidden">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Relatos</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">O que dizem os pacientes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] cinematic-shadow olive-border flex flex-col justify-between"
              >
                <p className="text-base md:text-lg font-serif italic text-natural-ink/80 leading-relaxed mb-6 md:mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover grayscale-[30%]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-xs md:text-sm text-natural-ink">{t.name}</h4>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-olive font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 md:py-24 px-6 md:px-12 border-t border-natural-ink/5 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col items-center mb-16">
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform duration-500 ease-out inline-block px-4"
          >
            <img 
              src="https://drive.google.com/thumbnail?id=1OBgTceJbRAvCHXUGVfARabGLLrMS076Z&sz=w1000" 
              alt="Logo Thiago Figueiró Rodapé" 
              className="h-48 md:h-80 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
          {/* Column 1: Identity & Social Media */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-olive/20 cinematic-shadow bg-white flex items-center justify-center">
                <img 
                  src="https://drive.google.com/thumbnail?id=1WFI6vP05Btf4iz5HoHNcDDVKEGrVv7li&sz=w1000" 
                  alt="Logo Thiago Figueiró" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl md:text-3xl text-natural-ink">Thiago Figueiró</h3>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-olive font-bold">CRP 04/48708</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-olive">Siga-me</h4>
              <div className="flex gap-6">
                 <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-110 transition-transform" title="Instagram">
                  <Instagram size={24} />
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="WhatsApp">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" className="w-6 h-6" alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Impact Phrase */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug text-natural-ink/80 max-w-sm">
              "Transformar a dor em sentido é o caminho para uma vida mais autêntica e plena."
            </p>
          </div>

          {/* Column 3: Contacts & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
            <div className="space-y-6 text-center md:text-left">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-olive">Contatos</h4>
              <div className="space-y-4 text-sm font-sans text-natural-ink/70">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-olive transition-colors">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" className="w-4 h-4" alt="WhatsApp" />
                  Agendar via WhatsApp
                </a>
                <a href="tel:+5531994238535" className="flex items-center justify-center md:justify-start gap-3 hover:text-olive transition-colors">
                  <Phone size={16} className="text-black" />
                  (31) 99423-8535
                </a>
                <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-olive transition-colors">
                  <Instagram size={16} className="text-[#E4405F]" />
                  @psicologo.thiagofigueiro
                </a>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <img src="https://cdn.simpleicons.org/googlemaps/EA4335" className="w-4 h-4" alt="Google Maps" />
                  <span>Belo Horizonte, MG</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-olive">Navegação</h4>
              <div className="flex flex-col gap-3 text-sm font-sans text-natural-ink/70">
                <a href="#" className="hover:text-olive transition-colors">Home</a>
                <a href="#about" className="hover:text-olive transition-colors">Sobre Mim</a>
                <a href="#testimonials" className="hover:text-olive transition-colors">Relatos</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-natural-ink/5 text-center">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-natural-ink/30 font-bold">
            © {new Date().getFullYear()} THIAGO FIGUEIRÓ — Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating Buttons Group */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end">
        {/* Floating WhatsApp Button */}
        <motion.a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ y: -5 }}
          title="Fale conosco no WhatsApp"
        >
          <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-7 h-7 md:w-8 md:h-8" alt="WhatsApp" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm font-bold">
            Agendar Consulta
          </span>
        </motion.a>

        {/* Floating Instagram Button */}
        <motion.a 
          href="https://instagram.com/psicologo.thiagofigueiro"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          title="Siga no Instagram"
        >
          <Instagram size={28} className="md:w-8 md:h-8" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm font-bold">
            Ver Instagram
          </span>
        </motion.a>
      </div>
    </div>
  );
}
