import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export function ScalpMassageTimer() {
  const [seconds, setSeconds] = useState(240);
  const [isRunning, setIsRunning] = useState(false);
  const [spaOn, setSpaOn] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      soundEngine.celebrate();
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, seconds]);

  const togglePlay = () => {
    soundEngine.pop();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    soundEngine.tick();
    setIsRunning(false);
    setSeconds(240);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="arcade-box"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="arcade-header">
        <div className="arcade-title-group">
          <div className="arcade-icon-tile">💆‍♂️</div>
          <div className="arcade-h3">4-Minute Scalp Massage</div>
        </div>
        <button 
          className="btn-spa-pill"
          onClick={() => { soundEngine.tick(); setSpaOn(!spaOn); }}
        >
          {spaOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>Spa Sound: {spaOn ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <div className="arcade-controls-row">
        <div className="timer-digits-text">{formatTime(seconds)}</div>
        <div className="arcade-action-btns">
          <motion.button 
            className="btn-timer-primary"
            onClick={togglePlay}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            {isRunning ? <><Pause size={15} /> PAUSE</> : <><Play size={15} /> START</>}
          </motion.button>
          <motion.button 
            className="btn-timer-sec"
            onClick={resetTimer}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </motion.button>
        </div>
      </div>

      <div className="arcade-coach-note">
        Ungliyon se circular massage do taaki roots tak blood pahuche! 💆‍♂️
      </div>
    </motion.div>
  );
}
