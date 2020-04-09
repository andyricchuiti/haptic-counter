import { createDefaultConfig } from '@open-wc/building-rollup';
import babel from 'rollup-plugin-babel';
import cpy from 'rollup-plugin-cpy';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const config = createDefaultConfig({ input: './src/index.html' });

export default [
  {
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
    ],
  },
  {
    input: './src/counter/counter.worker.js',
    output: {
      dir: './dist/',
      format: 'umd',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
    ],
  },
];
