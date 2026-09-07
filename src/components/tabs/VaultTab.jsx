import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../hooks/useHaptics';
import { Volume2, VolumeX, RotateCcw, FileText, Camera } from 'lucide-react';

export function VaultTab({ storage }) {
  const [soundOn, setSoundOn] = useState(() => soundEngine.isSoundOn());
  const [startPhoto, setStartPhoto] = useState(() => localStorage.getItem('hair_photo_start') || '');
  const [currPhoto, setCurrPhoto] = useState(() => localStorage.getItem('hair_photo_curr') || '');
  const fileInputRef = useRef(null);
  const activeSlotRef = useRef('curr');

  const handleToggleSound = () => {
    const next = soundEngine.toggleSound();
    setSoundOn(next);
  };

  const handleReset = () => {
    if (window.confirm("Bhai, kya sachme is hafte ka routine reset karna chahte ho?")) {
      soundEngine.tick();
      storage.resetWeek();
    }
  };

  const triggerUpload = (slot) => {
    activeSlotRef.current = slot;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        soundEngine.celebrate();
        if (activeSlotRef.current === 'start') {
          setStartPhoto(dataUrl);
          localStorage.setItem('hair_photo_start', dataUrl);
        } else {
          setCurrPhoto(dataUrl);
          localStorage.setItem('hair_photo_curr', dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="tab-view-container">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      <div className="section-header-bar">
        <h2>📸 Monthly Photo Vault</h2>
        <span className="header-action-badge">Progress Proof</span>
      </div>

      <div className="polaroid-grid">
        <div className="polaroid-slot" onClick={() => triggerUpload('start')}>
          {startPhoto ? (
            <img src={startPhoto} alt="Day 1 Baseline" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          ) : (
            <>
              <span style={{ fontSize: '2rem' }}>🪒</span>
              <span className="slot-tag">Day 1 Baseline</span>
            </>
          )}
        </div>

        <div className="polaroid-slot" onClick={() => triggerUpload('curr')}>
          {currPhoto ? (
            <img src={currPhoto} alt="Current Month" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          ) : (
            <>
              <span style={{ fontSize: '2rem' }}>📷</span>
              <span className="slot-tag">Current Month</span>
            </>
          )}
        </div>
      </div>

      <button 
        className="btn-snap-photo"
        onClick={() => triggerUpload('curr')}
      >
        <Camera size={18} />
        <span>Snap / Upload This Month's Photo</span>
      </button>

      <div className="section-header-bar" style={{ marginTop: '24px' }}>
        <h2>⚙️ App Settings & Actions</h2>
      </div>

      <div className="vault-tools-deck">
        <button className="btn-vault-tool" onClick={handleToggleSound}>
          {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span>Sound: {soundOn ? 'ON' : 'OFF'}</span>
        </button>

        <button className="btn-vault-tool" onClick={handleReset}>
          <RotateCcw size={20} />
          <span>Reset Week</span>
        </button>

        <button className="btn-vault-tool" onClick={() => window.print()}>
          <FileText size={20} />
          <span>Export PDF</span>
        </button>
      </div>
    </div>
  );
}
