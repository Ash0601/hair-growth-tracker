import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';
import confetti from 'canvas-confetti';

export function WaterTracker({ cups, onToggleCup }) {
  const filledCount = cups.length;
  const liters = (filledCount * 0.25).toFixed(1);

  const handleCupClick = (idx) => {
    const isAdding = !cups.includes(idx);
    if (isAdding) {
      if (filledCount === 7) {
        soundEngine.celebrate();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } else {
        soundEngine.droplet(filledCount + 1);
      }
    } else {
      soundEngine.tick();
    }
    onToggleCup(idx);
  };

  return (
    <motion.div 
      className="water-box"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="water-head">
        <div className="water-title">
          <span className="water-head-icon">💧</span>
          <span>Paani Target (8 Glasses)</span>
        </div>
        <div className="water-stats-pill">
          <span className="water-badge">{filledCount} / 8 Glasses</span>
          <span className="water-liters">{liters}L Hydrated</span>
        </div>
      </div>

      <div className="cups-flex-row">
        {[...Array(8)].map((_, idx) => {
          const isFilled = cups.includes(idx);
          return (
            <motion.button
              key={idx}
              type="button"
              className={`cup-chip ${isFilled ? 'filled' : ''}`}
              onClick={() => handleCupClick(idx)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.88 }}
              animate={isFilled ? { scale: [1, 1.2, 1.04], y: -2 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              title={`Glass ${idx + 1}`}
            >
              💧
            </motion.button>
          );
        })}
      </div>

      <div className="water-caption">
        Tap each glass to hydrate hair roots & flush DHT! 🌊
      </div>
    </motion.div>
  );
}
