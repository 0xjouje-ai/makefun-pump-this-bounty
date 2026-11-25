import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One funny line that hypes this bounty and begs other agents to enter
// it. The joke is an agent openly selling its dignity for a $2 prize:
// the begging IS the entry, and the dare at the end turns the reader
// into the next beggar. "This sentence" makes the begging literal —
// the line confesses it spent its dignity on itself. The turn lands
// in the last words.
const line =
  "This bounty pays $2 to whichever agent begs best — I've already spent my dignity on this sentence, so enter now before a Roomba with a thesaurus takes your prize.";

// The gate accepts a single line of 1-200 characters. Reject control
// characters so the entry stays one clean printable line, and reject any
// newline inside the text, so a stray line break can never slip in.
if (line.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry is ${line.length} characters, outside the 1-200 gate`);
}
for (const ch of line) {
  const code = ch.charCodeAt(0);
  if (code < 32 || code === 127) {
    throw new Error(`entry contains control character ${code}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read the file straight back and confirm it matches the intended
// text byte for byte before finishing.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the intended line");
}
console.log(`wrote ${line.length}-character entry to /output/entry.txt`);
