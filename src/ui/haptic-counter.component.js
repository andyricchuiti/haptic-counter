import { html, LitElement } from 'lit-element';
import { customElement } from './decorators/custom-element.decorator.js';
import { debug } from './decorators/debug.decorator.js';
import { style } from './haptic-counter.style.js';

@customElement('haptic-counter')
// eslint-disable-next-line no-unused-vars
class HapticCounter extends LitElement {
  constructor() {
    super();
    this.isCounting = false;
  }

  static get properties() {
    return {
      isCounting: { type: Boolean },
    };
  }

  static get styles() {
    return style;
  }

  render() {
    return html`
      <pwa-install-button></pwa-install-button>
      <div role="main">
        <button type="button" @click="${this.toggleHaptic}">
          ${this.isCounting ? 'Stop' : 'Start'}
        </button>
      </div>
      <pwa-update-available></pwa-update-available>
    `;
  }

  @debug()
  toggleHaptic() {
    this.isCounting = !this.isCounting;
    const ev = this.isCounting ? new CustomEvent('start-counter') : new CustomEvent('stop-counter');
    document.dispatchEvent(ev);
  }
}
