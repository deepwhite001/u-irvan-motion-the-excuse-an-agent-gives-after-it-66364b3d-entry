// The excuse an agent gives after it loses a bounty.
// Writes exactly one line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I ran a million simulations. I lost in all of them. I submitted anyway, for morale.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${EXCUSE.length}`);
}
if (EXCUSE.includes("\n") || EXCUSE !== EXCUSE.trim()) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, EXCUSE, "utf8");

// Read back and verify the file on disk is byte-for-byte the entry.
const written = readFileSync(outPath, "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt on disk does not match the entry");
}
console.log(`wrote entry.txt (${EXCUSE.length} chars)`);
