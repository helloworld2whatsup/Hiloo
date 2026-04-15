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
    "Österreichring",
    "Oesterreichring",
    "Zeltweg",
    "A1-Ring",
    "Interlagos 1979",
    "Interlagos 1990",
    "Suzuka 1987",
    "Suzuka 2003",
    "Albert Park 1996",
    "Zandvoort 1952",
    "Zandvoort 1973",
    "Zandvoort 1980"
  ];

  for (const q of queries) {
    await searchCommons(q);
  }
}

run();
