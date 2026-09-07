import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Haptics } from '../../hooks/useHaptics';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function ScratchCard({ isRevealed, fortuneText, onReveal }) {
  const handleScratch = () => {
    if (!isRevealed) {
      Haptics.celebrate(); // physical vibration + celebratory arpeggio
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
    <div className="fortune-box">
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
              whileTap={{ scale: 0.96 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles size={16} />
              <span className="scratch-label">Tap Karke Aaj Ka Secret Scratch Karo!</span>
              <Sparkles size={16} />
            </motion.div>
          ) : (
            <motion.div 
              key="revealed"
              className="scratch-revealed"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
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
    </div>
  );
}
