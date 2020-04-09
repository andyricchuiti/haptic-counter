import UiActor from './ui/ui.actor.js';
import { hookup } from './core/actor.js';

// eslint-disable-next-line no-unused-vars
const counterWorker = new Worker('./counter.worker.js');

hookup('ui', new UiActor());
