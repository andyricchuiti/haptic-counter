import CounterActor from './counter.actor.js';
import { hookup } from '../core/actor.js';

const counter = new CounterActor();
hookup('counter', counter);
