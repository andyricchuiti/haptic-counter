import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';
import './ui/haptic-counter.component.js';

let wakeLock;
const counterWorker = new Worker('./counter/counter.worker.js');

document.addEventListener('start-counter', async () => {
  counterWorker.postMessage('start-counter');
  if ('wakeLock' in navigator) {
    wakeLock = await navigator.wakeLock.request('screen');
  }
});

document.addEventListener('stop-counter', () => {
  counterWorker.postMessage('stop-counter');
  if (wakeLock) {
    wakeLock.release();
  }
});

counterWorker.addEventListener('message', () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(200);
  }
});

window.addEventListener('beforeunload', () => {
  counterWorker.postMessage('stop-counter');
  counterWorker.terminate();
  if (wakeLock) {
    wakeLock.release();
  }
});
