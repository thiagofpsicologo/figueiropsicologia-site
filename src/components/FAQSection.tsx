import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-primary-blue/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-serif italic transition-colors duration-300 ${isOpen ? 'text-primary-blue' : 'text-natural-ink group-hover:text-primary-blue'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`p-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-primary-blue/10 text-primary-blue' : 'text-natural-ink/30 group-hover:text-primary-blue group-hover:bg-primary-blue/5'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-sm md:text-base text-natural-ink/60 leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como funcionam as sessões online?",
      answer: "As sessões são realizadas por videochamada em plataformas seguras e criptografadas. Você só precisa de um lugar privativo, conexão com a internet e fones de ouvido para garantir seu sigilo e conforto durante o atendimento."
    },
    {
      question: "Qual a duração e frequência dos atendimentos?",
      answer: "Cada sessão dura aproximadamente 50 minutos. A frequência padrão é de uma vez por semana, mas isso pode ser reavaliado e ajustado conforme sua necessidade e momento do processo terapêutico."
    },
    {
      question: "Como saber se é o momento de buscar ajuda profissional?",
      answer: "Não é preciso estar em crise para procurar terapia. Se você sente que suas emoções estão impactando sua rotina, se deseja melhorar seus relacionamentos ou simplesmente busca um espaço de autoconhecimento e crescimento pessoal, este é o momento ideal."
    },
    {
      question: "Como é feito o pagamento das sessões?",
      answer: "O pagamento pode ser realizado via PIX ou transferência bancária. Geralmente, combinamos o acerto por sessão individual ou pacotes mensais, conforme ficar mais confortável para sua organização financeira."
    },
    {
      question: "As sessões são realmente sigilosas?",
      answer: "Sim, absolutamente. O sigilo é um pilar fundamental da ética profissional do psicólogo. Tudo o que é dito em sessão permanece estritamente entre nós, resguardado pelo código de ética do Conselho Federal de Psicologia."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-blue/5 text-primary-blue border border-primary-blue/10 mb-2">
          <HelpCircle size={14} strokeWidth={2.5} />
          <span className="text-[10px] uppercase font-black tracking-[0.2em]">Dúvidas Comuns</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif italic text-natural-ink">Perguntas Frequentes</h2>
        <p className="text-lg text-natural-ink/60 font-light max-w-2xl mx-auto">
          Tire suas dúvidas sobre o processo terapêutico e como começar sua jornada.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/40 backdrop-blur-sm rounded-[2rem] border border-primary-blue/5 p-8 md:p-12 shadow-sm"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </motion.div>
    </section>
  );
};
