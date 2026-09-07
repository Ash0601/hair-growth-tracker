import React from 'react';
import { motion } from 'framer-motion';
import { Haptics } from '../hooks/useHaptics';
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
              Haptics.tick(); // Physical vibration + crown tick click
              onSelectTab(tab.id);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="nav-icon">
              <Icon size={20} />
            </div>
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
