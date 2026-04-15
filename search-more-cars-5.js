import fs from 'fs';

const carsToSearch = [
  "2002 Ferrari F2002.jpg",
  "F2002.jpg"
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(query)}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].imageinfo) {
        console.log(`"${query}": "${pages[0].imageinfo[0].url}",`);
      } else {
        console.log(`"${query}": "NOT_FOUND",`);
      }
    } else {
      console.log(`"${query}": "NOT_FOUND",`);
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
