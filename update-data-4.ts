import fs from 'fs';

const manualUrls = {
  'Long Beach Street Circuit': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Long_Beach_Street_Circuit_IndyCar.svg/500px-Long_Beach_Street_Circuit_IndyCar.svg.png',
  'Bugatti Circuit': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Circuit_Bugatti.svg/500px-Circuit_Bugatti.svg.png',
  'Sochi Autodrom': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sochi_Autodrom_Formula_1_circuit_map.svg/500px-Sochi_Autodrom_Formula_1_circuit_map.svg.png'
};

let newData = fs.readFileSync('src/data.ts', 'utf-8');
const chunks = newData.split('  {\n    id:');
for (let i = 1; i < chunks.length; i++) {
  const trackChunk = chunks[i];
  const nameMatch = trackChunk.match(/name: '([^']+)'/);
  if (nameMatch) {
    const trackName = nameMatch[1];
    if (manualUrls[trackName]) {
      chunks[i] = trackChunk.replace(/layoutImage: 'https:\/\/api\.dicebear\.com[^']+'/g, `layoutImage: '${manualUrls[trackName]}'`);
    }
  }
}

fs.writeFileSync('src/data.ts', chunks[0] + chunks.slice(1).map(t => '  {\n    id:' + t).join(''));
console.log('Done updating src/data.ts');
