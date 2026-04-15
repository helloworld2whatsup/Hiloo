import fs from 'fs';

const carsToSearch = [
  "2007 Ferrari F2007.jpg",
  "Lewis Hamilton, McLaren MP4-23 Mercedes-Benz.jpg",
  "Ferrari F2002 (8925204549).jpg", // Wait, F2004 was this one. Let's search for Ferrari F2002
  "Brawn Mercedes BGP 001 (48242843541).jpg"
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
