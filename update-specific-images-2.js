import fs from 'fs';
import path from 'path';

const map = {
  'Silverstone Circuit 1997 to 1998.png': 'Stark modifiziertes Layout nach den Unfällen von 1994.',
  'Circuit Monza 1922.svg': 'Das ursprüngliche Layout mit dem Hochgeschwindigkeits-Oval.',
  'Circuit Monza 1955 Oval.svg': 'Kombination aus Straßenkurs und Oval.',
  'Circuit Nürburgring-1927-Nordschleife.svg': 'Die legendäre Nordschleife, die "Grüne Hölle".',
  'Circuit Nürburgring-1984-GP.svg': 'Die neue Grand-Prix-Strecke, die die Nordschleife für die Formel 1 ersetzte.',
  'Circuit Hockenheimring 1992-1993.svg': 'Der klassische Hochgeschwindigkeitskurs durch den Wald.',
  'Circuit Catalunya 1991-1994.svg': 'Das klassische Layout mit der schnellen Nissan-Schikane und ohne die letzte Schikane.',
  'Circuit Catalunya 2007.svg': 'Einführung der Schikane im letzten Sektor.',
  'Bahrain International Circuit--Endurance Circuit.svg': 'Das Endurance-Layout, das nur 2010 genutzt wurde.',
  'Hungaroring circuit 1986-1988.svg': 'Das ursprüngliche Layout mit einer Schikane nach Kurve 3.',
  'Hungaroring circuit 1989-2002.svg': 'Die Schikane nach Kurve 3 wurde entfernt.',
  'Autódromo Hermanos Rodríguez 1986-2014.svg': 'Verkürztes Layout, aber immer noch mit der Peraltada.',
  'Singapore Street Circuit 2015.svg': 'Die Singapore Sling Schikane wurde durch eine flüssigere Linkskurve ersetzt.',
  'Circuit Yas-Island.svg': 'Das ursprüngliche Layout mit den engen Schikanen.',
  'Gilles Villeneuve Circuit Montreal (94-95).svg': 'Das ursprüngliche Layout auf der Île Notre-Dame.',
  'Circuit Albert Park 1996.svg': 'Das ursprüngliche Layout im Albert Park.',
  'Imola Circuit 1980-1995 Layout.png': 'Nach den Unfällen von 1994 wurden Schikanen in Tamburello und Villeneuve eingebaut.'
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
