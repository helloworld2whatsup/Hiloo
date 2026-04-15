import fs from 'fs';

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(query)}&utf8=&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(`\nResults for "${query}":`);
  if (data.query && data.query.search) {
    data.query.search.slice(0, 3).forEach(item => {
      console.log(` - ${item.title}`);
    });
  } else {
    console.log("No results.");
  }
}

async function run() {
  const queries = [
    "Silverstone Circuit 1997",
    "Monza track map 1922",
    "Monza track map 1955",
    "Monza track map 1976",
    "Monte Carlo Formula 1 track map 1950",
    "Monte Carlo Formula 1 track map 2003",
    "Spa-Francorchamps of Belgium 1950",
    "Spa-Francorchamps of Belgium 1981",
    "Oesterreichring 1970",
    "Oesterreichring 1977",
    "A1-Ring",
    "Imola 1981",
    "Imola 1995",
    "Nürburgring Nordschleife 1927",
    "Nürburgring Grand-Prix-Strecke 1984",
    "Hockenheimring 1992",
    "Interlagos 1973",
    "Circuit de Catalunya 1991",
    "Circuit de Catalunya 2007",
    "Bahrain Endurance Circuit",
    "Hungaroring 1986",
    "Hungaroring 1989",
    "Autódromo Hermanos Rodríguez 1962",
    "Autódromo Hermanos Rodríguez 1986",
    "Marina Bay Street Circuit 2008",
    "Marina Bay Street Circuit 2015",
    "Yas Marina Circuit 2009",
    "Suzuka circuit map 2005",
    "Circuit Gilles Villeneuve 1994",
    "Albert Park Circuit 1996"
  ];

  for (const q of queries) {
    await searchCommons(q);
  }
}

run();
