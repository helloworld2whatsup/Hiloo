import fs from 'fs';
import path from 'path';

const map = {
  'Imola 1980.jpg': 'Das extrem schnelle Layout mit der Vollgas-Tamburello-Kurve.',
};

async function updateSpecificImages() {
  const dataPath = path.resolve('src', 'data.ts');
  let content = fs.readFileSync(dataPath, 'utf8');

  for (const [filename, description] of Object.entries(map)) {
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`);
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
        let url = pages[pageId].imageinfo[0].url;
        
        const escapedDescription = description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(description:\\s*'${escapedDescription}',\\s*layoutImage:\\s*')[^']+(')`);
        if (regex.test(content)) {
          content = content.replace(regex, `$1${url}$2`);
          console.log(`Updated image for: ${description}`);
        } else {
          console.log(`Description not found in data.ts: ${description}`);
        }
      } else {
        // Try commons
        const cRes = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`);
        const cData = await cRes.json();
        const cPages = cData.query.pages;
        const cPageId = Object.keys(cPages)[0];
        if (cPageId !== '-1' && cPages[cPageId].imageinfo && cPages[cPageId].imageinfo.length > 0) {
          let url = cPages[cPageId].imageinfo[0].url;
          const escapedDescription = description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(description:\\s*'${escapedDescription}',\\s*layoutImage:\\s*')[^']+(')`);
          if (regex.test(content)) {
            content = content.replace(regex, `$1${url}$2`);
            console.log(`Updated image for: ${description}`);
          } else {
            console.log(`Description not found in data.ts: ${description}`);
          }
        } else {
          console.log(`File not found anywhere: ${filename}`);
        }
      }
    } catch (e) {
      console.error(`Error processing ${filename}:`, e.message);
    }
  }

  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('Done updating specific images.');
}

updateSpecificImages();
