import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';
import './haptic-counter/haptic-counter.component.js';
import { Actor, lookup } from '../core/actor.js';

export default class UiActor extends Actor {
  constructor() {
    super();
    this.app = document.createElement('haptic-counter');
    document.body.appendChild(this.app);
    this.counter = lookup('counter');
    this.wakeLock = null;
    this.app.addEventListener('start-counter', this.startCounter.bind(this));
    this.app.addEventListener('stop-counter', this.stopCounter.bind(this));
  }

  async startCounter() {
    if ('wakeLock' in navigator) {
      this.wakeLock = await navigator.wakeLock.request('screen');
    }

    this.counter.postMessage('start-counter');
  }

  stopCounter() {
    if (this.wakeLock) {
      this.wakeLock.release();
    }

    this.counter.postMessage('stop-counter');
  }

  // eslint-disable-next-line class-methods-use-this
  onMessage(ev) {
    if ('vibrate' in navigator) {
      const pattern = ev.data === 'seconds-buzz' ? 50 : [50, 50, 50];
      navigator.vibrate(pattern);
    }
  }
}
