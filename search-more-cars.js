import fs from 'fs';

const carsToSearch = [
  "Mercedes-Benz W196",
  "Cooper T51",
  "Ferrari 156 F1",
  "Lotus 79",
  "McLaren MP4/2",
  "Williams FW15C",
  "Ferrari F2002",
  "Red Bull RB7",
  "Mercedes F1 W05 Hybrid",
  "McLaren MP4-23",
  "Jordan 191"
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=File:${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
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
