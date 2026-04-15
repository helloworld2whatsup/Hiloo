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
    "Imola 1980",
    "Imola 1994",
    "Autodromo Enzo e Dino Ferrari 1980",
    "Autodromo Enzo e Dino Ferrari old",
    "Imola track map 1980"
  ];

  for (const q of queries) {
    await searchCommons(q);
  }
}

run();
