import fs from 'fs';

const carsToSearch = [
  "1988 McLaren-Honda MP4 4 Goodwood, 2009 (01).jpg",
  "2020 Formula One tests Barcelona, Mercedes-AMG F1 W11 EQ Performance, Hamilton.jpg",
  "Red Bull RB9 Vettel F1 Jerez 2013.jpg",
  "Williams FW14B (35029084126).jpg",
  "Jenson Button (Brawn BGP 001) on Sunday at 2009 Abu Dhabi Grand Prix.jpg",
  "Renault R25 front-left 2017 Museo Fernando Alonso.jpg"
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
  console.log("const carImages = {");
  for (const q of carsToSearch) {
    await searchCommons(q);
  }
  console.log("};");
}

run();
