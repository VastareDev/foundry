import { describe, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import sassTrue from 'sass-true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('SCSS tokens & functions', () => {
  const sassTestFiles = globSync(
    path.resolve(__dirname, './scss/**/*.spec.scss')
  );

  for (const file of sassTestFiles) {
    sassTrue.runSass(
      { describe, it },
      file,
      {
        loadPaths: [path.resolve(process.cwd(), 'src/scss')]
      }
    );
  }
});
