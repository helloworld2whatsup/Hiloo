import fs from 'fs';
import https from 'https';

const tracks = [
  'Silverstone Circuit', 'Autodromo Nazionale di Monza', 'Circuit de Monaco', 'Circuit de Spa-Francorchamps',
  'Red Bull Ring', 'Autodromo Enzo e Dino Ferrari', 'Nürburgring', 'Circuit Zandvoort',
  'Autódromo Juan y Oscar Gálvez', 'Aintree Motor Racing Circuit', 'Pescara Circuit', 'Ain-Diab Circuit',
  'AVUS', 'Sebring International Raceway', 'Riverside International Raceway', 'Watkins Glen International',
  'Prince George Circuit', 'Kyalami Grand Prix Circuit', 'Montjuïc circuit', 'Hockenheimring',
  'Circuit Paul Ricard', 'Nivelles-Baulers', 'Circuit Zolder', 'Anderstorp Raceway',
  'Autódromo José Carlos Pace', 'Long Beach street circuit', 'Fuji Speedway', 'Dijon-Prenois',
  'Bugatti Circuit', 'Detroit street circuit', 'Phoenix street circuit', 'Autódromo Hermanos Rodríguez',
  'Circuit de Barcelona-Catalunya', 'Sepang International Circuit', 'Indianapolis Motor Speedway', 'Bahrain International Circuit',
  'Shanghai International Circuit', 'Istanbul Park', 'Marina Bay Street Circuit', 'Sochi Autodrom',
  'Circuit of the Americas', 'Baku City Circuit', 'Miami International Autodrome', 'Las Vegas Strip Circuit',
  'Losail International Circuit', 'Jeddah Corniche Circuit', 'Suzuka International Racing Course', 'Hungaroring',
  'Circuit Gilles Villeneuve', 'Albert Park Circuit', 'Yas Marina Circuit', 'Autódromo do Estoril',
  'Circuit de Nevers Magny-Cours', 'Adelaide Street Circuit', 'Donington Park', 'Korea International Circuit',
  'Buddh International Circuit', 'Valencia Street Circuit'
];

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
  fs.writeFileSync('track-images.json', JSON.stringify(results, null, 2));
  console.log('Done');
}

main();
