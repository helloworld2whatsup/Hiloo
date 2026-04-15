import fs from 'fs';
import path from 'path';

async function fixImages() {
  const dataPath = path.resolve('src', 'data.ts');
  let content = fs.readFileSync(dataPath, 'utf8');

  // Match both thumb URLs and any other wikimedia URLs that might be broken
  const regex = /layoutImage:\s*'https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?[^\/]+\/[^\/]+\/([^']+?)(?:\/500px-[^']+)?'/g;
  
  let match;
  const replacements = [];
  const uniqueMatches = new Set();

  while ((match = regex.exec(content)) !== null) {
    uniqueMatches.add(match[0]);
  }

  for (const fullMatch of uniqueMatches) {
    // Extract filename from the match
    const filenameMatch = fullMatch.match(/\/([^\/]+?)(?:\/500px-[^']+)?'$/);
    if (!filenameMatch) continue;
    
    let filename = decodeURIComponent(filenameMatch[1]);
    // If the filename ends with .png but the original was .svg (due to thumb), fix it
    if (fullMatch.includes('/thumb/') && filename.endsWith('.png') && filename.includes('.svg')) {
        filename = filename.replace(/\.svg\.png$/, '.svg');
    }

    console.log(`Checking URL for ${filename}...`);

    try {
      const commonsRes = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&titles=File:${filename}&prop=imageinfo&iiprop=url&format=json`);
      const commonsData = await commonsRes.json();
      const cPages = commonsData.query.pages;
      const cPageId = Object.keys(cPages)[0];
      
      if (cPageId !== '-1' && cPages[cPageId].imageinfo && cPages[cPageId].imageinfo.length > 0) {
          const url = cPages[cPageId].imageinfo[0].url;
          replacements.push({
            old: fullMatch,
            new: `layoutImage: '${url}'`
          });
          console.log(`Found on Commons: ${url}`);
      } else {
          console.log(`Not found on Commons: ${filename}`);
      }
    } catch (e) {
      console.error(`Error fetching ${filename}:`, e.message);
    }
  }

  for (const r of replacements) {
    // Replace all instances of the old string
    content = content.split(r.old).join(r.new);
  }

  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('Done replacing.');
}

fixImages();
