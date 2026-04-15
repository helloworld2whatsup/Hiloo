import fs from 'fs';
import path from 'path';

async function verifyImages() {
  const dataPath = path.resolve('src', 'data.ts');
  const content = fs.readFileSync(dataPath, 'utf8');

  const layoutImageRegex = /layoutImage:\s*'([^']+)'/g;
  let match;
  const images = new Set();
  while ((match = layoutImageRegex.exec(content)) !== null) {
    images.add(match[1]);
  }
  
  console.log(`Checking ${images.size} unique images...`);
  
  let broken = 0;
  for (const img of images) {
    try {
      const res = await fetch(img, { method: 'HEAD' });
      if (!res.ok) {
        console.log(`BROKEN: ${img} (${res.status})`);
        broken++;
      }
    } catch (e) {
      console.log(`BROKEN (error): ${img} - ${e.message}`);
      broken++;
    }
  }
  
  console.log(`Done. ${broken} broken images found.`);
}

verifyImages();
