import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function isDirectory(absolutePath) {
  try {
    return fs.statSync(absolutePath).isDirectory();
  } catch (_) {
    return false;
  }
}

function ensureDir(absolutePath) {
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
}

function readFileSafe(absolutePath) {
  try {
    return fs.readFileSync(absolutePath, 'utf8');
  } catch (_) {
    return '';
  }
}

function toPosixRelative(from, absoluteTarget) {
  const rel = path.relative(from, absoluteTarget) || '';
  return rel.split(path.sep).join('/');
}

// very lightweight meta extraction from index.ts
function extractMetaFromIndexTs(contents) {
  const meta = {};
  // match name: "..." or '...'
  const nameMatch = contents.match(/\bname\s*:\s*(["'])(.*?)\1/);
  if (nameMatch && nameMatch[2]) meta.name = nameMatch[2];
  const labelMatch = contents.match(/\blabel\s*:\s*(["'])(.*?)\1/);
  if (labelMatch && labelMatch[2]) meta.label = labelMatch[2];
  return meta;
}

function findFirstVueFile(absoluteDir) {
  try {
    const files = fs
      .readdirSync(absoluteDir)
      .filter((f) => f.toLowerCase().endsWith('.vue'))
      .sort();
    return files[0] || null;
  } catch (_) {
    return null;
  }
}

function collectPackages(rootDir, kind) {
  const baseDir = path.join(rootDir, 'lib', kind);
  if (!fs.existsSync(baseDir)) return [];

  const entries = fs.readdirSync(baseDir).filter((name) => {
    const abs = path.join(baseDir, name);
    return isDirectory(abs);
  });

  const results = [];
  for (const entryName of entries) {
    const absDir = path.join(baseDir, entryName);
    const indexTs = path.join(absDir, 'index.ts');
    if (!fs.existsSync(indexTs)) continue;

    const indexContents = readFileSafe(indexTs);
    // const meta = extractMetaFromIndexTs(indexContents);

    const vueFile = findFirstVueFile(absDir);
    const relDir = toPosixRelative(rootDir, absDir);
    const relIndex = toPosixRelative(rootDir, indexTs);
    const relVue = vueFile ? toPosixRelative(rootDir, path.join(absDir, vueFile)) : null;

    const name = entryName;
    // const description = meta.label || meta.name || `自动发现的${kind === 'components' ? '组件' : '页面'}`;

    const files = [];
    if (relVue) files.push({ name: path.basename(relVue), path: relVue });
    files.push({ name: 'index.ts', path: relIndex });

    results.push({
      name,
      // description,
      path: relDir,
      buildInfo: null,
      files,
    });
  }

  results.sort((a, b) => a.name.localeCompare(b.name));
  return results;
}

function main() {
  const projectRoot = path.join(__dirname, '..');
  const outDir = path.join(projectRoot, 'public');
  ensureDir(outDir);

  const components = collectPackages(projectRoot, 'components');
  const pages = collectPackages(projectRoot, 'pages');

  const output = {
    generatedAt: new Date().toISOString(),
    components,
    pages,
  };

  const outFile = path.join(outDir, 'discovered.json');
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ Discovered ${components.length} components and ${pages.length} pages`);
  console.log(`📝 Output: ${outFile}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };


