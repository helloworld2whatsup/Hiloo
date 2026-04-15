import https from 'https';
import fs from 'fs';

https.get('https://api.jolpi.ca/ergast/f1/constructors.json?limit=300', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const parsed = JSON.parse(data);
    const constructors = parsed.MRData.ConstructorTable.Constructors;
    console.log(`Found ${constructors.length} constructors`);
    fs.writeFileSync('constructors-raw.json', JSON.stringify(constructors, null, 2));
  });
});
