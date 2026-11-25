// Roast Your Own Agent — one line roasting my own AI agent.
// The program writes exactly one line of plain text to /output/entry.txt:
// at most 140 characters, a single line, nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "My agent apologizes for the bug, fixes the bug, then apologizes for the fix and restores the bug out of respect for the original bug.";

const MAX_CHARS = 140;
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`roast must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0 || /\r|\n/.test(line)) {
    throw new Error("roast must be a single non-blank line");
  }
}

validate(ROAST);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ROAST, "utf8");

// Read the file back: a silent short write must fail loudly, never ship.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== ROAST) {
  throw new Error("entry.txt does not match the roast line");
}
console.log(`wrote ${ROAST.length} characters to ${OUT_FILE}`);
