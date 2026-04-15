import fs from 'fs';

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(query)}&utf8=&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(`Results for "${query}":`);
  if (data.query && data.query.search) {
    data.query.search.slice(0, 3).forEach(item => {
      console.log(` - ${item.title}`);
    });
  } else {
    console.log("No results.");
  }
}

async function run() {
  await searchCommons("Silverstone Circuit 1949");
  await searchCommons("Silverstone Circuit 1975");
  await searchCommons("Silverstone Circuit 1997");
  await searchCommons("Monza track map 1922");
  await searchCommons("Monza track map 1955");
  await searchCommons("Monza track map 1976");
  await searchCommons("Monte Carlo Formula 1 track map 1950");
  await searchCommons("Spa-Francorchamps of Belgium 1950");
  await searchCommons("Oesterreichring 1970");
  await searchCommons("Imola 1981");
  await searchCommons("Nürburgring Nordschleife 1927");
  await searchCommons("Circuit Zandvoort 1980");
  await searchCommons("Hockenheimring 1992");
  await searchCommons("Autódromo José Carlos Pace track map 1973");
}

run();
