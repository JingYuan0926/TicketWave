import { useState, useEffect } from 'react';

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setInstallPrompt(e);
      });

      window.addEventListener('appinstalled', (e) => {
        console.log('PWA was installed');
        if (window.gtag) {
          window.gtag('event', 'pwa_install', {
            'event_category': 'PWA',
            'event_label': 'Install Success'
          });
        }
        setInstalled(true);
        setInstallPrompt(null);
      });
    }
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      if (window.gtag) {
        window.gtag('event', 'pwa_install_accepted', {
          'event_category': 'PWA',
          'event_label': 'Install Prompt Accepted'
        });
      }
    } else {
      console.log('User dismissed the install prompt');
      if (window.gtag) {
        window.gtag('event', 'pwa_install_declined', {
          'event_category': 'PWA',
          'event_label': 'Install Prompt Declined'
        });
      }
    }

    setInstallPrompt(null);
  };

  if (!installPrompt || installed) return null;

  return (
    <button 
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    >
      Add to Home Screen
    </button>
  );
} 