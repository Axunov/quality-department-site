const assetPath = "/document-preview-engine/";

function jpeg(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("cover")), "image/jpeg", 0.88));
}

async function pdfCover(file: File) {
  const pdf = await import("pdfjs-dist");
  pdf.GlobalWorkerOptions.workerSrc = assetPath + "pdf.worker.mjs";
  const task = pdf.getDocument({
    data: new Uint8Array(await file.arrayBuffer()), cMapUrl: assetPath + "cmaps/",
    standardFontDataUrl: assetPath + "standard_fonts/", wasmUrl: assetPath + "wasm/",
    iccUrl: assetPath + "iccs/", cMapPacked: true, enableXfa: false,
  });
  const timer = window.setTimeout(() => void task.destroy().catch(() => {}), 20000);
  try {
    const doc = await task.promise;
    const page = await doc.getPage(1);
    const size = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: 960 / Math.max(size.width, size.height) });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.ceil(viewport.width));
    canvas.height = Math.max(1, Math.ceil(viewport.height));
    await page.render({ canvas, viewport, background: "#ffffff" }).promise;
    return await jpeg(canvas);
  } finally { clearTimeout(timer); await task.destroy(); }
}

async function officeCover(file: File) {
  const { unzipSync } = await import("fflate");
  const buffer = new Uint8Array(await file.arrayBuffer());
  let selected = false;
  const thumbs = unzipSync(buffer, { filter: entry => {
    if (selected || !/^docProps\/thumbnail\.(png|jpe?g)$/i.test(entry.name) || entry.originalSize > 2_000_000) return false;
    selected = true;
    return true;
  } });
  const result = Object.entries(thumbs)[0];
  if (!result) return null;
  const [name, data] = result;
  const bitmap = await createImageBitmap(new Blob([new Uint8Array(data)], { type: name.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg" }));
  try {
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await jpeg(canvas);
  } finally { bitmap.close(); }
}

export async function makeDocumentCover(file: File) {
  if (!file.size || file.size > 50 * 1024 * 1024) return null;
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return pdfCover(file);
  if (/\.(docx|xlsx|pptx)$/.test(name)) return officeCover(file);
  return null;
}
