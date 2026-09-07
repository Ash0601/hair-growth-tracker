import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Register Service Worker for PWA Offline Support & Auto-Update
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      reg.update().catch(() => {});
    }).catch(() => {});
  });

  let swRefreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!swRefreshing) {
      swRefreshing = true;
      window.location.reload();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) reg.update();
      }).catch(() => {});
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
