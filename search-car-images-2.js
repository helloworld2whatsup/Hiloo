import fs from 'fs';

const carsToSearch = [
  "McLaren MP4/4 Honda",
  "Mercedes-AMG F1 W11",
  "Red Bull RB9 Vettel",
  "Williams FW14B Mansell",
  "Brawn BGP 001 Button",
  "Renault R25 Alonso",
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(query)}&utf8=&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.query && data.query.search) {
      console.log(`\nResults for "${query}":`);
      data.query.search.slice(0, 3).forEach(item => {
        console.log(` - ${item.title}`);
      });
    }
  } catch (e) {
    console.log(`"${query}": "ERROR",`);
  }
}

async function run() {
  for (const q of carsToSearch) {
    await searchCommons(q);
  }
}

run();
