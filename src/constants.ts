import React from 'react';
import { Sparkles } from 'lucide-react';

export const WHATSAPP_MESSAGE = encodeURIComponent(`Olá! Seja muito bem-vindo(a) 

Aqui é o Thiago Figueiró, psicólogo.

Fico feliz por você ter chegado até aqui, você deu um passo importante ao entrar em contato. 
Se quiser, pode me contar brevemente o que está buscando estou aqui para te ouvir.

Assim que possível, te respondo com atenção. Muito obrigado!`);

export const WHATSAPP_NUMBER = "5531994238535";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const UNAVAILABLE_SLOTS: Record<string, string[]> = {
  // Let's make these dynamic or just clear them if they were examples
};

export const STANDARD_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export const SCENES = [
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

export const TESTIMONIALS = [
  {
    name: "Ana P.",
    role: "Paciente a 1 ano",
    quote: "O Thiago tem uma sensibilidade única. Me senti acolhida desde a primeira sessão, sem julgamentos.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Carlos M.",
    role: "Acompanhamento Semanal",
    quote: "Processo transformador. Aprendi a lidar com minha ansiedade de uma forma que nunca imaginei ser possível.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Juliana R.",
    role: "Superação de Burnout",
    quote: "Um espaço de cura real. O Thiago é extremamente profissional e humano ao mesmo tempo.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Lucas F.",
    role: "Autoconhecimento",
    quote: "Excelente profissional. Me ajudou a entender padrões que eu repetia há anos sem perceber, trazendo clareza para minha vida.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Maria S.",
    role: "Atendimento Online",
    quote: "A terapia online com o Thiago é impecável. Sinto uma evolução constante e segurança total para me expressar.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Roberto K.",
    role: "Relacionamentos",
    quote: "Tive uma melhora significativa no meu relacionamento familiar após iniciar o acompanhamento. Postura muito ética e técnica.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Patrícia L.",
    role: "Equilíbrio e Bem-estar",
    quote: "As sessões me deram ferramentas práticas para lidar com o estresse diário. Hoje vivo com muito mais leveza e presença.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Fernanda G.",
    role: "Processo Individual",
    quote: "Sinto que minhas questões são verdadeiramente ouvidas. O acolhimento do Thiago faz toda a diferença no meu processo.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800&h=1000"
  },
  {
    name: "Bruno T.",
    role: "Transição de Carreira",
    quote: "Me auxiliou em um momento de dúvida profissional muito difícil. Um direcionamento humano e muito consciente.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=1000"
  }
];
