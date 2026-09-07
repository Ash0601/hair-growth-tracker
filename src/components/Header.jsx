import React from 'react';
import { motion } from 'framer-motion';
import { Haptics } from '../hooks/useHaptics';
import { Bell, Sun, Moon } from 'lucide-react';

export function Header({ theme, onToggleTheme, onToggleNotifs }) {
  return (
    <header className="app-header">
      <div className="brand-group">
        <motion.div 
          className="brand-avatar"
          whileTap={{ scale: 0.92 }}
        >
          🦁
        </motion.div>
        <div className="brand-titles">
          <div className="brand-name">Hair Flow Quest</div>
          <div className="brand-sub">Daily Hair Transformation</div>
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="btn-icon-sq"
          onClick={() => { Haptics.tick(); onToggleNotifs(); }}
          title="Daily Reminders"
        >
          <Bell size={18} />
        </button>

        <button 
          className="btn-icon-sq"
          onClick={() => { Haptics.tick(); onToggleTheme(); }}
          title="Switch Light / Dark Mode"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
