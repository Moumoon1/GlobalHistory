import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const epubPath = resolve(process.argv[2] ?? "");
const outputDir = resolve(process.argv[3] ?? "data/sources/global-history");

function unzipFile(entryPath) {
  const result = spawnSync("unzip", ["-p", epubPath, entryPath], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || `Could not read ${entryPath}`);
  }

  return result.stdout;
}

function decodeEntities(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  )
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function parseMetadata(opf) {
  const get = (tag) => opf.match(new RegExp(`<dc:${tag}[^>]*>([\\s\\S]*?)<\\/dc:${tag}>`))?.[1]?.trim();

  return {
    title: decodeEntities(get("title") ?? ""),
    creator: decodeEntities(get("creator") ?? ""),
    publisher: decodeEntities(get("publisher") ?? ""),
    date: decodeEntities(get("date") ?? ""),
    identifier: decodeEntities(get("identifier") ?? "")
  };
}

function parseNavPoints(ncx) {
  const navPoints = [];
  const tagRegex = /<(\/?)navPoint\b[^>]*>|<text>([\s\S]*?)<\/text>|<content\s+src="([^"]+)"/g;
  const stack = [];
  let match;

  while ((match = tagRegex.exec(ncx))) {
    if (match[0].startsWith("<navPoint")) {
      stack.push({ title: "", src: "", level: stack.length + 1 });
      continue;
    }

    if (match[0].startsWith("</navPoint")) {
      const current = stack.pop();
      if (current?.title && current?.src) {
        navPoints.push({
          id: `toc-${navPoints.length + 1}`,
          title: decodeEntities(current.title),
          src: current.src,
          file: current.src.split("#")[0],
          anchor: current.src.split("#")[1] ?? null,
          level: current.level
        });
      }
      continue;
    }

    const current = stack.at(-1);
    if (!current) continue;

    if (match[2]) current.title = match[2].trim();
    if (match[3]) current.src = match[3].trim();
  }

  return navPoints;
}

if (!epubPath || !existsSync(epubPath)) {
  throw new Error(`EPUB not found: ${epubPath}`);
}

const opf = unzipFile("OEBPS/content.opf");
const ncx = unzipFile("OEBPS/toc.ncx");
const metadata = parseMetadata(opf);
const navPoints = parseNavPoints(ncx);
const textFiles = [...new Set(navPoints.map((point) => point.file))]
  .filter((file) => file.startsWith("Text/") && file.endsWith(".xhtml"))
  .sort();

mkdirSync(outputDir, { recursive: true });
mkdirSync(join(outputDir, "text"), { recursive: true });

const extractedFiles = textFiles.map((file) => {
  const text = stripHtml(unzipFile(`OEBPS/${file}`));
  const textFile = join("text", `${basename(file, ".xhtml")}.txt`);
  writeFileSync(join(outputDir, textFile), `${text}\n`);

  return {
    file,
    textFile,
    charCount: text.length
  };
});

const outline = {
  sourceFile: epubPath,
  extractedAt: new Date().toISOString(),
  metadata,
  navPoints,
  files: extractedFiles
};

writeFileSync(join(outputDir, "outline.json"), `${JSON.stringify(outline, null, 2)}\n`);

const outlineMarkdown = [
  `# ${metadata.title || "EPUB Outline"}`,
  "",
  `- Creator: ${metadata.creator || ""}`,
  `- Publisher: ${metadata.publisher || ""}`,
  `- Date: ${metadata.date || ""}`,
  `- Text files: ${extractedFiles.length}`,
  "",
  "## Table of Contents",
  "",
  ...navPoints.map(
    (point) =>
      `${"  ".repeat(Math.max(0, point.level - 1))}- ${point.title} (${point.src})`
  )
].join("\n");

writeFileSync(join(outputDir, "outline.md"), `${outlineMarkdown}\n`);

console.log(`Extracted ${extractedFiles.length} text files.`);
console.log(`Outline: ${join(outputDir, "outline.json")}`);
