import fs from 'fs';
import path from 'path';

const map = {
  'Silverstone Circuit 1997 to 1998.png': 'Das stark modifizierte Layout der 90er und 2000er Jahre.',
  'Circuit Monza 1922.svg': 'Das ursprüngliche Layout ohne Schikanen und ohne Steilkurve.',
  'Circuit Monza 1955 Oval.svg': 'Das kombinierte Layout mit der berühmten Steilkurve (Banking).',
  'Circuit Nürburgring-1927-Nordschleife.svg': 'Die legendäre Nordschleife, die "Grüne Hölle".',
  'Circuit Nürburgring-1984-GP.svg': 'Die neue Grand-Prix-Strecke, die die Nordschleife für die Formel 1 ersetzte.',
  'Circuit Hockenheimring 1992-1993.svg': 'Der klassische Hochgeschwindigkeitskurs durch den Wald.'
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
        
        const regex = new RegExp(`(description:\\s*'${description}',\\s*layoutImage:\\s*')[^']+(')`);
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
          const regex = new RegExp(`(description:\\s*'${description}',\\s*layoutImage:\\s*')[^']+(')`);
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
