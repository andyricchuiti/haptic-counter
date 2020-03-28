class Counter {
  constructor() {
    this.interval = '';
  }

  start() {
    this.interval = setInterval(this.sendSecond, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  // eslint-disable-next-line class-methods-use-this
  sendSecond() {
    console.log('sending message');
    postMessage('seconds-buzz');
  }
}

const counter = new Counter();

function updateState(ev) {
  if (ev.data === 'start-counter') {
    counter.start();
  } else if (ev.data === 'stop-counter') {
    counter.stop();
  }
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', updateState.bind(self));
