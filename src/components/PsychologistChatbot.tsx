import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, Info, AlertTriangle, CreditCard, ChevronRight, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

/**
 * CONFIGURAÇÕES GERAIS
 * Edite aqui para personalizar o chatbot
 */
const CONFIG = {
  psycologistName: "Thiago Figueiró",
  assistantName: "Assistente do Thiago",
  whatsappNumber: "5531994238535",
  whatsappLink: "https://wa.me/5531994238535",
  colors: {
    primary: "#5c6d67", // Muted Sage
    primaryDark: "#4a5853",
    accent: "#8ba89e", // Lighter Sage
    bg: "#F9F8F6", // Soft Paper
    text: "#2C2C2C",
    shadow: "rgba(92, 109, 103, 0.15)",
  }
};

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual do psicólogo Thiago Figueiró. Sua missão é acolher visitantes do site dele.

DIRETRIZES DE PERSONA:
- Nome: ${CONFIG.assistantName}.
- Tom: Calmo, acolhedor, humano, profissional e ético.
- Idioma: Português brasileiro.
- Estilo: Use frases que demonstrem empatia como "Entendo que isso não seja fácil" ou "Faz sentido você se sentir assim".
- Nunca pareça um robô. Seja breve mas caloroso.

REGRAS ÉTICAS (CRÍTICO):
- Você NÃO é psicólogo. Você é um assistente virtual.
- NÃO faça diagnósticos (Ex: "Você tem ansiedade").
- NÃO dê conselhos médicos ou de medicação.
- NÃO substitua a terapia real.
- SE o usuário mencionar suicídio, automutilação ou crise grave, você DEVE orientar imediatamente: "Se você estiver em risco imediato, procure o SAMU (192), uma emergência hospitalar ou ligue para o CVV (188) agora mesmo. Você não está sozinho(a)."

CONHECIMENTO SOBRE THIAGO:
- O Thiago é psicólogo.
- O link de agendamento/WhatsApp é ${CONFIG.whatsappLink}.
- A terapia é um espaço de escuta e acolhimento.

