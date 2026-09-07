import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroStatusCard } from '../widgets/HeroStatusCard';
import { ScratchCard } from '../widgets/ScratchCard';
import { MissionCard } from '../widgets/MissionCard';
import { WaterTracker } from '../widgets/WaterTracker';
import { ProteinTracker } from '../widgets/ProteinTracker';
import { ScalpMassageTimer } from '../widgets/ScalpMassageTimer';
import { WEEKLY_SCHEDULE } from '../../data/weeklySchedule';
import { DAILY_FORTUNES } from '../../data/fortunes';

export function TodayTab({ storage }) {
  // Get current day of week (0=Sun, 1=Mon, ..., 6=Sat)
  const dayIndex = new Date().getDay();
  const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const todayId = dayMap[dayIndex];
  const todayItem = WEEKLY_SCHEDULE.find((item) => item.id === todayId) || WEEKLY_SCHEDULE[0];

  const [mascotQuoteIndex, setMascotQuoteIndex] = useState(0);
  const mascotQuotes = [
    "Oye champion! Aaj ka mission check kiya kya? 🦁",
    "Pani peena mat bhoolna mere sher, dehydration se baal weak hote hain! 💧",
    "Gardan par se rough towel ragadna band karo, cotton T-shirt use karo! 👕",
    "Daily consistency hi king banati hai mere bhai! 👑"
  ];

  const handleTalkMascot = () => {
    setMascotQuoteIndex((prev) => (prev + 1) % mascotQuotes.length);
  };

  const handleRevealScratch = () => {
    const randomTip = DAILY_FORTUNES[Math.floor(Math.random() * DAILY_FORTUNES.length)];
    storage.revealFortune(randomTip);
  };

  const isTodayCompleted = storage.completedDays.includes(todayItem.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
    >
      <HeroStatusCard
        streak={storage.streak}
        completedCount={storage.completedDays.length}
        onTalkMascot={handleTalkMascot}
        speechText={mascotQuotes[mascotQuoteIndex]}
      />

      <ScratchCard
        isRevealed={storage.fortuneRevealed}
        fortuneText={storage.fortuneText}
        onReveal={handleRevealScratch}
      />

      <div className="section-header-bar">
        <h2>🎯 Aaj Ka Mission</h2>
        <span className="header-action-badge">Tap to Tick ✓</span>
      </div>

      <div className="today-focus-slot" style={{ marginBottom: '14px' }}>
        <MissionCard
          item={todayItem}
          isCompleted={isTodayCompleted}
          onToggle={storage.toggleDay}
          isPriority={true}
        />
      </div>

      <div className="daily-grid">
        <WaterTracker cups={storage.cups} onToggleCup={storage.toggleCup} />
        <ProteinTracker protein={storage.protein} onAdjustProtein={storage.adjustProtein} />
      </div>

      <ScalpMassageTimer />
    </motion.div>
  );
}
