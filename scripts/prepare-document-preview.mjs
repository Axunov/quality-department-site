import { cp, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const source = dirname(require.resolve("pdfjs-dist/package.json"));
const assets = "public/document-preview-engine";
await mkdir(assets, { recursive: true });
await Promise.all([
  cp(join(source, "build", "pdf.worker.min.mjs"), join(assets, "pdf.worker.mjs")),
  ...["cmaps", "standard_fonts", "wasm", "iccs", "LICENSE"].map(name => cp(join(source, name), join(assets, name), { recursive: true })),
]);
