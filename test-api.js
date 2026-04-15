import fs from 'fs';

async function testApi() {
  try {
    const res = await fetch('https://api.jolpi.ca/ergast/f1/results/1.json?limit=5');
    const data = await res.json();
    console.log(data.MRData.RaceTable.Races.map(r => `${r.season} ${r.raceName} - ${r.Results[0].Driver.familyName}`));
  } catch (e) {
    console.log("Error:", e.message);
  }
}
testApi();
