import React from 'react';
import { motion } from 'framer-motion';
import { MissionCard } from '../widgets/MissionCard';
import { WEEKLY_SCHEDULE, ROADMAP_STAGES } from '../../data/weeklySchedule';

export function WeekTab({ storage }) {
  const dayIndex = new Date().getDay();
  const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const todayId = dayMap[dayIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="section-header-bar">
        <h2>📅 Poora 7 Dino Ka Plan</h2>
        <span className="header-action-badge">Somwar — Raviwar</span>
      </div>

      <div className="routine-stack">
        {WEEKLY_SCHEDULE.map((item) => {
          const isCompleted = storage.completedDays.includes(item.id);
          const isToday = item.id === todayId;

          return (
            <MissionCard
              key={item.id}
              item={item}
              isCompleted={isCompleted}
              onToggle={storage.toggleDay}
              isPriority={isToday}
            />
          );
        })}
      </div>

      {/* 3. GROWTH ROADMAP (4-STAGE STEPPER) */}
      <div className="section-card">
        <div className="card-head">
          <div className="card-title-group">
            <span style={{ fontSize: '1.1rem' }}>📏</span>
            <div className="card-title-text">Growth Roadmap</div>
          </div>
          <div className="chip-target-stat">2.0" → 7.5" Target</div>
        </div>

        <div className="roadmap-track">
          <div className="roadmap-line-bg">
            <div className="roadmap-line-fill" style={{ width: '25%' }}></div>
          </div>
          <div className="roadmap-nodes">
            {ROADMAP_STAGES.map((node, idx) => (
              <div key={node.id} className={`roadmap-node ${idx === 0 ? 'active' : ''}`}>
                <div className="node-bubble">{node.emoji}</div>
                <div className="node-inch">{node.inches}</div>
                <div className="node-name">{node.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="roadmap-forecast">
          <div className="forecast-icon">⏳</div>
          <div className="forecast-text">
            <strong>Next: 3.5" (Kaan cover honge) in ~60 Days</strong><br />
            Bas haircut mat lena, sirf pichhe gardan se clean karwana!
          </div>
        </div>
      </div>
    </motion.div>
  );
}
