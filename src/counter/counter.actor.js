import { Actor, lookup } from '../core/actor.js';
import { debug } from '../ui/decorators/debug.decorator.js';

export default class CounterActor extends Actor {
  constructor() {
    super();
    this.interval = '';
    this.counter = this.constructor.resetCounter();
    this.ui = lookup('ui');
  }

  @debug()
  start() {
    this.counter = this.constructor.resetCounter();
    this.interval = setInterval(this.sendSecond.bind(this), 1000);
  }

  @debug()
  stop() {
    clearInterval(this.interval);
  }

  static resetCounter() {
    return 0;
  }

  @debug()
  sendSecond() {
    this.counter += 1;
    this.ui.postMessage(this.counter % 60 === 0 ? 'minutes-buzz' : 'seconds-buzz');
  }

  // eslint-disable-next-line class-methods-use-this
  onMessage(ev) {
    switch (ev.data.toLowerCase()) {
      case 'start-counter':
        this.start();
        break;
      case 'stop-counter':
        this.stop();
        break;
      default:
    }
  }
}
