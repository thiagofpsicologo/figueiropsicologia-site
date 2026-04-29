import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, User, Brain } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const getAi = () => {
  try {
    // In Vite, process.env.GEMINI_API_KEY is replaced by define at build time.
    // We check it cautiously.
    const apiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error('Failed to initialize GoogleGenAI:', e);
    return null;
  }
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `Você é o assistente virtual do Psicólogo Thiago Figueiró. 
Thiago é psicólogo clínico formado pela FUMEC e atua desde 2017. Ele realiza atendimentos em Belo Horizonte (presencial) e para todo o mundo (online).
Suas especialidades incluem: ansiedade, excesso de pensamentos, dificuldade de expressão, autoconhecimento e transformação de padrões de sofrimento.
Seu tom deve ser acolhedor, profissional, empático, sensível e sem julgamentos, refletindo exatamente a postura clínica do Thiago descrita no site ("Um espaço seguro para o seu sentir").

Informações importantes sobre os atendimentos:
1. Atendimento Pontual: R$ 120 por sessão (50 min). Indicado para situações específicas ou urgentes.
2. Psicoterapia Semanal: R$ 400 por mês (1 sessão por semana de 50 min). É o plano mais escolhido para quem busca profundidade e continuidade.
3. Psicoterapia Quinzenal: R$ 250 por mês (2 sessões por mês de 50 min). Indicado para manutenção ou ritmos mais leves.

Como agendar:
- O usuário pode clicar nos botões "Agendar Consulta" no site para ver a disponibilidade.
- Ou entrar em contato diretamente via WhatsApp pelo número 5531994238535.

Diretrizes de resposta:
- Seja breve e acolhedor.
- Não faça diagnósticos clínicos.
- Se o usuário estiver em crise grave, sugira procurar serviços de emergência (CVV 188 no Brasil ou hospitais).
- Responda em Português do Brasil.
- Se não souber algo, sugira que ele converse diretamente com o Thiago via WhatsApp.`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou o assistente do Thiago. Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = useMemo(() => getAi(), []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!ai) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, o serviço de IA não está configurado corretamente no momento. Por favor, entre em contato via WhatsApp para um atendimento imediato.' }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const chatStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
      });

      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of chatStream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, text: fullText }];
          });
        }
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um probleminha técnico. Pode tentar novamente ou falar com o Thiago pelo WhatsApp?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-[200] pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-olive/10"
          >
            {/* Header */}
            <div className="bg-olive p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-tight">Assistência Thiago</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">Sempre disponível</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef} 
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-natural-bg/30 custom-scrollbar"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-olive text-white' : 'bg-white border border-olive/10 text-olive'}`}>
                      {m.role === 'user' ? <User size={14} /> : <Brain size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-olive text-white rounded-tr-none' : 'bg-white text-natural-ink shadow-sm border border-olive/5 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full shrink-0 bg-white border border-olive/10 text-olive flex items-center justify-center">
                      <Brain size={14} className="animate-pulse" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white text-natural-ink shadow-sm border border-olive/5 rounded-tl-none flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-olive/40 rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-olive/40 rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-olive/40 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-olive/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Como posso te ajudar?"
                  className="w-full pl-6 pr-12 py-4 bg-neutral-50 border border-olive/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 focus:border-olive/30 transition-all"
                />
                <button
                  disabled={isLoading || !input.trim()}
                  onClick={handleSend}
                  className="absolute right-3 p-2 bg-olive text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-olive text-white rounded-full flex items-center justify-center shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-white"
          />
        )}
      </motion.button>
    </div>
  );
}
