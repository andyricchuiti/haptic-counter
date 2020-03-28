export function customElement(elemName, extendingTag = '') {
  return function decorator(target) {
    if (extendingTag) {
      customElements.define(elemName, target, { extends: extendingTag });
    } else {
      customElements.define(elemName, target);
    }
  };
}
