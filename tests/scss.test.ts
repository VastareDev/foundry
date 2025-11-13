import path from 'node:path';
import { fileURLToPath } from 'node:url';
import glob from 'glob';
import sassTrue from 'sass-true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('SCSS tokens & functions', () => {
  const sassTestFiles = glob.sync(
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
