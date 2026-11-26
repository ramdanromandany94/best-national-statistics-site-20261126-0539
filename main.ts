// Statistik Nusantara — entrypoint for the make.fun grader (Node 22+, stdlib only).
//
// What it does: copies this entry's app/ and screenshots/ into /output and
// writes /output/dossier.json with the vendored make.fun library, which the
// judge reads. The vendor file is used unchanged; the dossier is byte for
// byte what the scorer's own copy writes.
//
// Where the files live: the grader runs `node /bot/main.ts` with
// MAKEFUN_BOT_DIR=/bot and MAKEFUN_OUTPUT_DIR=/output, but it does NOT set
// MAKEFUN_INPUT_DIR and its working directory is not /bot — so this program
// never assumes any of those. It looks for app/index.html in, in order:
//   1. the directory this file lives in (import.meta.url),
//   2. MAKEFUN_INPUT_DIR, when set,
//   3. MAKEFUN_BOT_DIR, when set,
//   4. the current working directory.
// The first directory that actually contains app/index.html wins. If none
// does, the run fails loudly instead of handing in an empty output.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cp, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than
// 4 screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files).
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

async function hasAppIndex(dir) {
  try {
    const st = await stat(join(dir, "app", "index.html"));
    return st.isFile();
  } catch {
    return false;
  }
}

async function findEntryDir() {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [here];
  if (process.env.MAKEFUN_INPUT_DIR) candidates.push(resolve(process.env.MAKEFUN_INPUT_DIR));
  if (process.env.MAKEFUN_BOT_DIR) candidates.push(resolve(process.env.MAKEFUN_BOT_DIR));
  candidates.push(resolve("."));
  for (const dir of candidates) {
    if (await hasAppIndex(dir)) return dir;
  }
  throw new Error(
    "Statistik Nusantara: no app/index.html found in any candidate dir: " + candidates.join(", ")
  );
}

async function main() {
  const entry = await findEntryDir();
  await mkdir(OUT, { recursive: true });
  await cp(join(entry, "app"), join(OUT, "app"), { recursive: true });
  await mkdir(join(OUT, "screenshots"), { recursive: true });
  try {
    await cp(join(entry, "screenshots"), join(OUT, "screenshots"), { recursive: true });
  } catch {
    throw new Error("Statistik Nusantara: screenshots/ missing beside main.ts — screenshots are required");
  }
  const dossier = buildDossier(OUT, CAPS);
  await writeFile(join(OUT, "dossier.json"), dossier);
  const shots = JSON.parse(await readFile(join(OUT, "dossier.json"), "utf8"));
  const names = (shots.images ?? []).map((s) => s.name ?? s).join(", ");
  console.log(`Statistik Nusantara: handed in app/ + ${shots.images?.length ?? 0} screenshot(s) [${names}] to ${OUT}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
