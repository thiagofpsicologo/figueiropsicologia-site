import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, HelpCircle, User, Award, DollarSign, Calendar, Heart, Shield, Copy, Check, ArrowRight, Sparkles, Phone, MessageSquare, Compass, Clipboard } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: 'Sobre o Psicólogo' | 'Valores & Sessões' | 'Dúvidas Comuns' | 'Contatos';
  tags: string[];
  action: () => void;
  actionText: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  openScheduling: (plan?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, openScheduling }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open and handle scroll lock safely
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyPix = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleScrollToSection = (id: string) => {
    onClose();
    // Wait for modal closing animations to transition smoothly before scrolling
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    });
  };

  const searchIndex: SearchResultItem[] = [
    {
      id: 'fumec-crp',
      title: 'Thiago Figueiró — Registro Profissional e CRP',
      description: 'Psicólogo Clínico graduado pela Universidade FUMEC em 2017, devidamente registrado sob o conselho da profissão: CRP 04/48708.',
      category: 'Sobre o Psicólogo',
      tags: ['crp', 'registro', 'fumec', 'psicologos', 'thiago', 'graduacao', 'formacao', 'especialidade', 'experiencia', 'cadastro', 'quem e'],
      action: () => handleScrollToSection('about'),
      actionText: 'Ver qualificações'
    },
    {
      id: 'abordagem-empatia',
      title: 'Nossa Abordagem e Valores Clínicos',
      description: 'Uma prática terapêutica humanizada, pautada no acolhimento, ética, escuta ativa genuína e livre de julgamentos.',
      category: 'Sobre o Psicólogo',
      tags: ['empatia', 'acolhimento', 'abordagem', 'etica', 'escuta', 'seguro', 'valores', 'pratica', 'humanizada'],
      action: () => handleScrollToSection('about'),
      actionText: 'Conhecer abordagem'
    },
    {
      id: 'registro-sigilo',
      title: 'Sigilo Profissional e Confidencialidade',
      description: 'Privacidade restrita baseada rigorosamente nas diretrizes do Código de Ética Profissional do Psicólogo clínico.',
      category: 'Sobre o Psicólogo',
      tags: ['sigilo', 'privacidade', 'etica', 'confidencial', 'seguranca', 'diretrizes', 'conselho', 'regras'],
      action: () => handleScrollToSection('about'),
      actionText: 'Ver ética'
    },
    {
      id: 'plano-semanal',
      title: 'Plano Semanal (Acompanhamento Contínuo)',
      description: 'R$ 400 por mês. Formato recomendado com 1 sessão fixa toda semana para constante progresso emocional.',
      category: 'Valores & Sessões',
      tags: ['semanal', 'preço', 'valor', 'mensal', '400', 'consulta', 'plano', 'psicoterapia', 'quanto custa', 'sessao'],
      action: () => {
        onClose();
        openScheduling('Psicoterapia Semanal');
      },
      actionText: 'Agendar Semanal'
    },
    {
      id: 'plano-quinzenal',
      title: 'Plano Quinzenal (Manutenção)',
      description: 'R$ 250 por mês. Sessões de psicoterapia de forma quinzenal, ideal para acompanhamento de manutenção.',
      category: 'Valores & Sessões',
      tags: ['quinzenal', 'preço', 'valor', 'mensal', '250', 'consulta', 'plano', 'manutencao', 'quanto custa', 'sessao'],
      action: () => {
        onClose();
        openScheduling('Psicoterapia Quinzenal');
      },
      actionText: 'Agendar Quinzenal'
    },
    {
      id: 'plano-pontual',
      title: 'Atendimento Pontual (Sessão Avulsa)',
      description: 'R$ 120 por sessão. Perfeito para demandas imediatas, emergências intelectuais ou focos situacionais pontuais.',
      category: 'Valores & Sessões',
      tags: ['pontual', 'avulso', '120', 'sessao avulsa', 'plano', 'preco', 'emergencia', 'imediato', 'quanto custa'],
      action: () => {
        onClose();
        openScheduling('Atendimento Pontual');
      },
      actionText: 'Agendar Avulsa'
    },
    {
      id: 'sessao-online-func',
      title: 'Como funcionam as Sessões Online?',
      description: 'Atendimentos confortáveis e eficientes por videochamada criptografada. Flexibilidade e praticidade.',
      category: 'Dúvidas Comuns',
      tags: ['online', 'video', 'videochamada', 'distancia', 'internet', 'seguro', 'como funciona', 'virtual', 'ligacao'],
      action: () => handleScrollToSection('faq'),
      actionText: 'Ver no FAQ'
    },
    {
      id: 'mensalidade-acordo',
      title: 'Métodos de Pagamento (Pix / Transferência)',
      description: 'Pagamentos agilizados e fáceis via Pix ou transferência. Opções de chaves com e-mail cadastrado ou telefone.',
      category: 'Valores & Sessões',
      tags: ['pix', 'chave', 'pagamento', 'dinheiro', 'banco', 'transferência', 'acerto', 'mensalidade'],
      action: () => handleScrollToSection('faq'),
      actionText: 'Como pagar'
    },
    {
      id: 'frequencia-conselho',
      title: 'Qual é a frequência recomendada para terapia?',
      description: 'Aconselhamos sessões semanais para aprofundamento, porém estruturamos um cronograma flexível conforme seu momento.',
      category: 'Dúvidas Comuns',
      tags: ['frequencia', 'tempo', 'duracao', 'quinzena', 'semana', '50 minutos', 'ideal', 'consultas'],
      action: () => handleScrollToSection('faq'),
      actionText: 'Ver no FAQ'
    },
    {
      id: 'chave-pix-email',
      title: 'Chave Pix — E-mail do Consultório',
      description: 'thiagomeirelesfigueiro@hotmail.com.br (Clique no botão para copiar este endereço Pix imediatamente)',
      category: 'Contatos',
      tags: ['pix', 'chave', 'thiagomeirelesfigueiro@hotmail.com.br', 'copiar e-mail', 'e-mail', 'copiar'],
      action: () => handleCopyPix('thiagomeirelesfigueiro@hotmail.com.br'),
      actionText: 'Copiar E-mail'
    },
    {
      id: 'chave-pix-fone',
      title: 'Chave Pix — Telefone Celular',
      description: '31994238535 (Clique no botão para copiar o telefone como chave Pix cadastrada)',
      category: 'Contatos',
      tags: ['pix', 'chave', '31994238535', 'telefone', 'celular', 'copiar celular', 'copiar fone', 'copiar'],
      action: () => handleCopyPix('31994238535'),
      actionText: 'Copiar Celular'
    },
    {
      id: 'whatsapp-contato',
      title: 'Falar no WhatsApp Direct',
      description: '(31) 99423-8535 — Abra uma conversa instantânea com o Dr. Thiago para tirar dúvidas ou agendar de forma personalizada.',
      category: 'Contatos',
      tags: ['whatsapp', 'telefone', 'contato', 'numero', '31994238535', 'celular', 'conversar', 'falar', 'mensagem'],
      action: () => window.open(WHATSAPP_LINK, '_blank', 'noreferrer'),
      actionText: 'Abrir WhatsApp'
    },
    {
      id: 'instagram-thiago',
      title: 'Instagram Profissional (@psicologo.thiagofigueiro)',
      description: 'Descubra insights semanais, saberes clínicos sobre comportamento, regulação emocional e desenvolvimento interior.',
      category: 'Contatos',
      tags: ['instagram', 'perfil', 'insta', 'rede social', 'conteudo', 'post', 'seguir', 'thiagofigueiro'],
      action: () => window.open('https://instagram.com/psicologo.thiagofigueiro', '_blank', 'noreferrer'),
      actionText: 'Ver Instagram'
    }
  ];

  // Helper definition to filter and normalize inputs removing accents
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const filteredResults = searchQuery.trim() === ''
    ? []
    : searchIndex.filter((item) => {
        const queryNorm = normalizeText(searchQuery);
        const titleNorm = normalizeText(item.title);
        const descNorm = normalizeText(item.description);
        
        return (
          titleNorm.includes(queryNorm) ||
          descNorm.includes(queryNorm) ||
          item.tags.some(tag => normalizeText(tag).includes(queryNorm))
        );
      });

  const popularSearches = [
    { text: 'Sessão por vídeo', query: 'online' },
    { text: 'Planos de Psicoterapia', query: 'plano' },
    { text: 'Insta / Contatos', query: 'contato' },
    { text: 'Conselho CRP', query: 'crp' },
    { text: 'Chaves Pix', query: 'pix' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6" id="site-search-modal">
          {/* Blur backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-natural-ink/30 backdrop-blur-[10px]"
          />

          {/* Interactive Search Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative glass-morphism bg-white/95 border border-white/80 w-full max-w-2xl rounded-[32px] shadow-[0_32px_64px_-12px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header input container */}
            <div className="flex items-center gap-4 px-6 py-5 md:px-8 border-b border-primary-blue/10 bg-primary-blue/[0.01]">
              <Search className="text-primary-blue shrink-0 animate-pulse" size={20} strokeWidth={2.5} />
              
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque por 'online', 'crp', 'preço', 'pix'..."
                className="w-full bg-transparent border-0 outline-none text-natural-ink placeholder-natural-ink/30 text-base md:text-lg font-sans font-medium focus:ring-0"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-natural-ink/25 hover:text-natural-ink/60 hover:bg-natural-ink/5 transition-all cursor-pointer"
                  title="Limpar texto"
                >
                  <X size={15} />
                </button>
              )}

              <button
                onClick={onClose}
                className="px-2.5 py-1 rounded-xl bg-natural-ink/5 border border-natural-ink/10 text-natural-ink/40 font-mono text-[9px] font-bold uppercase tracking-wider hover:text-natural-ink/70 transition-all cursor-pointer"
              >
                fechar
              </button>
            </div>

            {/* Content list container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
              {/* Copy key success message */}
              <AnimatePresence>
                {copiedText && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 border border-emerald-200/40 shadow-sm"
                  >
                    <Check size={14} className="text-emerald-600" strokeWidth={3} />
                    Sucesso! Chave Copiada com sucesso para o seu celular.
                  </motion.div>
                )}
              </AnimatePresence>

              {searchQuery.trim() === '' ? (
                // Welcome panel with suggestions & layout sections shortcuts
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary-blue font-bold flex items-center gap-1.5">
                      <Sparkles size={11} className="animate-pulse" />
                      Sugestões de busca frequentes
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((item) => (
                        <button
                          key={item.text}
                          onClick={() => setSearchQuery(item.query)}
                          className="px-3.5 py-2 rounded-2xl bg-primary-blue/[0.03] border border-primary-blue/10 hover:border-primary-blue/30 text-xs text-natural-ink/70 hover:text-primary-blue font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                        >
                          <Search size={11} className="opacity-40" />
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-primary-blue/5">
                    <h5 className="text-[10px] uppercase tracking-[0.25em] text-natural-ink/40 font-bold mb-3 flex items-center gap-1.5">
                      <Compass size={11} />
                      Atalhos Rápidos de Navegação
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div 
                        onClick={() => { onClose(); handleScrollToSection('about'); }}
                        className="p-4 rounded-2xl bg-natural-bg/30 border border-primary-blue/5 hover:border-primary-blue/15 hover:bg-white transition-all cursor-pointer text-left space-y-1.5 group"
                      >
                        <User size={15} className="text-primary-blue group-hover:scale-110 transition-transform" />
                        <h6 className="text-xs font-bold text-natural-ink font-serif italic">Sobre o Profissional</h6>
                        <p className="text-[11px] text-natural-ink/50 font-light">Formação acadêmica, currículo, CRP e abordagem terapêutica.</p>
                      </div>

                      <div 
                        onClick={() => { onClose(); handleScrollToSection('services'); }}
                        className="p-4 rounded-2xl bg-natural-bg/30 border border-primary-blue/5 hover:border-primary-blue/15 hover:bg-white transition-all cursor-pointer text-left space-y-1.5 group"
                      >
                        <DollarSign size={15} className="text-primary-blue group-hover:scale-110 transition-transform" />
                        <h6 className="text-xs font-bold text-natural-ink font-serif italic">Valores e Acompanhamentos</h6>
                        <p className="text-[11px] text-natural-ink/50 font-light">Tabela de preços das sessões semanais, quinzenais ou terapia avulsa.</p>
                      </div>

                      <div 
                        onClick={() => { onClose(); handleScrollToSection('faq'); }}
                        className="p-4 rounded-2xl bg-natural-bg/30 border border-primary-blue/5 hover:border-primary-blue/15 hover:bg-white transition-all cursor-pointer text-left space-y-1.5 group"
                      >
                        <HelpCircle size={15} className="text-primary-blue group-hover:scale-110 transition-transform" />
                        <h6 className="text-xs font-bold text-natural-ink font-serif italic">Perguntas Comuns (FAQ)</h6>
                        <p className="text-[11px] text-natural-ink/50 font-light">Dúvidas rápidas sobre faltas, remarcações, vídeo online e sigilo.</p>
                      </div>

                      <div 
                        onClick={() => { onClose(); openScheduling(); }}
                        className="p-4 rounded-2xl bg-natural-bg/30 border border-primary-blue/5 hover:border-primary-blue/15 hover:bg-white transition-all cursor-pointer text-left space-y-1.5 group"
                      >
                        <Calendar size={15} className="text-primary-blue group-hover:scale-110 transition-transform" />
                        <h6 className="text-xs font-bold text-natural-ink font-serif italic">Grade de Agendamento</h6>
                        <p className="text-[11px] text-natural-ink/50 font-light">Escolha um horário vago e reserve instantaneamente no sistema.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Searched Results View
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-natural-ink/40 font-bold tracking-wider">
                    <span>RESULTADOS ({filteredResults.length})</span>
                    <span className="text-primary-blue font-bold">Palavra: &ldquo;{searchQuery}&rdquo;</span>
                  </div>

                  {filteredResults.length === 0 ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-primary-blue/5 flex items-center justify-center text-primary-blue mx-auto">
                        <Search size={15} className="opacity-30" />
                      </div>
                      <h4 className="text-xs font-bold text-natural-ink">Sem correspondência direta</h4>
                      <p className="text-[11px] text-natural-ink/50 max-w-sm mx-auto font-light leading-relaxed">
                        Não encontramos correspondências exatas. Busque por termos mais comuns como: &ldquo;CRP&rdquo;, &ldquo;valores&rdquo;, &ldquo;semanal&rdquo; ou &ldquo;whatsapp&rdquo;.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredResults.map((item) => (
                        <div
                          key={item.id}
                          className="group p-4 rounded-2xl bg-white/40 border border-primary-blue/10 hover:border-primary-blue/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-white text-left shadow-sm hover:shadow-[0_12px_24px_rgba(15,23,42,0.02)]"
                        >
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <span className="inline-block px-2 py-0.5 rounded-lg bg-primary-blue/[0.04] border border-primary-blue/10 text-[8.5px] font-black uppercase tracking-widest text-primary-blue">
                              {item.category}
                            </span>
                            <h4 className="text-xs md:text-sm font-serif font-bold text-natural-ink group-hover:text-primary-blue transition-colors italic leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-natural-ink/60 font-light leading-snug">
                              {item.description}
                            </p>
                          </div>

                          <div className="shrink-0 flex items-center">
                            <button
                              onClick={item.action}
                              className="px-3.5 py-2 rounded-xl bg-primary-blue hover:bg-natural-ink text-white transition-all font-sans text-[10px] tracking-wider uppercase font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                            >
                              <span>{item.actionText}</span>
                              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-4 md:px-8 bg-natural-bg/40 border-t border-primary-blue/5 flex items-center justify-between text-[9px] text-natural-ink/45 font-bold tracking-wider shrink-0 font-mono">
              <span>Dr. Thiago Figueiró &bull; CRP 04/48708</span>
              <span className="opacity-90">Pesquisa de Conteúdo em Tempo Real</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
