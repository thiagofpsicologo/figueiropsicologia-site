import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-natural-ink/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-primary-blue/10"
          >
            <div className="p-6 md:p-8 border-b border-primary-blue/5 flex justify-between items-center bg-natural-bg/30">
              <h3 className="text-2xl md:text-3xl font-serif text-natural-ink italic">{title}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-primary-blue/10 rounded-full transition-colors text-natural-ink/40"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              {content}
            </div>

            <div className="p-6 border-t border-primary-blue/5 bg-natural-bg/30 flex justify-end">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-natural-ink text-white rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-blue transition-colors"
                id="close-policy-btn"
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
