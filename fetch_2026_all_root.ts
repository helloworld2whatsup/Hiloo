import https from 'https';

https.get('https://api.jolpi.ca/ergast/f1/2026/results/1.json?limit=100', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const races = parsed.MRData.RaceTable.Races;
      races.forEach((r: any) => {
        console.log(`${r.season} ${r.raceName}: ${r.Results[0].Driver.givenName} ${r.Results[0].Driver.familyName} (${r.Results[0].Constructor.name})`);
      });
    } catch (e) {
      console.log('Error parsing JSON');
    }
  });
}).on('error', (e) => {
  console.error(e);
});