import fs from 'fs';

const images = JSON.parse(fs.readFileSync('track-images.json', 'utf-8'));

let data = fs.readFileSync('src/data.ts', 'utf-8');

// We need to match the track name to replace its layoutImage.
// The structure is:
// {
//   id: '...',
//   name: 'Track Name',
//   ...
//   layouts: [
//     {
//       ...
//       layoutImage: '...'
//     }
//   ]
// }

const tracks = data.split('  {\n    id:');

for (let i = 1; i < tracks.length; i++) {
  const trackChunk = tracks[i];
  const nameMatch = trackChunk.match(/name: '([^']+)'/);
  if (nameMatch) {
    const trackName = nameMatch[1];
    if (images[trackName]) {
      // Replace all layoutImage in this chunk
      tracks[i] = trackChunk.replace(/layoutImage: 'https:\/\/api\.dicebear\.com[^']+'/g, `layoutImage: '${images[trackName]}'`);
    }
  }
}

const newData = tracks[0] + tracks.slice(1).map(t => '  {\n    id:' + t).join('');
fs.writeFileSync('src/data.ts', newData);
console.log('Updated src/data.ts');
