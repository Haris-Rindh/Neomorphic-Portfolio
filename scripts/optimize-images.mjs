/**
 * Pre-process script: Resize all PNG images in src/assets/ to max 1200px wide
 * and convert to WebP format for dramatically smaller file sizes.
 * 
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '..', 'src', 'assets');
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 78;

async function optimizeImages() {
  const files = readdirSync(ASSETS_DIR).filter(f => extname(f).toLowerCase() === '.png');
  
  console.log(`Found ${files.length} PNG files to optimize...\n`);
  
  for (const file of files) {
    const inputPath = join(ASSETS_DIR, file);
    const outputName = basename(file, '.png') + '.webp';
    const outputPath = join(ASSETS_DIR, outputName);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      const originalSize = (await sharp(inputPath).toBuffer()).length;
      
      const result = await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);
      
      const savings = ((1 - result.size / originalSize) * 100).toFixed(1);
      console.log(`✅ ${file} → ${outputName}`);
      console.log(`   ${(originalSize / 1024).toFixed(0)}KB → ${(result.size / 1024).toFixed(0)}KB (${savings}% smaller)`);
      console.log(`   ${metadata.width}x${metadata.height} → ${result.width}x${result.height}\n`);
    } catch (err) {
      console.error(`❌ Failed to optimize ${file}:`, err.message);
    }
  }
  
  console.log('Done! Now update your imports to use .webp files.');
}

optimizeImages();
