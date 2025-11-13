import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const SRC_DIRS = ['src/scss', 'src/elements'];
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs', 'reference', 'generated');

/**
 * Regex to capture blocks.
 * foundry-docs-start <id> | foundry-docs-end <id>
 */
const DOC_BLOCK_REGEX = /\/\/\s*foundry-docs-start\s+([a-zA-Z0-9\-_]+)[\s\S]*?\/\/\s*foundry-docs-end\s+\1/g;

function collectScssFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes:true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectScssFiles(fullPath));
    } else if (entry.isFile() && fullPath.endsWith('.scss')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractDocsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const blocks = [];

  let match;
  while ((match = DOC_BLOCK_REGEX.exec(content)) !== null) {
    const id = match[1];
    const fullBlock = match[0];

    const lines = fullBlock.split('\n');

    const innerLines = lines.filter(
      (line) =>
        !line.includes('foundry-docs-start') &&
        !line.includes('foundry-docs-end')
    );

    const code = innerLines.join('\n').trim();

    blocks.push({
      id,
      code,
      source: path.relative(ROOT_DIR, filePath)
    });
  }

  return blocks;
}

function run() {
  console.log('[foundry-docs] Extracting SCSS docs...');

  const scssFiles = SRC_DIRS.flatMap((dir) =>
    collectScssFiles(path.join(ROOT_DIR, dir))
  );

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Clean previously generated DOCS.
  for (const entry of fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      fs.unlinkSync(path.join(OUTPUT_DIR, entry.name));
    }
  }

  let totalBlocks = 0;

  for (const file of scssFiles) {
    const blocks = extractDocsFromFile(file);

    for (const block of blocks) {
      totalBlocks += 1;

      const safeId = block.id.replace(/[^a-zA-Z0-9\-_]/g, '-');
      const outPath = path.join(OUTPUT_DIR, `${safeId}.md`);

      const md = [
        `---`,
        `id: ${safeId}`,
        `source: ${block.source}`,
        `---`,
        ``,
        `\`\`\``,
        ``
      ].join('\n');

      fs.writeFileSync(outPath, md, 'utf8');
    }
  }

  console.log(`[foundry-docs] Done. Generated ${totalBlocks} SCSS doc block(s) in ${OUTPUT_DIR}.`);
}

run();
