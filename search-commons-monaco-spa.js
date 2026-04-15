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
    "Circuit de Monaco 1950",
    "Circuit de Monaco 1973",
    "Monaco circuit 1950",
    "Monaco circuit 1973",
    "Spa-Francorchamps 1950",
    "Spa-Francorchamps 1979",
    "Spa circuit 1950",
    "Spa circuit 1979"
  ];

  for (const q of queries) {
    await searchCommons(q);
  }
}

run();
