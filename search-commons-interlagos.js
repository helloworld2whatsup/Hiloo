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
    "Interlagos 1973 map",
    "Interlagos old layout",
    "Autodromo Jose Carlos Pace 1973",
    "Autodromo Jose Carlos Pace old",
    "Interlagos track map 1973"
  ];

  for (const q of queries) {
    await searchCommons(q);
  }
}

run();
