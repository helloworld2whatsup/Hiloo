import fs from 'fs';
import https from 'https';

const tracks = {
  'Autodromo Nazionale Monza': 'Monza Circuit',
  'Autodromo Enzo e Dino Ferrari': 'Imola Circuit',
  'Aintree Circuit': 'Aintree Motor Racing Circuit',
  'Kyalami Grand Prix Circuit': 'Kyalami',
  'Montjuïc Circuit': 'Montjuïc circuit',
  'Autódromo José Carlos Pace': 'Interlagos Circuit',
  'Long Beach Street Circuit': 'Long Beach street circuit',
  'Circuit de Dijon-Prenois': 'Dijon-Prenois',
  'Bugatti Circuit': 'Bugatti Circuit',
  'Detroit Street Circuit': 'Detroit street circuit',
  'Phoenix Street Circuit': 'Phoenix street circuit',
  'Sochi Autodrom': 'Sochi Autodrom',
  'Circuit of The Americas': 'Circuit of the Americas',
  'Suzuka International Racing Course': 'Suzuka Circuit',
  'Circuit Gilles-Villeneuve': 'Circuit Gilles Villeneuve',
  'Autódromo do Estoril': 'Circuito do Estoril',
  'Korean International Circuit': 'Korea International Circuit'
};

async function fetchSvgUrl(trackName: string) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(trackName)}&format=json&pithumbsize=500`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'F1App/1.0 (contact@example.com)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const results: Record<string, string> = {};
  for (const [key, wikiName] of Object.entries(tracks)) {
    const url = await fetchSvgUrl(wikiName);
    if (url) {
      results[key] = url as string;
    }
  }
  
  let newData = fs.readFileSync('src/data.ts', 'utf-8');
  const chunks = newData.split('  {\n    id:');
  for (let i = 1; i < chunks.length; i++) {
    const trackChunk = chunks[i];
    const nameMatch = trackChunk.match(/name: '([^']+)'/);
    if (nameMatch) {
      const trackName = nameMatch[1];
      if (results[trackName]) {
        chunks[i] = trackChunk.replace(/layoutImage: 'https:\/\/api\.dicebear\.com[^']+'/g, `layoutImage: '${results[trackName]}'`);
      }
    }
  }
  
  fs.writeFileSync('src/data.ts', chunks[0] + chunks.slice(1).map(t => '  {\n    id:' + t).join(''));
  console.log('Done updating src/data.ts');
}

main();
