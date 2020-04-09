export function debug() {
  return function debugDecorator(targetClass, propertyKey, descriptor) {
    const original = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function debugDescriptor() {
      // eslint-disable-next-line no-restricted-globals
      if (self.location.host.includes('localhost')) {
        // eslint-disable-next-line no-console,prefer-rest-params
        console.log(`${targetClass.constructor.name}::${propertyKey} called with`, ...arguments);
      }
      // eslint-disable-next-line prefer-rest-params
      original.apply(this, arguments);
    };
    return descriptor;
  };
}
