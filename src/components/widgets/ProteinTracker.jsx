import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';

export function ProteinTracker({ protein, onAdjustProtein }) {
  const goal = 70;
  const progressPct = Math.min(100, Math.round((protein / goal) * 100));

  const handleAdjust = (delta) => {
    soundEngine.ratchet(delta > 0);
    onAdjustProtein(delta);
  };

  return (
    <motion.div 
      className="protein-bar-box"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="protein-top-row">
        <div className="protein-info">
          <h4>🍳 Protein Power <span className="protein-goal-pill">Target: {goal}g</span></h4>
          <span>Uble Ande, Bhuna Chana, Moong Dal, Dahi</span>
        </div>

        <div className="protein-stepper-ctrl">
          <motion.button 
            type="button" 
            className="btn-step" 
            onClick={() => handleAdjust(-10)} 
            whileTap={{ scale: 0.88 }}
          >
            -
          </motion.button>
          <motion.span 
            className="protein-count"
            key={protein}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {protein}g
          </motion.span>
          <motion.button 
            type="button" 
            className="btn-step add" 
            onClick={() => handleAdjust(10)} 
            whileTap={{ scale: 0.88 }}
          >
            +
          </motion.button>
        </div>
      </div>

      <div className="protein-track-wrap">
        <motion.div 
          className="protein-track-fill" 
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>

      <div className="protein-quick-chips">
        <motion.button 
          type="button" 
          className="btn-quick-protein" 
          onClick={() => handleAdjust(12)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
        >
          +12g 🥚 Ande
        </motion.button>
        <motion.button 
          type="button" 
          className="btn-quick-protein" 
          onClick={() => handleAdjust(15)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
        >
          +15g 🥣 Chana
        </motion.button>
        <motion.button 
          type="button" 
          className="btn-quick-protein" 
          onClick={() => handleAdjust(10)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
        >
          +10g 🥛 Dahi
        </motion.button>
      </div>
    </motion.div>
  );
}
