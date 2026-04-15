import fs from 'fs';

const dataPath = 'src/data.ts';
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const driverRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'[\s\S]*?imageUrl:\s*'https:\/\/picsum\.photos[^']+'/g;
const matches = [...dataContent.matchAll(driverRegex)];

console.log(`Found ${matches.length} drivers needing images.`);

async function fetchImagesBatch(names: string[], lang: string, suffix: string = ''): Promise<Record<string, string>> {
  if (names.length === 0) return {};
  const titles = names.map(n => encodeURIComponent(n + suffix)).join('|');
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=pageimages&format=json&pithumbsize=500`;
  
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'F1App/1.0' } });
    const json = await res.json();
    const pages = json.query?.pages || {};
    const results: Record<string, string> = {};
    for (const pageId in pages) {
      const page = pages[pageId];
      if (page.title && page.thumbnail?.source) {
        // Remove suffix for matching
        let originalName = page.title;
        if (suffix) {
          originalName = originalName.replace(suffix, '');
        }
        results[originalName.toLowerCase()] = page.thumbnail.source;
      }
    }
    return results;
  } catch (e) {
    return {};
  }
}

async function main() {
  const batchSize = 30;
  let updatedCount = 0;

  for (let i = 0; i < matches.length; i += batchSize) {
    const batch = matches.slice(i, i + batchSize);
    const names = batch.map(m => m[2]);
    console.log(`Fetching batch ${i / batchSize + 1} / ${Math.ceil(matches.length / batchSize)}...`);
    
    let images = await fetchImagesBatch(names, 'en');
    
    let missingNames = names.filter(n => !images[n.toLowerCase()]);
    if (missingNames.length > 0) {
      const deImages = await fetchImagesBatch(missingNames, 'de');
      images = { ...images, ...deImages };
    }

    missingNames = names.filter(n => !images[n.toLowerCase()]);
    if (missingNames.length > 0) {
      const enImagesSuffix = await fetchImagesBatch(missingNames, 'en', ' (racing driver)');
      images = { ...images, ...enImagesSuffix };
    }

    missingNames = names.filter(n => !images[n.toLowerCase()]);
    if (missingNames.length > 0) {
      const deImagesSuffix = await fetchImagesBatch(missingNames, 'de', ' (Rennfahrer)');
      images = { ...images, ...deImagesSuffix };
    }
    
    // Update content
    for (const match of batch) {
      const id = match[1];
      const name = match[2];
      const imageUrl = images[name.toLowerCase()];
      
      if (imageUrl) {
        const safeName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const replaceRegex = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'${safeName}'[\\s\\S]*?imageUrl:\\s*')https:\\/\\/picsum\\.photos[^']+(')`);
        dataContent = dataContent.replace(replaceRegex, `$1${imageUrl}$2`);
        updatedCount++;
      }
    }
  }
  
  fs.writeFileSync(dataPath, dataContent);
  console.log(`Done! Updated ${updatedCount} driver images.`);
}

main();
