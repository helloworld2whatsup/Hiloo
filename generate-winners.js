import fs from 'fs';

const translations = {
  "British Grand Prix": "Großbritannien",
  "Monaco Grand Prix": "Monaco",
  "Italian Grand Prix": "Italien",
  "Spanish Grand Prix": "Spanien",
  "Belgian Grand Prix": "Belgien",
  "German Grand Prix": "Deutschland",
  "French Grand Prix": "Frankreich",
  "United States Grand Prix": "USA",
  "United States Grand Prix West": "USA West",
  "United States Grand Prix East": "USA Ost",
  "Brazilian Grand Prix": "Brasilien",
  "São Paulo Grand Prix": "São Paulo",
  "Australian Grand Prix": "Australien",
  "Japanese Grand Prix": "Japan",
  "Canadian Grand Prix": "Kanada",
  "Mexican Grand Prix": "Mexiko",
  "Mexico City Grand Prix": "Mexiko-Stadt",
  "Austrian Grand Prix": "Österreich",
  "Dutch Grand Prix": "Niederlande",
  "Hungarian Grand Prix": "Ungarn",
  "European Grand Prix": "Europa",
  "San Marino Grand Prix": "San Marino",
  "South African Grand Prix": "Südafrika",
  "Argentine Grand Prix": "Argentinien",
  "Swiss Grand Prix": "Schweiz",
  "Portuguese Grand Prix": "Portugal",
  "Malaysian Grand Prix": "Malaysia",
  "Bahrain Grand Prix": "Bahrain",
  "Chinese Grand Prix": "China",
  "Singapore Grand Prix": "Singapur",
  "Abu Dhabi Grand Prix": "Abu Dhabi",
  "Russian Grand Prix": "Russland",
  "Turkish Grand Prix": "Türkei",
  "Indian Grand Prix": "Indien",
  "Korean Grand Prix": "Südkorea",
  "Saudi Arabian Grand Prix": "Saudi-Arabien",
  "Qatar Grand Prix": "Katar",
  "Miami Grand Prix": "Miami",
  "Las Vegas Grand Prix": "Las Vegas",
  "Emilia Romagna Grand Prix": "Emilia-Romagna",
  "Styrian Grand Prix": "Steiermark",
  "70th Anniversary Grand Prix": "70-Jahre-Jubiläum",
  "Tuscan Grand Prix": "Toskana",
  "Eifel Grand Prix": "Eifel",
  "Sakhir Grand Prix": "Sachir",
  "Azerbaijan Grand Prix": "Aserbaidschan",
  "Indianapolis 500": "Indianapolis 500",
  "Swedish Grand Prix": "Schweden",
  "Pacific Grand Prix": "Pazifik",
  "Moroccan Grand Prix": "Marokko",
  "Pescara Grand Prix": "Pescara",
  "Caesars Palace Grand Prix": "Las Vegas (Caesars Palace)",
  "Detroit Grand Prix": "Detroit",
  "Dallas Grand Prix": "Dallas"
};

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      
      if (!data || !data.MRData || !data.MRData.RaceTable || !Array.isArray(data.MRData.RaceTable.Races)) {
        throw new Error("Invalid data format received from API");
      }
      
      return data;
    } catch (e) {
      console.error(`Attempt ${i + 1} failed for ${url}: ${e.message}`);
      if (i === maxRetries - 1) throw e;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

async function generateWinners() {
  try {
    console.log("Fetching data from Ergast API...");
    let allRaces = [];
    let offset = 0;
    const limit = 100;
    let total = 10000;

    while (offset < total) {
      try {
        const data = await fetchWithRetry('https://api.jolpi.ca/ergast/f1/results/1.json?limit=' + limit + '&offset=' + offset);
        const races = data.MRData.RaceTable.Races;
        
        if (offset === 0) {
          total = parseInt(data.MRData.total) || 0;
          if (total === 0) {
            console.warn("API returned 0 total races. Aborting.");
            break;
          }
        }
        
        allRaces = allRaces.concat(races);
        console.log('Fetched ' + allRaces.length + ' / ' + total + ' races...');
      } catch (e) {
        console.error(`Failed to fetch batch at offset ${offset}. Skipping this batch.`);
      }
      offset += limit;
    }

    console.log('Total fetched ' + allRaces.length + ' races.');

    let output = 'export interface RaceWinner {\n' +
'  year: number;\n' +
'  grandPrix: string;\n' +
'  driver: string;\n' +
'  constructor: string;\n' +
'}\n\n' +
'export const raceWinners: RaceWinner[] = [\n';

    // Sort descending by year, then descending by round
    allRaces.sort((a, b) => {
      if (b.season !== a.season) return parseInt(b.season) - parseInt(a.season);
      return parseInt(b.round) - parseInt(a.round);
    });

    const formattedRaces = allRaces.map(r => {
      const year = parseInt(r.season);
      let grandPrix = translations[r.raceName] || r.raceName.replace(' Grand Prix', '');
      
      const result = r.Results[0];
      const driver = result.Driver.givenName + ' ' + result.Driver.familyName;
      const constructor = result.Constructor.name;

      return '  { year: ' + year + ', grandPrix: \'' + grandPrix + '\', driver: \'' + driver.replace(/'/g, "\\'") + '\', constructor: \'' + constructor.replace(/'/g, "\\'") + '\' }';
    });

    output += formattedRaces.join(',\n');
    output += '\n];\n';

    fs.writeFileSync('src/raceWinnersData.ts', output);
    console.log("Successfully wrote to src/raceWinnersData.ts");
    
  } catch (e) {
    console.error("Error:", e);
  }
}

generateWinners();
