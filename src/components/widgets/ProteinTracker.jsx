import React from 'react';
import { motion } from 'framer-motion';
import { Haptics } from '../../hooks/useHaptics';

export function ProteinTracker({ protein, onAdjustProtein }) {
  const goal = 70;
  const progressPct = Math.min(100, Math.round((protein / goal) * 100));

  const handleAdjust = (delta) => {
    Haptics.ratchet(delta > 0); // Mechanical dial haptic + sound
    onAdjustProtein(delta);
  };

  return (
    <div className="protein-bar-box">
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
          <span className="protein-count">
            {protein}g
          </span>
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
        <div 
          className="protein-track-fill" 
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="protein-quick-chips">
        <motion.button 
          type="button" 
          className="btn-quick-protein" 
          onClick={() => handleAdjust(12)}
          whileTap={{ scale: 0.94 }}
        >
          +12g 🥚 Ande
        </motion.button>
        <motion.button 
          type="button" 
          className="btn-quick-protein" 
          onClick={() => handleAdjust(15)}
          whileTap={{ scale: 0.94 }}
        >
          +15g 🥣 Chana
        </motion.button>
        <motion.button 
          type="button" 
          className="btn-quick-protein" 
          onClick={() => handleAdjust(10)}
          whileTap={{ scale: 0.94 }}
        >
          +10g 🥛 Dahi
        </motion.button>
      </div>
    </div>
  );
}
