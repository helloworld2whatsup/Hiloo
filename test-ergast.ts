import https from 'https';

https.get('https://api.jolpi.ca/ergast/f1/2004/driverStandings.json?limit=100', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const standings = json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(`Found ${standings.length} drivers in 2004 standings`);
  });
});
