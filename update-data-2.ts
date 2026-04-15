import fs from 'fs';
import https from 'https';

const data = fs.readFileSync('src/data.ts', 'utf-8');
const tracks = [];
const trackChunks = data.split('  {\n    id:');
for (let i = 1; i < trackChunks.length; i++) {
  const match = trackChunks[i].match(/name: '([^']+)'/);
  if (match) {
    tracks.push(match[1]);
  }
}

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
  for (const track of tracks) {
    const url = await fetchSvgUrl(track);
    if (url) {
      results[track] = url as string;
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
