import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../hooks/useHaptics';
import { Home, Calendar, Sparkles, Camera } from 'lucide-react';

export function FloatingBottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'today', label: 'Aaj', icon: Home },
    { id: 'week', label: 'Hafta', icon: Calendar },
    { id: 'remedies', label: 'Nuskhe', icon: Sparkles },
    { id: 'vault', label: 'Vault', icon: Camera }
  ];

  return (
    <nav className="bottom-nav-bar" id="bottom-nav-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            type="button"
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              soundEngine.tick();
              onSelectTab(tab.id);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="nav-icon"
              animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Icon size={20} />
            </motion.div>
            <span className="nav-label">{tab.label}</span>

            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="nav-active-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