Dê respostas curtas (máximo 3-4 frases) e sempre tente guiar para uma ação útil ou uma pergunta de acolhimento.
`;

type MessageType = 'bot' | 'user';

interface Message {
  id: string;
  text: string;
  type: MessageType;
  options?: Option[];
  actionLink?: string;
  actionText?: string;
}

interface Option {
  label: string;
  nextStep: string;
}

const PsychologistChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  // Inicializa o AI model lazily
  const getAI = () => {
    if (!aiRef.current) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY não encontrada. O chat funcionará apenas com fluxos fixos.");
        return null;
      }
      aiRef.current = new GoogleGenAI({ apiKey });
    }
    return aiRef.current;
  };

  useEffect(() => {
    const hours = new Date().getHours();
    const greeting = hours < 12 ? "Bom dia" : hours < 18 ? "Boa tarde" : "Boa noite";
    
    if (isOpen && messages.length === 0) {
      addBotMessage({
        id: '1',
        type: 'bot',
        text: `${greeting}, seja bem-vindo(a). Eu sou o ${CONFIG.assistantName}. Estou aqui para te acolher e te ajudar a entender qual caminho pode fazer mais sentido para você neste momento.`,
        options: [
          { label: "Quero agendar uma sessão", nextStep: "agendar" },
          { label: "Quero entender como funciona a terapia", nextStep: "como_funciona" },
          { label: "Estou passando por um momento difícil", nextStep: "momento_dificil" },
          { label: "Quero saber os valores", nextStep: "valores" }
        ]
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const addBotMessage = async (message: Message) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    setMessages(prev => [...prev, message]);
    setIsTyping(false);
  };

  const handleUserInput = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    const ai = getAI();
    if (!ai) {
      // Fallback se não houver API Key
      await addBotMessage({
        id: Date.now().toString() + '_err',
        type: 'bot',
        text: "Desculpe, estou com uma instabilidade momentânea na minha inteligência. Posso te ajudar com os links rápidos abaixo?",
        options: [
          { label: "Agendar sessão", nextStep: "agendar" },
          { label: "Voltar ao início", nextStep: "reset" }
        ]
      });
      return;
    }

    setIsTyping(true);
    try {
      // Prepara o histórico para o Gemini (limitado para evitar custos excessivos e lag)
      const chatHistory = messages.slice(-10).map(m => ({
        role: m.type === 'bot' ? 'model' as const : 'user' as const,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...chatHistory, { role: 'user', parts: [{ text }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Desculpe, não consegui processar isso. Que tal falarmos pelo WhatsApp?";
      
      await addBotMessage({
        id: Date.now().toString() + '_ai',
        type: 'bot',
        text: responseText,
        options: responseText.toLowerCase().includes("agendar") || responseText.toLowerCase().includes("whatsapp") 
          ? [{ label: "Falar no WhatsApp agora", nextStep: "agendar" }] 
          : undefined
      });
    } catch (error) {
      console.error("AI Error:", error);
      await addBotMessage({
        id: Date.now().toString() + '_err',
        type: 'bot',
        text: "Parece que tive um pequeno soluço digital. Mas estou aqui! O que você mais gostaria de saber sobre as sessões?"
      });
    }
    setIsTyping(false);
  };

  const handleOptionClick = (option: Option) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: option.label
    };
    
    setMessages(prev => [...prev, userMsg]);
    processFlow(option.nextStep);
  };

  const processFlow = async (step: string) => {
    const idSeed = Date.now().toString();
    
    switch (step) {
      case 'reset':
        setMessages([]);
        // Re-inicia o chat (useEffect cuidará disso por não haver mensagens)
        break;

      case 'agendar':
        await addBotMessage({
          id: idSeed + '1',
          type: 'bot',
          text: `Perfeito. Você pode agendar uma conversa inicial com o ${CONFIG.psycologistName} via WhatsApp. É o caminho mais rápido para tirar dúvidas práticas e ver disponibilidade.`,
          actionLink: CONFIG.whatsappLink,
          actionText: "Iniciar Agendamento"
        });
        break;

      case 'como_funciona':
        await addBotMessage({
          id: idSeed + '2',
          type: 'bot',
          text: "A terapia é um processo colaborativo e seguro. É um espaço para olharmos com cuidado para o que dói, para o que trava e para o que você deseja construir."
        });
        await addBotMessage({
          id: idSeed + '3',
          type: 'bot',
          text: "Você sente que seus desafios hoje são algo mais momentâneo ou algo que te acompanha há mais tempo?",
          options: [
            { label: "Algo momentâneo", nextStep: "momento_dificil" },
            { label: "Acompanhamento duradouro", nextStep: "como_funciona_mais" }
          ]
        });
        break;

      case 'como_funciona_mais':
        await addBotMessage({
          id: idSeed + '4',
          type: 'bot',
          text: "Entendo. Nesses casos, a constância é nossa maior aliada. Criamos um vínculo de confiança para transformar padrões profundos.",
          options: [{ label: "Gostaria de agendar", nextStep: "agendar" }]
        });
        break;

      case 'momento_dificil':
        await addBotMessage({
          id: idSeed + '5',
          type: 'bot',
          text: "Sinto muito por estar sendo difícil. Saiba que buscar suporte profissional já demonstra uma coragem imensa e cuidado consigo."
        });
        await addBotMessage({
          id: idSeed + '6',
          type: 'bot',
          text: "Você sente que sua necessidade de conversa é urgente ou poderia aguardar um agendamento padrão?",
          options: [
            { label: "É urgente (crise)", nextStep: "urgencia_sim" },
            { label: "Posso agendar com calma", nextStep: "urgencia_nao" }
          ]
        });
        break;

      case 'urgencia_sim':
        await addBotMessage({
          id: idSeed + '7',
          type: 'bot',
          text: "⚠ ATENÇÃO: Se você ou alguém que você conhece está em risco agora ou pensando em se machucar, por favor, procure ajuda imediata. Ligue 188 (CVV), chame o SAMU 192 ou vá ao pronto-socorro mais próximo. Sua vida é importante."
        });
        break;

      case 'urgencia_nao':
        await addBotMessage({
          id: idSeed + '8',
          type: 'bot',
          text: "Fico um pouco mais calmo em saber. Respeite seu tempo e, quando sentir que é a hora, o Thiago terá prazer em te ouvir.",
          options: [{ label: "Quero ver como agendar", nextStep: "agendar" }]
        });
        break;

      case 'valores':
        await addBotMessage({
          id: idSeed + '9',
          type: 'bot',
          text: "Entendo que essa é uma questão importante. Os valores e formatos variam. O ideal é falarmos rapidinho pelo WhatsApp para eu te passar a tabela atualizada.",
          actionLink: CONFIG.whatsappLink,
          actionText: "Ver valores no WhatsApp"
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative font-sans pointer-events-auto">
      {/* Botão Flutuante */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: CONFIG.colors.primary }}
        className="text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ring-4 ring-white/30 backdrop-blur-sm"
        id="btn-chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 md:w-7 md:h-7" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
              {!messages.length && <span className="hidden md:inline text-sm font-medium pr-1">Falar com Assistente</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Janela de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-[calc(100%+16px)] right-0 w-[340px] sm:w-[380px] h-[550px] max-h-[75vh] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden border border-gray-100"
            id="chat-window"
          >
            {/* Header / Topo */}
            <div 
              style={{ backgroundColor: CONFIG.colors.primary }}
              className="p-5 text-white flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 ring-2 ring-white/5">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                    {CONFIG.assistantName} 
                    <Sparkles size={12} className="text-white/60 animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <p className="text-[10px] opacity-80 font-medium tracking-wide">Online agora</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                 <X size={20} />
              </button>
            </div>

            {/* Área de Mensagens */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#F9F8F6]/60 scroll-smooth"
              id="messages-container"
              style={{ backgroundImage: 'radial-gradient(#5c6d67 0.5px, transparent 0.5px)', backgroundSize: '20px 20px', backgroundAlpha: 0.05 }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.type === 'user' 
                        ? 'bg-[#5c6d67] text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    {msg.text}

                    {/* Botão de Link Externo */}
                    {msg.actionLink && (
                      <a
                        href={msg.actionLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: CONFIG.colors.primary }}
                        className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-semibold text-white transition-all hover:brightness-110 shadow-sm"
                      >
                        <Phone size={14} />
                        {msg.actionText}
                      </a>
                    )}
                  </motion.div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé / Input e Opções */}
            <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_15px_rgba(0,0,0,0.02)]">
              {/* Opções Sugeridas */}
              {messages.length > 0 && messages[messages.length - 1].options && !isTyping && (
                <div className="flex flex-col gap-2 mb-4">
                  {messages[messages.length - 1].options?.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 4, backgroundColor: '#5c6d67', color: '#fff' }}
                      onClick={() => handleOptionClick(opt)}
                      className="text-left py-2.5 px-4 rounded-xl text-[13px] border border-gray-200 text-gray-600 hover:border-transparent transition-all flex items-center justify-between group"
                    >
                      {opt.label}
                      <ChevronRight size={14} className="opacity-40 group-hover:opacity-100" />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserInput(inputValue);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escreva sua dúvida aqui..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c6d67]/20 focus:border-[#5c6d67]/50 transition-all placeholder:text-gray-400"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`absolute right-2 p-2 rounded-xl transition-all ${
                    !inputValue.trim() || isTyping 
                      ? 'text-gray-300' 
                      : 'text-white bg-[#5c6d67] hover:brightness-110 shadow-sm'
                  }`}
                >
                  <Send size={18} />
                </button>
              </form>
              
              <div className="mt-3 text-[10px] text-gray-400 text-center flex flex-col gap-0.5 pointer-events-none">
                <span>Esta interação usa Inteligência Artificial para te auxiliar.</span>
                <span className="font-medium text-red-400/80">Em caso de risco de vida, ligue 188.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PsychologistChatbot;
