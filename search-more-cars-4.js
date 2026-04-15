import fs from 'fs';

const carsToSearch = [
  "Ferrari F2002",
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(query)}&utf8=&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.query && data.query.search) {
      console.log(`\nResults for "${query}":`);
      data.query.search.slice(0, 5).forEach(item => {
        console.log(` - ${item.title}`);
      });
    }
  } catch (e) {
    console.log(`"${query}": "ERROR",`);
  }
}

run();
async function run() {
  for (const q of carsToSearch) {
    await searchCommons(q);
  }
}
