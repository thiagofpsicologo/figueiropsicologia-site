import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageCircle, ChevronDown } from 'lucide-react';
import { WHATSAPP_NUMBER, STANDARD_SLOTS } from '../constants';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<'date' | 'time' | 'confirm'>('date');
  const [errorSlot, setErrorSlot] = useState<{date: string, time: string} | null>(null);
  const [sessionUnavailable, setSessionUnavailable] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate("");
      setSelectedTime("");
      setStep('date');
      setErrorSlot(null);
    }
  }, [isOpen]);

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
    const isPast = isTimeInPast(selectedDate, selectedTime);
    if (isPast) {
      setErrorSlot({ date: selectedDate, time: selectedTime });
      return;
    }

    const dateFormatted = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR');
    const planInfo = selectedPlan ? `Modalidade: ${selectedPlan}\n` : "";
    const message = `Olá, Thiago! Gostaria de agendar uma consulta.\n\n${planInfo}Data escolhida: ${dateFormatted}\nHorário escolhido: ${selectedTime}\n\nAguardo a confirmação. Obrigado!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  const addToGoogleCalendar = () => {
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const start = new Date(selectedDate + 'T00:00:00');
    start.setHours(hours, minutes);
    const end = new Date(start.getTime() + 50 * 60000);
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Consulta com Thiago Figueiró')}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent('Consulta psicológica agendada com Thiago Figueiró')}&location=${encodeURIComponent('Atendimento online ou presencial, a confirmar pelo WhatsApp')}&sf=true&output=xml`;
    
    window.open(url, '_blank');
  };

  const addToAppleCalendar = () => {
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const start = new Date(selectedDate + 'T00:00:00');
    start.setHours(hours, minutes);
    const end = new Date(start.getTime() + 50 * 60000);

    const formatDateICS = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Thiago Figueiro//Consultas//PT",
      "BEGIN:VEVENT",
      `DTSTART:${formatDateICS(start)}`,
      `DTEND:${formatDateICS(end)}`,
      "SUMMARY:Consulta com Thiago Figueiró",
      "DESCRIPTION:Consulta psicológica agendada com Thiago Figueiró",
      "LOCATION:Atendimento online ou presencial, a confirmar pelo WhatsApp",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    // Para dispositivos Apple, usar data URI sem o atributo 'download' costuma
    // abrir diretamente a tela de "Adicionar Evento" do calendário nativo.
    const uri = "data:text/calendar;charset=utf8," + encodeURIComponent(icsContent);
    window.location.href = uri;
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
            <div className="p-6 md:p-8 bg-primary-blue/5 border-b border-primary-blue/10 flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-natural-ink">Agende sua consulta</h3>
                <p className="text-sm text-natural-ink/60 mt-1">Escolha o melhor dia e horário para o seu atendimento.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-primary-blue/10 rounded-full transition-colors text-natural-ink/40"
                id="close-scheduling-btn"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {step === 'date' && (
                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-primary-blue">Selecione uma data</span>
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
                          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-primary-blue/10 hover:border-primary-blue hover:bg-primary-blue/5 transition-all group active:scale-95"
                          id={`date-${date}`}
                        >
                          <span className="text-[10px] uppercase tracking-widest text-primary-blue/60 font-bold mb-1">{dayName}</span>
                          <span className="text-xl font-serif text-natural-ink group-hover:text-primary-blue transition-colors">{dayNum}</span>
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
                    <button onClick={() => setStep('date')} className="bg-primary-blue/10 p-2 rounded-full text-primary-blue hover:bg-primary-blue/20 transition-colors" id="back-to-date-btn">
                      <ChevronDown className="rotate-90" size={16} />
                    </button>
                    <span className="text-xs uppercase tracking-widest font-bold text-primary-blue">
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
                          id={`time-${time.replace(':', '-')}`}
                          className={`
                            relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95
                            ${isDisabled 
                              ? 'bg-natural-stone/20 border-natural-ink/5 opacity-40 cursor-not-allowed' 
                              : 'bg-white border-primary-blue/10 hover:border-primary-blue hover:bg-primary-blue/5'
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
                    className={`inline-flex items-center justify-center p-6 rounded-full mb-2 ${errorSlot ? 'bg-red-50 text-red-500 shadow-lg shadow-red-100' : 'bg-primary-blue/10 text-primary-blue shadow-lg shadow-primary-blue/5'}`}
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
                        id="retry-scheduling-btn"
                      >
                        Escolher outro horário
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={confirmAgendamento}
                          className="w-full bg-primary-blue text-white py-4 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-primary-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          id="confirm-scheduling-btn"
                        >
                          <MessageCircle size={16} />
                          Confirmar agendamento
                        </button>
                        
                        <button
                          onClick={addToGoogleCalendar}
                          className="w-full bg-white border border-primary-blue/20 text-primary-blue py-4 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-blue/5 transition-all flex items-center justify-center gap-2"
                          id="google-calendar-btn"
                        >
                          <Calendar size={16} />
                          Adicionar ao Google Agenda
                        </button>

                        <button
                          onClick={addToAppleCalendar}
                          className="w-full bg-white border border-primary-blue/20 text-primary-blue py-4 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-blue/5 transition-all flex items-center justify-center gap-2"
                          id="apple-calendar-btn"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="lucide-apple">
                            <path d="M17.05 20.28c-.96.95-2.15 1.57-3.57 1.57-1.39 0-2.48-.48-3.52-.48-1.04 0-2.28.51-3.55.51-3.66 0-6.75-5.91-6.75-9.67 0-3.67 2.05-5.74 4.54-5.74 1.34 0 2.45.67 3.32.67.87 0 2.22-.72 3.73-.72 1.41 0 3.1.66 4.14 2-.09.06-2.58 1.48-2.58 4.63 0 3.19 2.58 4.41 2.65 4.44-.06.18-1.42 2.89-3.43 4.8zm-4.73-15.1c0 0 .01-.01.01-.01.99-1.2 1.66-2.88 1.48-4.54-.15-.01-.32-.02-.5-.02-2.13 0-3.76 1.43-4.56 3.18-.75 1.62-.64 3.34-.43 4.56.09.01.19.01.29.01 2.06 0 3.71-1.32 4.11-3.18z" />
                          </svg>
                          Adicionar ao Calendário Apple
                        </button>

                        <button
                          onClick={() => setStep('time')}
                          className="text-xs uppercase tracking-widest font-bold text-natural-ink/40 hover:text-natural-ink/60 transition-colors mt-2"
                          id="change-time-btn"
                        >
                          Alterar horário
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 bg-natural-stone/10 border-t border-natural-ink/5 flex justify-center">
              <button 
                onClick={onClose}
                className="text-xs uppercase tracking-widest font-bold text-natural-ink/40 hover:text-natural-ink/60 transition-colors"
                id="footer-close-scheduling-btn"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
