import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedFile = path.join(__dirname, '../src/lib/seed-data.ts');
const logosDir = path.join(__dirname, '../public/logos');

async function downloadLogos() {
  await fs.mkdir(logosDir, { recursive: true });
  
  let content = await fs.readFile(seedFile, 'utf8');
  
  const toolRegex = /slug:\s*['"]([^'"]+)['"][^}]*?website_url:\s*['"]([^'"]+)['"]/g;
  const matches = [...content.matchAll(toolRegex)];
  
  for (const match of matches) {
    const slug = match[1];
    let websiteUrl = match[2];
    
    // Check if logo_url is already /logos/...
    const logoRegex = new RegExp(`slug:\\s*['"]${slug}['"][^}]*?logo_url:\\s*['"]([^'"]+)['"]`);
    const logoMatch = content.match(logoRegex);
    if (logoMatch && logoMatch[1].startsWith('/logos/')) continue;
    
    try {
      const urlObj = new URL(websiteUrl);
      let hostname = urlObj.hostname;
      if (hostname.startsWith('www.')) hostname = hostname.slice(4);
      
      const clearbitUrl = `https://logo.clearbit.com/${hostname}`;
      console.log(`Downloading ${slug} from ${clearbitUrl}`);
      
      const response = await fetch(clearbitUrl);
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const buffer = await response.arrayBuffer();
      const ext = 'png'; // clearbit returns png
      
      const fileName = `${slug}.${ext}`;
      const destPath = path.join(logosDir, fileName);
      
      await fs.writeFile(destPath, Buffer.from(buffer));
      
      const localUrl = `/logos/${fileName}`;
      if (logoMatch) {
        content = content.replace(logoMatch[1], localUrl);
        console.log(`Saved to ${localUrl}`);
      }
    } catch (e) {
      console.error(`Failed to download ${slug}:`, e.message);
    }
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  await fs.writeFile(seedFile, content, 'utf8');
  console.log('seed-data.ts updated!');
}

downloadLogos();
