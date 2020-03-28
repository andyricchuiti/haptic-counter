import { createDefaultConfig } from '@open-wc/building-rollup';
import OMT from '@surma/rollup-plugin-off-main-thread';
import cpy from 'rollup-plugin-cpy';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const config = createDefaultConfig({ input: './src/index.html' });

export default {
  ...config,
  plugins: [
    ...config.plugins,
    cpy([
      {
        files: './src/manifest.json',
        dest: './dist/',
      },
      {
        files: './src/assets/',
        dest: './dist/assets',
      },
    ]),
    OMT(),
  ],
};
