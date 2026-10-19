// Zero-dependency build: copies src/ to dist/, stamps a build id into the service worker,
// and checks that the inline game script parses.
import { cp, rm, readFile, writeFile, mkdir } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const SRC = 'src';
const OUT = 'dist';

let buildId;
try {
  buildId = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch {
  buildId = Date.now().toString(36);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(SRC, OUT, { recursive: true });

const swPath = `${OUT}/sw.js`;
await writeFile(swPath, (await readFile(swPath, 'utf8')).replaceAll('__BUILD_ID__', buildId));

const html = await readFile(`${OUT}/index.html`, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
if (!scripts.length) throw new Error('index.html has no inline script');
for (const s of scripts) new Function(s); // throws on a syntax error

await writeFile(`${OUT}/.nojekyll`, '');
console.log(`Built ${OUT}/ (build ${buildId}, ${scripts.length} script blocks checked)`);
