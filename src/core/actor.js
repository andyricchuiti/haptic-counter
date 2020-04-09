export class Actor {
  // eslint-disable-next-line class-methods-use-this
  onMessage() {
    throw new Error('no handlers were set for this message');
  }
}

export function hookup(name, actorInstance) {
  const channel = new BroadcastChannel(name);
  channel.addEventListener('message', actorInstance.onMessage.bind(actorInstance));
}

export function lookup(name) {
  return new BroadcastChannel(name);
}
