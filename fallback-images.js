import fs from 'fs';
import path from 'path';

async function fallbackMissingImages() {
  const dataPath = path.resolve('src', 'data.ts');
  let content = fs.readFileSync(dataPath, 'utf8');

  // We need to parse the file to find the missing ones and replace them with the modern layout image of the SAME track.
  // Since parsing TS is hard with regex, let's do this:
  // For each track in the file, find all layoutImage properties.
  // If a layoutImage is a 404 (we can check by fetching it), we replace it with the last layoutImage in that track's layouts array.

  const trackBlocks = content.split('id: \'');
  
  for (let i = 1; i < trackBlocks.length; i++) {
    let block = trackBlocks[i];
    
    // Find all layoutImages in this block
    const layoutImageRegex = /layoutImage:\s*'([^']+)'/g;
    let match;
    const images = [];
    while ((match = layoutImageRegex.exec(block)) !== null) {
      images.push(match[1]);
    }
    
    if (images.length === 0) continue;
    
    const modernImage = images[images.length - 1]; // Assume the last one is the modern one and exists
    
    // Check each image
    for (const img of images) {
      try {
        const res = await fetch(img, { method: 'HEAD' });
        if (!res.ok) {
          console.log(`Replacing broken image: ${img} -> ${modernImage}`);
          block = block.replace(`layoutImage: '${img}'`, `layoutImage: '${modernImage}'`);
        }
      } catch (e) {
        console.log(`Replacing broken image (error): ${img} -> ${modernImage}`);
        block = block.replace(`layoutImage: '${img}'`, `layoutImage: '${modernImage}'`);
      }
    }
    
    trackBlocks[i] = block;
  }

  const finalContent = trackBlocks.join('id: \'');
  fs.writeFileSync(dataPath, finalContent, 'utf8');
  console.log('Done falling back images.');
}

fallbackMissingImages();
