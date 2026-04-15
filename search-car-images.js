import fs from 'fs';

const carsToSearch = [
  "McLaren MP4/4",
  "Ferrari F2004",
  "Mercedes W11",
  "Red Bull RB9",
  "Williams FW14B",
  "Lotus 72",
  "Brawn BGP 001",
  "Tyrrell P34",
  "Maserati 250F",
  "Renault R25",
  "Alfa Romeo 158",
  "Lotus 25",
  "Lotus 49",
  "Ferrari 312T",
  "McLaren M23",
  "Brabham BT46",
  "Williams FW07",
  "Benetton B195",
  "McLaren MP4/13",
  "Red Bull RB19"
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=File:${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      // Filter out SVGs or non-images if possible, but usually the top result is fine
      const validPages = pages.filter(p => p.imageinfo && p.imageinfo[0].url.match(/\.(jpg|jpeg|png)$/i));
      if (validPages.length > 0) {
        console.log(`"${query}": "${validPages[0].imageinfo[0].url}",`);
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
