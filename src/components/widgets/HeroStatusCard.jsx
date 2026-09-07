import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';

export function HeroStatusCard({ streak, completedCount, onTalkMascot, speechText }) {
  const progressPct = Math.round((completedCount / 7) * 100);

  return (
    <div className="hero-card">
      <div className="hero-pills-row">
        <div className="status-pill pill-streak">
          <span className="flame-icon">🔥</span>
          <span>{streak} Day Streak</span>
        </div>

        <div className="status-pill pill-shield">
          <span>🛡️</span>
          <span>Shield Ready</span>
        </div>

        <div className="status-pill pill-level">
          <span>🌱</span>
          <span>Level 1 • Sprout</span>
        </div>
      </div>

      <div className="hero-main-row">
        <motion.div 
          className="hero-badge-icon"
          onClick={() => { soundEngine.pop(); onTalkMascot(); }}
          title="Tap coach for tip!"
          whileTap={{ scale: 0.92 }}
        >
          🌱
        </motion.div>

        <div className="hero-copy">
          <div className="hero-headline">Short Cut → Curtain Flow 👑</div>
          <div 
            className="mascot-bubble"
            onClick={() => { soundEngine.pop(); onTalkMascot(); }}
            title="Tap to hear tips!"
          >
            "{speechText || 'Oye champion! Aaj ka mission check kiya kya? 🦁'}"
          </div>
        </div>
      </div>

      <div className="progress-track-wrap">
        <div 
          className="progress-track-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="progress-label-row">
        <span>Hafte Ka Score</span>
        <span className="xp-text">{completedCount} / 7 Tasks Done ({progressPct}%) 🚀</span>
      </div>
    </div>
  );
}
