import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormulaPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formulas: string[];
}

export const FormulaPopup: React.FC<FormulaPopupProps> = ({ isOpen, onClose, title, formulas }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-primary/5 to-secondary/5">
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
                <div className="space-y-4">
                  {formulas.map((formula, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm leading-relaxed"
                    >
                      <pre className="whitespace-pre-wrap text-slate-700">{formula}</pre>
                    </div>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    💡 이 계산식은 calculator.ts에 정의되어 있습니다
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
