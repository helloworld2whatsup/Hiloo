import fs from 'fs';
import https from 'https';
import path from 'path';

const currentYear = new Date().getFullYear();

async function fetchJson(url: string, maxRetries = 3): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const data = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
            return reject(new Error(`HTTP error! status: ${res.statusCode}`));
          }
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              if (!parsed || !parsed.MRData || !parsed.MRData.StandingsTable) {
                return reject(new Error("Invalid data format received from API"));
              }
              resolve(parsed);
            } catch (e) {
              reject(new Error(`Failed to parse JSON: ${(e as Error).message}`));
            }
          });
        }).on('error', reject);
      });
      return data;
    } catch (e) {
      console.error(`Attempt ${i + 1} failed for ${url}: ${(e as Error).message}`);
      if (i === maxRetries - 1) throw e;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

async function main() {
  const driversMap = new Map<string, any>();

  console.log('Fetching driver standings for all years...');
  for (let year = 1950; year <= currentYear; year++) {
    try {
      const data = await fetchJson(`https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json?limit=100`);
      const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

      for (const standing of standings) {
        const driver = standing.Driver;
        const constructors = standing.Constructors.map((c: any) => c.name);
        const wins = parseInt(standing.wins, 10);
        const position = parseInt(standing.position, 10);

        if (!driversMap.has(driver.driverId)) {
          driversMap.set(driver.driverId, {
            id: driver.driverId,
            name: `${driver.givenName} ${driver.familyName}`,
            nationality: driver.nationality,
            birthDate: driver.dateOfBirth,
            f1Start: year,
            f1End: year,
            teams: new Set(constructors),
            stats: { races: 0, wins: 0, podiums: 0, poles: 0, titles: 0 },
            highlights: ['Formel 1 Fahrer'],
            imageUrl: `https://picsum.photos/seed/${driver.driverId}/400/500`
          });
        }

        const d = driversMap.get(driver.driverId);
        d.f1End = year;
        for (const c of constructors) d.teams.add(c);
        d.stats.wins += wins;
        if (position === 1) d.stats.titles += 1;
      }
      console.log(`Fetched ${year}`);
    } catch (e) {
      console.error(`Error fetching ${year}:`, e);
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  // Convert sets to arrays and format teams
  const newDrivers = Array.from(driversMap.values()).map(d => ({
    ...d,
    f1End: d.f1End === currentYear ? 'aktiv' : d.f1End,
    teams: Array.from(d.teams)
  }));

  // Read existing drivers to avoid duplicates
  const dataTsPath = path.join(process.cwd(), 'src', 'data.ts');
  let dataTsContent = fs.readFileSync(dataTsPath, 'utf-8');

  // Extract existing driver IDs
  const existingIdsMatch = dataTsContent.match(/id:\s*'([^']+)'/g);
  const existingIds = new Set(existingIdsMatch?.map(m => m.match(/'([^']+)'/)[1]) || []);

  const driversToAdd = newDrivers.filter(d => !existingIds.has(d.id));

  console.log(`Adding ${driversToAdd.length} new drivers...`);

  if (driversToAdd.length > 0) {
    const driversStr = driversToAdd.map(d => `  {
    id: '${d.id}',
    name: '${d.name.replace(/'/g, "\\'")}',
    nationality: '${d.nationality}',
    birthDate: '${d.birthDate}',
    f1Start: ${d.f1Start},
    f1End: ${typeof d.f1End === 'string' ? `'${d.f1End}'` : d.f1End},
    teams: [${d.teams.map((t: string) => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    stats: { races: ${d.stats.races}, wins: ${d.stats.wins}, podiums: ${d.stats.podiums}, poles: ${d.stats.poles}, titles: ${d.stats.titles} },
    highlights: ['Formel 1 Fahrer'],
    imageUrl: '${d.imageUrl}'
  }`).join(',\n');

    // Insert into data.ts
    const insertIndex = dataTsContent.indexOf('export const drivers: Driver[] = [') + 'export const drivers: Driver[] = ['.length;
    dataTsContent = dataTsContent.slice(0, insertIndex) + '\n' + driversStr + ',\n' + dataTsContent.slice(insertIndex);

    fs.writeFileSync(dataTsPath, dataTsContent);
    console.log('Updated src/data.ts');
  }
}

main();
