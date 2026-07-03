import { readFile, writeFile, readdir, stat } from "node:fs/promises"
import { join, extname } from "node:path"
import sharp from "sharp"
import { optimize } from "svgo"

const PUBLIC_DIR = "public"
const QUALITY_JPG = 82
const QUALITY_PNG = 80
const QUALITY_WEBP = 80

const imageExtensions = new Set([".jpg", ".jpeg", ".JPG", ".png", ".svg"])

function isImage(file) {
  return imageExtensions.has(extname(file))
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(fullPath)
    } else if (entry.isFile() && isImage(entry.name)) {
      yield fullPath
    }
  }
}

async function optimizeImage(filePath) {
  const ext = extname(filePath)
  const stats = await stat(filePath)
  const originalSize = stats.size

  if (ext === ".svg") {
    const content = await readFile(filePath, "utf-8")
    const result = optimize(content, {
      multipass: true,
      plugins: [
        "preset-default",
        "removeDimensions",
        "sortAttrs",
      ],
    })
    await writeFile(filePath, result.data, "utf-8")
    const newSize = Buffer.byteLength(result.data, "utf-8")
    const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    console.log(`  SVG  ${(originalSize / 1024).toFixed(1)}K → ${(newSize / 1024).toFixed(1)}K  (-${saved}%)`)
    return
  }

  let pipeline = sharp(filePath)

  if (ext === ".png") {
    pipeline = pipeline.png({ palette: true, quality: QUALITY_PNG })
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true, progressive: true })
  }

  const buffer = await pipeline.toBuffer()
  await writeFile(filePath, buffer)

  const newSize = buffer.length
  const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1)
  const extLabel = ext.toUpperCase().replace(".", "")
  console.log(`  ${extLabel} ${(originalSize / 1024 / 1024).toFixed(2)}M → ${(newSize / 1024 / 1024).toFixed(2)}M  (-${saved}%)`)
}

async function generateWebP(filePath) {
  const ext = extname(filePath)
  if (ext === ".svg") return

  const webpPath = filePath.replace(/\.[^.]+$/, ".webp")
  const stats = await stat(filePath)
  const originalSize = stats.size

  const buffer = await sharp(filePath)
    .webp({ quality: QUALITY_WEBP, effort: 6 })
    .toBuffer()

  await writeFile(webpPath, buffer)
  const newSize = buffer.length
  const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1)
  console.log(`  WEBP ${(originalSize / 1024 / 1024).toFixed(2)}M → ${(newSize / 1024 / 1024).toFixed(2)}M  (-${saved}%)`)
}

async function main() {
  console.log("\n🔍 Scanning images in public/...\n")
  const images = []
  for await (const filePath of walk(PUBLIC_DIR)) {
    images.push(filePath)
  }

  console.log(`Found ${images.length} images\n`)

  console.log("📦 Optimizing originals...")
  for (const img of images) {
    const relPath = img.replace(PUBLIC_DIR + "/", "")
    console.log(`  ${relPath}`)
    await optimizeImage(img)
  }

  console.log("\n🌐 Generating WebP versions...")
  for (const img of images) {
    const relPath = img.replace(PUBLIC_DIR + "/", "")
    console.log(`  ${relPath}`)
    await generateWebP(img)
  }

  console.log("\n✅ Done!\n")
}

main().catch(console.error)
