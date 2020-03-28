import './ui/haptic-counter.component.js';

const counterWorker = new Worker('./counter/counter.worker.js');

document.addEventListener('start-counter', () => {
  counterWorker.postMessage('start-counter');
});

document.addEventListener('stop-counter', () => {
  counterWorker.postMessage('stop-counter');
});

counterWorker.addEventListener('message', () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(200);
  }
});
