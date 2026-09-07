import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';

export function HeroStatusCard({ streak, completedCount, onTalkMascot, speechText }) {
  const progressPct = Math.round((completedCount / 7) * 100);

  return (
    <motion.div 
      className="hero-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-pills-row">
        <motion.div 
          className="status-pill pill-streak"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            🔥
          </motion.span>
          <span>{streak} Day Streak</span>
        </motion.div>

        <div className="status-pill pill-shield">
          <span>🛡️</span> Shield Ready
        </div>

        <div className="status-pill pill-level">
          Level 1 • Sprout 🌱
        </div>
      </div>

      <div className="hero-main-row">
        <motion.div 
          className="hero-badge-icon"
          onClick={() => { soundEngine.pop(); onTalkMascot(); }}
          title="Tap to talk to coach!"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
        >
          🌱
        </motion.div>

        <div className="hero-copy">
          <div className="hero-headline">Short Cut → Curtain Flow 👑</div>
          <motion.div 
            className="mascot-bubble"
            onClick={() => { soundEngine.pop(); onTalkMascot(); }}
            title="Tap to hear hair tips!"
            whileTap={{ scale: 0.97 }}
          >
            "{speechText || 'Oye champion! Aaj ka mission check kiya kya? 🦁'}"
          </motion.div>
        </div>
      </div>

      <div className="progress-track-wrap">
        <motion.div 
          className="progress-track-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>

      <div className="progress-label-row">
        <span>Hafte Ka Score</span>
        <span className="xp-text">{completedCount} / 7 Tasks Done ({progressPct}%) 🚀</span>
      </div>
    </motion.div>
  );
}
