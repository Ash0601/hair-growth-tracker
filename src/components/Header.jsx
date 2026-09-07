import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../hooks/useHaptics';
import { Bell, Sun, Moon } from 'lucide-react';

export function Header({ theme, onToggleTheme, onToggleNotifs }) {
  return (
    <header className="app-header">
      <div className="brand-group">
        <motion.div 
          className="brand-avatar"
          whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
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
        <motion.button 
          className="btn-icon-sq"
          onClick={() => { soundEngine.pop(); onToggleNotifs(); }}
          title="Daily Reminders"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={18} />
        </motion.button>

        <motion.button 
          className="btn-icon-sq"
          onClick={() => { soundEngine.pop(); onToggleTheme(); }}
          title="Switch Light / Dark Mode"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </motion.button>
      </div>
    </header>
  );
}
