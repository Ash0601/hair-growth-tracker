import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GHAR_KE_NUSKHE, FORWARD_HAIR_GUIDE, TIMELINE_12_MONTHS, BARBER_SCRIPT, GOLDEN_RULES } from '../../data/nuskheLibrary';
import { soundEngine } from '../../hooks/useHaptics';

export function NuskheTab() {
  const [activeSubTab, setActiveSubTab] = useState('desi');

  const subTabs = [
    { id: 'desi', label: '🌿 Ghar Ke Nuskhe' },
    { id: 'guide', label: '💡 Secret Guide' },
    { id: 'timeline', label: '🚀 12 Months Map' },
    { id: 'barber', label: '🛡️ Barber Permit' },
    { id: 'rules', label: '⚖️ Do vs Don\'t' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="section-header-bar">
        <h2>🌿 Ghar Ke Nuskhe & Hair Guide</h2>
        <span className="header-action-badge">100% Zero-Cost</span>
      </div>

      <div className="edu-shelf">
        <div className="edu-pills-nav">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab-btn ${activeSubTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                soundEngine.tick();
                setActiveSubTab(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeSubTab === 'desi' && (
            <motion.div 
              key="desi"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {GHAR_KE_NUSKHE.map((item) => (
                <div key={item.id} className="faq-item">
                  <div className="faq-q">{item.icon} {item.title} • {item.cost}</div>
                  <div className="faq-a">
                    <strong>Kaise Banayein:</strong> {item.kaiseBanaye}<br />
                    <strong>Kaise Lagayein:</strong> {item.kaiseLagaye}<br />
                    <strong>Kyun:</strong> {item.kyun}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSubTab === 'guide' && (
            <motion.div 
              key="guide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {FORWARD_HAIR_GUIDE.map((item, idx) => (
                <div key={idx} className="faq-item">
                  <div className="faq-q">🎯 {item.step}</div>
                  <div className="faq-a">{item.detail}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSubTab === 'timeline' && (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {TIMELINE_12_MONTHS.map((item, idx) => (
                <div key={idx} className="faq-item">
                  <div className="faq-q">📅 {item.month} ({item.length}) • {item.status}</div>
                  <div className="faq-a">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSubTab === 'barber' && (
            <motion.div 
              key="barber"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {BARBER_SCRIPT.map((item, idx) => (
                <div key={idx} className="faq-item">
                  <div className="faq-q">🗣️ {item.speaker} Kehta Hai:</div>
                  <div className="faq-a">"{item.text}"</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSubTab === 'rules' && (
            <motion.div 
              key="rules"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {GOLDEN_RULES.map((item, idx) => (
                <div key={idx} className="faq-item">
                  <div className="faq-q">⚖️ {item.rule}</div>
                  <div className="faq-a">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
