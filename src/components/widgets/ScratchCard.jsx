import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../hooks/useHaptics';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function ScratchCard({ isRevealed, fortuneText, onReveal }) {
  const handleScratch = () => {
    if (!isRevealed) {
      soundEngine.celebrate();
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#10b981', '#ffffff']
      });
      onReveal();
    }
  };

  return (
    <motion.div 
      className="fortune-box"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="fortune-top-row">
        <div className="fortune-meta">
          <span className="fortune-gift-icon">🎁</span>
          <div>
            <div className="fortune-head">Aaj Ka Desi Hair Secret</div>
            <div className="fortune-subhead">Roz subah 1 naya nuskha unlock hota hai</div>
          </div>
        </div>
        <span className="fortune-badge">
          {isRevealed ? 'Unlocked ✓' : 'Tap to Scratch ✨'}
        </span>
      </div>

      <div className="scratch-surface" onClick={handleScratch}>
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div 
              key="cover"
              className="scratch-cover"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="scratch-glimmer" size={18} />
              <span className="scratch-label">Tap Karke Aaj Ka Secret Scratch Karo!</span>
              <Sparkles className="scratch-glimmer" size={18} />
            </motion.div>
          ) : (
            <motion.div 
              key="revealed"
              className="scratch-revealed"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="fortune-tip-text">"{fortuneText}"</div>
              <div className="fortune-unlocked-tag">
                <CheckCircle2 size={15} />
                <span>Aaj Ka Secret Unlocked! Kal naya tip aayega.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
