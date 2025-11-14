import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/ts/**/*.test.ts'],
    exclude: ['node_modules', 'tests/scss/**/*.spec.scss']
  },
  resolve: {
    alias: {
      '@scss': path.resolve(process.cwd(), 'src/scss')
    }
  }
});
