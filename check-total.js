import fs from 'fs';

async function checkTotal() {
  const res = await fetch('https://api.jolpi.ca/ergast/f1/results/1.json?limit=1');
  const data = await res.json();
  console.log("Total:", data.MRData.total);
}
checkTotal();
