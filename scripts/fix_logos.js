import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedFile = path.join(__dirname, '../src/lib/seed-data.ts');

async function fix() {
  let content = await fs.readFile(seedFile, 'utf8');
  content = content.replace(/logo_url:\s*['"][^'"]+['"]/g, 'logo_url: null');
  await fs.writeFile(seedFile, content, 'utf8');
  console.log('Fixed logo_urls to null');
}
fix();
