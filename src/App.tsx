import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Scene } from './components/Scene';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { SchedulingModal } from './components/SchedulingModal';
import { PolicyModal } from './components/PolicyModal';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CTASection } from './components/CTASection';
import { FAQSection } from './components/FAQSection';
import { LoadingScreen } from './components/LoadingScreen';
import { SCENES, WHATSAPP_LINK } from './constants';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | undefined>(undefined);

  const openScheduling = (plan?: string) => {
    setSelectedPlanModal(plan);
    setIsSchedulingOpen(true);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const criticalImages = [
      'https://drive.google.com/thumbnail?id=18OxYoRjXAKjdK4w608G6HkYJxF4HAn0O&sz=w300',
      'https://drive.google.com/thumbnail?id=1BAtrxB-NOjDAlp1Md4o1ZEZBid5OpoqS&sz=w1600',
      'https://drive.google.com/thumbnail?id=13pEHjy-sDm3jwd5vz1VLvFhWaxly_aRy&sz=w1600',
      'https://drive.google.com/thumbnail?id=1tVcHVoHn9pV_CfvuJdn98sLlY3de_Ysh&sz=w1000',
      'https://cdn.simpleicons.org/whatsapp/white'
    ];

    const startTime = Date.now();
    const minLoadingDuration = 1800; // Enforce a professional 1.8-second minimum display time

    let loadedCount = 0;
    const totalToLoad = criticalImages.length;
    let fallbackTimer: any = null;
    let finishTimer: any = null;

    // Safety fallback: dismiss loader after maximum 3500ms regardless of loading progress
    fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    const onAssetLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalToLoad) {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        
        // Calculate remaining time to hit the minimum display duration
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingDuration - elapsedTime);

        finishTimer = setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded; // handle failures gracefully to avoid blocking
    });

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="natural-gradient selection:bg-primary-blue selection:text-white min-h-screen transition-colors duration-500 overflow-x-hidden relative">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <SchedulingModal 
        isOpen={isSchedulingOpen} 
        onClose={() => {
          setIsSchedulingOpen(false);
          setSelectedPlanModal(undefined);
        }} 
        selectedPlan={selectedPlanModal}
      />

      <PolicyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="Políticas de Privacidade"
        content={
          <div className="space-y-6 text-natural-ink/70 leading-relaxed font-light">
            <p>Sua privacidade é importante para nós. Esta política descreve como coletamos e usamos seus dados ao utilizar nosso site.</p>
            
            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">1. Coleta de Informações</h4>
              <p className="text-left">Coletamos apenas as informações necessárias para agendamentos e prestação de serviços psicológicos, como nome, telefone e e-mail fornecidos voluntariamente por você via WhatsApp ou formulários.</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">2. Sigilo Profissional</h4>
              <p className="text-left">Como psicólogo clínico, sigo rigorosamente o Código de Ética Profissional do Psicólogo, garantindo o sigilo absoluto de todas as informações compartilhadas durante as sessões e contatos preliminares.</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">3. Uso de Dados</h4>
              <p className="text-left">Seus dados são utilizados exclusivamente para entrar em contato, realizar agendamentos e enviar informações relevantes sobre sua jornada terapêutica. Nunca compartilhamos seus dados com terceiros sem seu consentimento expresso.</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">4. Seus Direitos</h4>
              <p className="text-left">Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento, bastando entrar em contato.</p>
            </section>
          </div>
        }
      />

      <PolicyModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
        title="Termos de Uso"
        content={
          <div className="space-y-6 text-natural-ink/70 leading-relaxed font-light">
            <p>Ao acessar este site, você concorda em cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis.</p>
            
            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">1. Agendamentos</h4>
              <p className="text-left">Os agendamentos realizados via site são pré-reservas e estão sujeitos à confirmação via WhatsApp. O descumprimento de horários sem aviso prévio de 24h poderá estar sujeito a cobrança, conforme acordado previamente.</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">2. Uso do Conteúdo</h4>
              <p className="text-left">Todo o conteúdo deste site (textos, imagens, identidade visual) pertence a Thiago Figueiró e é protegido por leis de direitos autorais. O uso não autorizado é proibido.</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">3. Links Externos</h4>
              <p className="text-left">Este site contém links para serviços de terceiros (como WhatsApp e Google Agenda), que possuem suas próprias políticas de privacidade e termos de uso.</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-natural-ink font-serif text-xl italic text-left">4. Alterações</h4>
              <p className="text-left">Reservamo-nos o direito de modificar estes termos a qualquer momento, para refletir mudanças em nossos serviços ou na legislação.</p>
            </section>
          </div>
        }
      />

      <Header 
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openScheduling={() => openScheduling()}
        setIsPrivacyOpen={setIsPrivacyOpen}
        setIsTermsOpen={setIsTermsOpen}
      />

      <main className="relative">
        <div id="home">
          {SCENES.map((scene, i) => (
            <Scene key={scene.id} scene={scene} index={i} />
          ))}
        </div>

        <AboutSection />
        
        <section id="testimonials" className="py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-primary-blue/[0.02] -z-1" />
          
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary-blue font-black">Depoimentos</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic text-natural-ink">O que dizem os pacientes</h2>
          </div>
          
          <TestimonialCarousel />
        </section>

        <ServicesSection openScheduling={openScheduling} />

        <CTASection openScheduling={() => openScheduling()} />

        <FAQSection openScheduling={() => openScheduling()} />
      </main>

      <Footer 
        openScheduling={() => openScheduling()}
        setIsPrivacyOpen={setIsPrivacyOpen}
        setIsTermsOpen={setIsTermsOpen}
      />

      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-4 md:right-6 lg:right-8 z-[100] flex flex-col gap-4 items-end pointer-events-none"
          >
            <motion.a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group pointer-events-auto ring-4 ring-white/30 backdrop-blur-md"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              title="Falar no WhatsApp"
              id="floating-whatsapp-btn"
            >
              <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-6.5 h-6.5 md:w-8 md:h-8" alt="WhatsApp" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm font-bold">
                Falar no WhatsApp
              </span>
            </motion.a>
    
            <motion.a 
              href="https://instagram.com/psicologo.thiagofigueiro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group pointer-events-auto ring-4 ring-white/30 backdrop-blur-md"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              title="Siga no Instagram"
              id="floating-instagram-btn"
            >
              <Instagram size={24} className="md:w-8 md:h-8" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm font-bold">
                Ver Instagram
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
