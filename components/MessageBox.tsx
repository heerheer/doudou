import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface MessageBoxProps {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ isOpen, title, message, type = 'info', onClose }) => {
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Info;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed z-70 inset-0 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md bg-theme-surface border border-theme-accent/30 rounded-2xl shadow-2xl shadow-theme-glow p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-theme-accent">
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  {title && <div className="text-lg font-semibold text-theme-text mb-1">{title}</div>}
                  <div className="text-sm text-theme-subtext whitespace-pre-wrap">{message}</div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full transition-colors text-theme-base hover:bg-theme-accent/20 hover:text-theme-text"
                  aria-label="Close message"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MessageBox;
