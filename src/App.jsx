import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { TodayTab } from './components/tabs/TodayTab';
import { WeekTab } from './components/tabs/WeekTab';
import { NuskheTab } from './components/tabs/NuskheTab';
import { VaultTab } from './components/tabs/VaultTab';
import { useTheme } from './hooks/useTheme';
import { useHairStorage } from './hooks/useHairStorage';
import { soundEngine } from './hooks/useHaptics';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const storage = useHairStorage();
  const [activeTab, setActiveTab] = useState('today');

  const handleToggleNotifs = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        alert("Daily Reminders already active hain! Subah 9:30 AM & Shaam 8:00 PM.");
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            soundEngine.celebrate();
            alert("Subah & Shaam reminder active ho gaya!");
          }
        });
      } else {
        alert("Browser notifications blocked hain. Settings me jaakar allow karein.");
      }
    } else {
      alert("Aapka device notifications support nahi karta.");
    }
  };

  return (
    <div className="app-container">
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onToggleNotifs={handleToggleNotifs} 
      />

      <main style={{ minHeight: '70vh' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'today' && <TodayTab key="today" storage={storage} />}
          {activeTab === 'week' && <WeekTab key="week" storage={storage} />}
          {activeTab === 'remedies' && <NuskheTab key="remedies" />}
          {activeTab === 'vault' && <VaultTab key="vault" storage={storage} />}
        </AnimatePresence>
      </main>

      <FloatingBottomNav 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
      />
    </div>
  );
}

export default App;
