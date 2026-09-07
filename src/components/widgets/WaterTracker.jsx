import React from 'react';
import { motion } from 'framer-motion';
import { Haptics } from '../../hooks/useHaptics';
import confetti from 'canvas-confetti';

export function WaterTracker({ cups, onToggleCup }) {
  const filledCount = cups.length;
  const liters = (filledCount * 0.25).toFixed(1);

  const handleCupClick = (idx) => {
    const isAdding = !cups.includes(idx);
    if (isAdding) {
      if (filledCount === 7) {
        Haptics.celebrate(); // celebratory vibration + fanfare
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } else {
        Haptics.droplet(filledCount + 1); // musical ascending pitch + haptic pulse
      }
    } else {
      Haptics.tick();
    }
    onToggleCup(idx);
  };

  return (
    <div className="water-box">
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
              whileTap={{ scale: 0.88 }}
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
    </div>
  );
}
