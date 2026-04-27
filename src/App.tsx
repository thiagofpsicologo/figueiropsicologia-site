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

const WHATSAPP_NUMBER = "5531994238535";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const UNAVAILABLE_SLOTS: Record<string, string[]> = {
  "2026-04-28": ["09:00", "14:00"],
  "2026-04-29": ["10:00", "15:00", "17:00"],
  "2026-04-30": ["08:00"]
};

const STANDARD_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

function SchedulingModal({ isOpen, onClose, selectedPlan }: { isOpen: boolean; onClose: () => void; selectedPlan?: string }) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<'date' | 'time' | 'confirm'>('date');
  const [errorSlot, setErrorSlot] = useState<{date: string, time: string} | null>(null);
  const [sessionUnavailable, setSessionUnavailable] = useState<Record<string, string[]>>({});

  // Reset modal state when closing
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedDate("");
      setSelectedTime("");
      setStep('date');
      setErrorSlot(null);
    }
  }, [isOpen]);

  // Generate next 14 days
  const availableDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep('time');
    setErrorSlot(null);
  };

  const handleTimeSelect = (time: string, isPast: boolean) => {
    if (isPast) return;
    setSelectedTime(time);
    setStep('confirm');
    setErrorSlot(null);
  };

  const isTimeInPast = (date: string, time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(date + 'T00:00:00');
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate < now;
  };

  const confirmAgendamento = () => {
    const isUnavailable = UNAVAILABLE_SLOTS[selectedDate]?.includes(selectedTime) || sessionUnavailable[selectedDate]?.includes(selectedTime);
    const isPast = isTimeInPast(selectedDate, selectedTime);

    if (isUnavailable || isPast) {
      setErrorSlot({ date: selectedDate, time: selectedTime });
      setSessionUnavailable(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), selectedTime]
      }));
      return;
    }

    const dateFormatted = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR');
    const planInfo = selectedPlan ? `Modalidade: ${selectedPlan}\n` : "";
    const message = `Olá, Thiago! Gostaria de agendar uma consulta.\n\n${planInfo}Data escolhida: ${dateFormatted}\nHorário escolhido: ${selectedTime}\n\nAguardo a confirmação. Obrigado!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  const addToGoogleCalendar = () => {
    // We only call this from the confirm step, but we should make sure it's available first if we follow the same logic
    const isUnavailable = UNAVAILABLE_SLOTS[selectedDate]?.includes(selectedTime) || sessionUnavailable[selectedDate]?.includes(selectedTime);
    if (isUnavailable) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    
    const start = new Date(selectedDate + 'T00:00:00');
    start.setHours(hours, minutes);
    
    const end = new Date(start.getTime() + 50 * 60000);
    
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Consulta com Thiago Figueiró')}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent('Consulta psicológica agendada com Thiago Figueiró')}&location=${encodeURIComponent('Atendimento online ou presencial, a confirmar pelo WhatsApp')}&sf=true&output=xml`;
    
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-[520px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-olive/5 border-b border-olive/10 flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-natural-ink">Agende sua consulta</h3>
                <p className="text-sm text-natural-ink/60 mt-1">Escolha o melhor dia e horário para o seu atendimento.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-olive/10 rounded-full transition-colors text-natural-ink/40"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {step === 'date' && (
                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-olive">Selecione uma data</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableDays.map(date => {
                      const d = new Date(date + 'T12:00:00');
                      const dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' });
                      const dayNum = d.toLocaleDateString('pt-BR', { day: '2-digit' });
                      const month = d.toLocaleDateString('pt-BR', { month: 'short' });
                      
                      return (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-olive/10 hover:border-olive hover:bg-olive/5 transition-all group active:scale-95"
                        >
                          <span className="text-[10px] uppercase tracking-widest text-olive/60 font-bold mb-1">{dayName}</span>
                          <span className="text-xl font-serif text-natural-ink group-hover:text-olive transition-colors">{dayNum}</span>
                          <span className="text-[10px] uppercase tracking-widest text-natural-ink/40 font-medium">{month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 'time' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep('date')} className="bg-olive/10 p-2 rounded-full text-olive hover:bg-olive/20 transition-colors">
                      <ChevronDown className="rotate-90" size={16} />
                    </button>
                    <span className="text-xs uppercase tracking-widest font-bold text-olive">
                      {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {STANDARD_SLOTS.map(time => {
                      const isKnownUnavailable = sessionUnavailable[selectedDate]?.includes(time);
                      const isInPast = isTimeInPast(selectedDate, time);
                      const isDisabled = isInPast || isKnownUnavailable;
                      
                      return (
                        <button
                          key={time}
                          disabled={isDisabled}
                          onClick={() => handleTimeSelect(time, isInPast)}
                          className={`
                            relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95
                            ${isDisabled 
                              ? 'bg-natural-stone/20 border-natural-ink/5 opacity-40 cursor-not-allowed' 
                              : 'bg-white border-olive/10 hover:border-olive hover:bg-olive/5'
                            }
                          `}
                        >
                          <span className={`text-sm font-medium ${isDisabled ? 'text-natural-ink/40' : 'text-natural-ink'}`}>{time}</span>
                          {isDisabled && (
                            <span className="text-[8px] uppercase tracking-tighter text-red-500/60 font-bold mt-1">
                              {isInPast ? 'Passado' : 'Indisponível'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-8 py-4 text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center justify-center p-6 rounded-full mb-2 ${errorSlot ? 'bg-red-50 text-red-500 shadow-lg shadow-red-100' : 'bg-olive/10 text-olive shadow-lg shadow-olive/5'}`}
                  >
                    {errorSlot ? <X size={48} strokeWidth={1.5} /> : <Calendar size={48} strokeWidth={1} />}
                  </motion.div>
                  
                  <div className="space-y-2">
                    {errorSlot ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 px-4"
                      >
                        <h4 className="text-2xl md:text-3xl font-serif text-red-600 font-bold leading-tight">
                          Esse horário acabou de ficar indisponível.
                        </h4>
                        <p className="text-sm md:text-base text-natural-ink/70 max-w-[280px] mx-auto leading-relaxed">
                          Por favor, escolha outro horário para o seu atendimento.
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <h4 className="text-lg text-natural-ink/60 font-medium italic">Você escolheu:</h4>
                        <p className="text-2xl md:text-3xl font-serif text-natural-ink font-bold">
                          {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })} às {selectedTime}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 px-4">
                    {errorSlot ? (
                      <button
                        onClick={() => setStep('time')}
                        className="w-full bg-natural-ink text-white py-4 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-natural-ink/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Escolher outro horário
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={confirmAgendamento}
                          className="w-full bg-olive text-white py-4 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-olive/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={16} />
                          Confirmar agendamento
                        </button>
                        
                        <button
                          onClick={addToGoogleCalendar}
                          className="w-full bg-white border border-olive/20 text-olive py-4 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-olive/5 transition-all flex items-center justify-center gap-2"
                        >
                          <Calendar size={16} />
                          Adicionar ao Google Agenda
                        </button>

                        <button
                          onClick={() => setStep('time')}
                          className="text-xs uppercase tracking-widest font-bold text-natural-ink/40 hover:text-natural-ink/60 transition-colors mt-2"
                        >
                          Alterar horário
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-natural-stone/10 border-t border-natural-ink/5 flex justify-center">
              <button 
                onClick={onClose}
                className="text-xs uppercase tracking-widest font-bold text-natural-ink/40 hover:text-natural-ink/60 transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const SCENES = [
  {
    id: 'dor',
    title: 'Thiago Figueiró',
    audioText: 'piano leve e emocional',
    image: 'https://drive.google.com/thumbnail?id=1KM6evv9ep_1Mbs_kGHea7Rb2P8IAD7Al&sz=w2000',
    accent: 'Psicólogo Clínico',
    subtitle: 'Como posso te ajudar?'
  },
  {
    id: 'identificacao',
    title: '"Ansiedade, excesso de pensamentos, dificuldade de se expressar…"',
    audioText: '',
    image: 'https://drive.google.com/thumbnail?id=13pEHjy-sDm3jwd5vz1VLvFhWaxly_aRy&sz=w2000',
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
    accent: 'Profissionalismo'
  },
  {
    id: 'transformacao',
    title: '"Entenda seus pensamentos. Cuide da sua mente. Viva com mais leveza."',
    audioText: '',
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
  },
  {
    name: "Lucas F.",
    role: "Autoconhecimento",
    quote: "Excelente profissional. Me ajudou a entender padrões que eu repetia há anos sem perceber, trazendo clareza para minha vida.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Maria S.",
    role: "Atendimento Online",
    quote: "A terapia online com o Thiago é impecável. Sinto uma evolução constante e segurança total para me expressar.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Roberto K.",
    role: "Relacionamentos",
    quote: "Tive uma melhora significativa no meu relacionamento familiar após iniciar o acompanhamento. Postura muito ética e técnica.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Patrícia L.",
    role: "Equilíbrio e Bem-estar",
    quote: "As sessões me deram ferramentas práticas para lidar com o estresse diário. Hoje vivo com muito mais leveza e presença.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Fernanda G.",
    role: "Processo Individual",
    quote: "Sinto que minhas questões são verdadeiramente ouvidas. O acolhimento do Thiago faz toda a diferença no meu processo.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=60&w=200&h=200"
  },
  {
    name: "Bruno T.",
    role: "Transição de Carreira",
    quote: "Me auxiliou em um momento de dúvida profissional muito difícil. Um direcionamento humano e muito consciente.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=60&w=200&h=200"
  }
];

interface SceneProps {
  scene: typeof SCENES[0] & { sideImage?: string; image?: string; subtitle?: string };
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
    <div ref={ref} className={`relative h-screen h-[100dvh] w-full flex overflow-hidden ${index === 0 ? 'justify-start items-end pb-28 pl-4 md:pl-16 lg:pl-20 lg:pb-24' : 'justify-center items-center'} ${!scene.image ? 'bg-natural-bg' : ''}`}>
      {scene.image && (
        <motion.div 
          style={{ opacity, scale, y: imageY }}
          className="absolute inset-0 z-0 h-[120%] top-[-10%]"
        >
          <img 
            src={scene.image} 
            alt={scene.title}
            className={`w-full h-full object-cover object-[85%_center] sm:object-[45%_20%] ${scene.id === 'identificacao' ? 'brightness-[0.8] contrast-[0.9]' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${index === 0 ? 'bg-linear-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/40 to-transparent' : (scene.id === 'identificacao' ? 'bg-black/60 backdrop-blur-[2px]' : 'bg-black/40')}`} />
        </motion.div>
      )}

      {!scene.image && (
        <div className="absolute inset-0 bg-linear-to-b from-olive/20 to-natural-bg z-0" />
      )}

      <motion.div 
        style={{ opacity: scene.image ? opacity : 1, y: index === 0 ? 0 : y }}
        className={`relative z-10 w-full max-w-6xl px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 ${index === 0 ? 'text-left lg:pl-0' : 'justify-center'}`}
      >
        <div className={`max-w-xs sm:max-w-xl ${index === 0 ? 'text-left' : (scene.sideImage ? 'text-left' : 'text-center')}`}>
          <motion.span 
            initial={index === 0 ? { opacity: 1, x: 0 } : { opacity: 0, y: 10 }}
            animate={index === 0 ? { opacity: 1, x: 0 } : {}}
            whileInView={index === 0 ? {} : { opacity: 0.9, y: 0 }}
            className={`block font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 font-bold ${scene.image ? 'text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]' : 'text-olive'}`}
          >
            {scene.accent}
          </motion.span>
          {scene.subtitle && (
            <motion.span 
              initial={index === 0 ? { opacity: 1, x: 0 } : { opacity: 0, y: 10 }}
              animate={index === 0 ? { opacity: 1, x: 0 } : {}}
              whileInView={index === 0 ? {} : { opacity: 0.9, y: 0 }}
              className={`block font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 font-medium italic ${scene.image ? 'text-white/80 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]' : 'text-olive/80'}`}
            >
              {scene.subtitle}
            </motion.span>
          )}
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] italic ${scene.image ? 'text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] transition-all' : 'text-natural-ink'}`}>
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | undefined>(undefined);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const openScheduling = (plan?: string) => {
    setSelectedPlanModal(plan);
    setIsSchedulingOpen(true);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="natural-gradient selection:bg-olive selection:text-white min-h-screen transition-colors duration-500">
      <SchedulingModal 
        isOpen={isSchedulingOpen} 
        onClose={() => {
          setIsSchedulingOpen(false);
          setSelectedPlanModal(undefined);
        }} 
        selectedPlan={selectedPlanModal}
      />
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[100] px-4 py-3 md:px-6 md:py-4 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'py-2 md:py-3 bg-white/10 backdrop-blur-md' : 'py-4 md:py-6'}`}>
        <a href="#" className={`flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border transition-all group backdrop-blur-md ${isScrolled ? 'bg-white/90 border-olive/10 shadow-md' : 'bg-white/40 border-white/30 shadow-lg'}`}>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-olive/5">
            <img 
              src="https://drive.google.com/thumbnail?id=10taANe2B2DrYxggYuYrP098CD_pZntCN&sz=w1000" 
              alt="Logo Thiago Figueiró" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className={`font-serif text-sm md:text-base font-medium transition-colors ${isScrolled ? 'text-natural-ink' : 'text-white'}`}>Thiago Figueiró</span>
        </a>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-6 lg:gap-8 items-center px-6 py-2.5 rounded-full border transition-all backdrop-blur-md ${isScrolled ? 'bg-white/90 border-olive/10 shadow-md' : 'bg-white/40 border-white/30 shadow-lg'}`}>
          <a href="#" className={`text-[10px] lg:text-xs uppercase tracking-widest transition-colors font-sans font-bold ${isScrolled ? 'text-natural-ink/70 hover:text-olive' : 'text-white hover:text-white/80'}`}>Home</a>
          <a href="#about" className={`text-[10px] lg:text-xs uppercase tracking-widest transition-colors font-sans font-bold ${isScrolled ? 'text-natural-ink/70 hover:text-olive' : 'text-white hover:text-white/80'}`}>Sobre Mim</a>
          <a href="#services" className={`text-[10px] lg:text-xs uppercase tracking-widest transition-colors font-sans font-bold ${isScrolled ? 'text-natural-ink/70 hover:text-olive' : 'text-white hover:text-white/80'}`}>Atendimento</a>
          <a href="#testimonials" className={`text-[10px] lg:text-xs uppercase tracking-widest transition-colors font-sans font-bold ${isScrolled ? 'text-natural-ink/70 hover:text-olive' : 'text-white hover:text-white/80'}`}>Relatos</a>
          <div className={`w-[1px] h-3 mx-1 transition-colors ${isScrolled ? 'bg-olive/20' : 'bg-white/20'}`} />
          <div className="flex gap-4 items-center">
            <a href="https://instagram.com/psicologo.thiagofigueiro" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110" title="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/E4405F" className={`w-3.5 h-3.5 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-90'}`} alt="Instagram" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110" title="WhatsApp">
              <img src="https://cdn.simpleicons.org/whatsapp/25D366" className={`w-3.5 h-3.5 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-90'}`} alt="WhatsApp" />
            </a>
          </div>
        </div>

        {/* Desktop Agendar Button */}
        <button
          onClick={() => openScheduling()}
          className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full shadow-2xl transition-all font-sans text-[10px] lg:text-xs uppercase tracking-widest font-bold hover:scale-105 active:scale-95 ${isScrolled ? 'bg-olive text-white shadow-olive/30' : 'bg-olive text-white shadow-olive/30'}`}
        >
          <Calendar size={13} />
          Agendar Consulta
        </button>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden w-12 h-12 rounded-full border flex items-center justify-center transition-all z-[110] backdrop-blur-md shadow-lg ${isScrolled ? 'bg-white/90 border-olive/10 text-natural-ink' : 'bg-white/40 border-white/30 text-white'}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openScheduling();
                  }} 
                  className="mt-4 bg-olive text-white px-8 py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3"
                >
                  <Calendar size={16} />
                  Agendar Consulta
                </button>
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
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mb-16 max-w-sm w-full mx-auto"
          >
            {/* Architectural Accent Lines */}
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

            {/* Offset Background Card */}
            <div className="absolute inset-0 bg-olive/5 rounded-[48px] rotate-3 -z-10 translate-x-3 translate-y-3" />
            
            {/* Main Image Container */}
            <div className="aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden cinematic-shadow border-[6px] border-white relative z-10 bg-natural-stone/10 ring-1 ring-olive/5">
              <img 
                src="https://drive.google.com/thumbnail?id=1tVcHVoHn9pV_CfvuJdn98sLlY3de_Ysh&sz=w1000" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                alt="Thiago Figueiró" 
                referrerPolicy='no-referrer'
              />
            </div>
            
            {/* CRP Badge below photo */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 flex flex-col items-center"
            >
              <div className="h-[1px] w-8 bg-olive/30 mb-4" />
              <div className="px-4 py-1.5 rounded-full bg-olive/5 border border-olive/10">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-olive font-bold">CRP 04/48708</span>
              </div>
            </motion.div>

            {/* Subtle Gradient Glows */}
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
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight md:leading-[1.1] text-natural-ink">
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
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid sm:grid-cols-2 gap-4 lg:gap-6 pt-4 text-left"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-olive-glow olive-border p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4"
              >
                <Heart className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                <h4 className="font-serif text-xl md:text-2xl">Empatia</h4>
                <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Escuta ativa e um ambiente livre de quaisquer julgamentos.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-olive-glow olive-border p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4"
              >
                <Shield className="text-olive w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                <h4 className="font-serif text-xl md:text-2xl">Sigilo</h4>
                <p className="text-xs md:text-sm text-natural-ink/60 leading-relaxed">Privacidade absoluta garantida em todas as sessões presenciais ou online.</p>
              </motion.div>
            </motion.div>

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

        {/* Formas de Atendimento Section */}
        <section id="services" className="py-20 md:py-40 px-6 md:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-olive font-bold">Planos e Formatos</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-natural-ink">Formas de atendimento</h2>
              <p className="text-lg md:text-xl text-natural-ink/60 font-light leading-relaxed">
                Cada pessoa tem um momento diferente. Escolha o formato que faz mais sentido para você — e, se preferir, podemos conversar antes de decidir.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* CARD 1: Atendimento pontual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white/50 backdrop-blur-sm border border-olive/10 p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow group h-full transition-all hover:bg-white"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-natural-ink">Atendimento pontual</h3>
                  <div className="h-[1px] w-12 bg-olive/20" />
                </div>
                <p className="text-sm md:text-base text-natural-ink/70 leading-relaxed min-h-[100px]">
                  Indicado para quem precisa conversar sobre uma situação específica, tomar uma decisão ou lidar com um momento mais urgente. Um espaço de escuta, acolhimento e direcionamento.
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
                    <span>🌐 Online</span>
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

            {/* CARD 2: Psicoterapia semanal (DESTAQUE) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.8 }}
              className="bg-natural-ink text-white p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow relative overflow-hidden h-full z-10"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="bg-olive/20 backdrop-blur-md border border-olive/30 text-olive-light px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                      Mais escolhido
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-serif">Psicoterapia semanal</h3>
                    <div className="h-[1px] w-12 bg-white/20" />
                  </div>
                </div>
                <p className="text-sm md:text-base text-white/70 leading-relaxed min-h-[100px]">
                  Para quem deseja se aprofundar no processo terapêutico. O acompanhamento semanal permite trabalhar com mais continuidade, favorecendo mudanças mais consistentes ao longo do tempo.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/90 font-bold">
                    <Sparkles size={14} className="opacity-40" />
                    <span>⏱ 50 min / sessão</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/90 font-bold">
                    <Sparkles size={14} className="opacity-40" />
                    <span>📅 1 sessão / semana</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/90 font-bold">
                    <Sparkles size={14} className="opacity-40" />
                    <span>🌐 Online</span>
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
              {/* Artistic element */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-olive/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* CARD 3: Psicoterapia quinzenal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/50 backdrop-blur-sm border border-olive/10 p-8 md:p-12 rounded-[40px] flex flex-col justify-between cinematic-shadow group h-full transition-all hover:bg-white"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-natural-ink">Psicoterapia quinzenal</h3>
                  <div className="h-[1px] w-12 bg-olive/20" />
                </div>
                <p className="text-sm md:text-base text-natural-ink/70 leading-relaxed min-h-[100px]">
                  Uma opção para quem prefere um ritmo mais leve ou está em um momento de manutenção do processo terapêutico.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                    <Sparkles size={14} className="opacity-40" />
                    <span>⏱ 50 min / sessão</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                    <Sparkles size={14} className="opacity-40" />
                    <span>📅 2 sessões / mês</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-olive font-bold">
                    <Sparkles size={14} className="opacity-40" />
                    <span>🌐 Online</span>
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
                  Começar quinzenal
                </button>
              </div>
            </motion.div>
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
                
                <button 
                  onClick={() => openScheduling()}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
                >
                  <Calendar size={18} />
                  Ver Horários
                </button>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500">
            {TESTIMONIALS.slice(0, showAllTestimonials ? TESTIMONIALS.length : 3).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(90, 102, 63, 0.15)",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] cinematic-shadow olive-border flex flex-col justify-between group h-full"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, starIdx) => (
                      <Sparkles key={starIdx} size={14} className="text-olive/20 fill-olive/10" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg font-serif italic text-natural-ink/80 leading-relaxed mb-6 md:mb-8 line-clamp-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 md:gap-4 pt-6 border-t border-natural-ink/5 mt-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-olive/10 group-hover:ring-olive/30 transition-all duration-500">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs md:text-sm text-natural-ink group-hover:text-olive transition-colors">{t.name}</h4>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-olive font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <button
              onClick={() => setShowAllTestimonials(!showAllTestimonials)}
              className="group flex flex-col items-center gap-3 transition-all active:scale-95"
            >
              <div className="px-8 py-3 rounded-full border border-olive/20 text-olive font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-olive hover:text-white transition-all cinematic-shadow bg-white/50 backdrop-blur-sm">
                {showAllTestimonials ? 'Ver menos relatos' : 'Ver mais relatos'}
              </div>
              <motion.div
                animate={{ y: showAllTestimonials ? -4 : 4 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              >
                <ChevronDown 
                  className={`text-olive/40 transition-transform duration-500 ${showAllTestimonials ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </motion.div>
            </button>
          </motion.div>
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
          {/* Column 1: Social Media */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-olive/10">
                <img 
                  src="https://drive.google.com/thumbnail?id=10taANe2B2DrYxggYuYrP098CD_pZntCN&sz=w1000" 
                  alt="Logo Thiago Figueiró" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="block font-serif text-lg font-medium tracking-tight text-natural-ink">Thiago Figueiró</span>
                <span className="block text-[9px] uppercase tracking-widest text-olive font-bold">CRP 04/48708</span>
              </div>
            </div>
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

          {/* Column 2: Impact Phrase + Profile */}
          <div className="flex flex-col items-center justify-center text-center px-4 space-y-10">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug text-natural-ink/80 max-w-sm">
              "Transformar a dor em sentido é o caminho para uma vida mais autêntica e plena."
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-olive/20 cinematic-shadow bg-white flex items-center justify-center">
                <img 
                  src="https://drive.google.com/thumbnail?id=1WFI6vP05Btf4iz5HoHNcDDVKEGrVv7li&sz=w1000" 
                  alt="Logo Thiago Figueiró" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-olive font-bold">CRP 04/48708</p>
              </div>
            </div>
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
        {/* Floating Scheduling Button (WhatsApp secondary) */}
        <motion.button 
          onClick={() => openScheduling()}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ y: -5 }}
          title="Ver horários"
        >
          <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-7 h-7 md:w-8 md:h-8" alt="WhatsApp" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm font-bold">
            Agendar Consulta
          </span>
        </motion.button>

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
