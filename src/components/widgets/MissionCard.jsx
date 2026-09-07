import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';
import { Check } from 'lucide-react';

export function MissionCard({ item, isCompleted, onToggle, isPriority = false }) {
  const handleClick = () => {
    soundEngine.pop();
    onToggle(item.id);
  };

  return (
    <motion.div
      className={`protocol-card ${isPriority ? 'today' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      layout
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="btn-card-checkbox"
        animate={isCompleted ? { scale: [1, 1.25, 1.06] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isCompleted && <Check size={18} strokeWidth={3} />}
      </motion.div>

      <div className="routine-details">
        <div className="routine-meta-row">
          <span className={`day-chip ${isPriority ? 'today-badge' : ''}`}>
            {isPriority ? `${item.dayName} (Aaj)` : item.dayName}
          </span>
          <span className={`routine-type-tag ${item.badgeClass}`}>
            {item.typeTag}
          </span>
        </div>
        <div className="routine-name">{item.title}</div>
        <div className="routine-hint">{item.hint}</div>
      </div>
    </motion.div>
  );
}
