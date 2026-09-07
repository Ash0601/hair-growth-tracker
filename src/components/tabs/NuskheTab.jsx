import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GHAR_KE_NUSKHE, FORWARD_HAIR_GUIDE, TIMELINE_12_MONTHS, BARBER_SCRIPT, GOLDEN_RULES } from '../../data/nuskheLibrary';
import { soundEngine } from '../../hooks/useHaptics';

export function NuskheTab() {
  const [activeSubTab, setActiveSubTab] = useState('desi');

  const subTabs = [
    { id: 'desi', label: '🌿 Ghar Ke Nuskhe' },
    { id: 'guide', label: '💡 Hair Training' },
    { id: 'timeline', label: '🚀 12 Months Map' },
    { id: 'barber', label: '🛡️ Barber Permit' },
    { id: 'rules', label: '⚖️ Do vs Don\'t' }
  ];

  return (
    <div className="tab-view-container">
      <div className="section-header-bar">
        <h2>🌿 Ghar Ke Nuskhe & Hair Guide</h2>
        <span className="header-action-badge">100% Free Kitchen Care</span>
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

        <div className="edu-content-area">
          {activeSubTab === 'desi' && (
            <div>
              {GHAR_KE_NUSKHE.map((item) => (
                <div key={item.id} className="nuskha-card">
                  <div className="nuskha-header">
                    <span className="nuskha-icon">{item.icon}</span>
                    <div className="nuskha-titles">
                      <div className="nuskha-name">{item.title}</div>
                      <span className="nuskha-cost-chip">{item.cost}</span>
                    </div>
                  </div>

                  <div className="nuskha-steps-box">
                    <div className="nuskha-step-row">
                      <span className="step-label">🥣 Kaise Banayein:</span>
                      <span className="step-text">{item.kaiseBanaye}</span>
                    </div>
                    <div className="nuskha-step-row">
                      <span className="step-label">💆‍♂️ Kaise Lagayein:</span>
                      <span className="step-text">{item.kaiseLagaye}</span>
                    </div>
                    <div className="nuskha-step-row">
                      <span className="step-label">✨ Kyun Lagayein:</span>
                      <span className="step-text">{item.kyun}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'guide' && (
            <div>
              {FORWARD_HAIR_GUIDE.map((item, idx) => (
                <div key={idx} className="nuskha-card">
                  <div className="nuskha-name">🎯 {item.step}</div>
                  <div className="nuskha-desc" style={{ marginTop: '8px' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'timeline' && (
            <div>
              {TIMELINE_12_MONTHS.map((item, idx) => (
                <div key={idx} className="nuskha-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-white)' }}>📅 {item.month}</span>
                    <span className="nuskha-cost-chip">{item.length}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '4px' }}>Stage: {item.status}</div>
                  <div className="nuskha-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'barber' && (
            <div>
              {BARBER_SCRIPT.map((item, idx) => (
                <div key={idx} className={`dialogue-bubble ${item.speaker === 'You' ? 'user' : 'barber'}`}>
                  <div className="dialogue-speaker">🗣️ {item.speaker}:</div>
                  <div className="dialogue-text">"{item.text}"</div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'rules' && (
            <div>
              {GOLDEN_RULES.map((item, idx) => (
                <div key={idx} className="nuskha-card">
                  <div className="nuskha-name">{item.rule}</div>
                  <div className="nuskha-desc" style={{ marginTop: '6px' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
