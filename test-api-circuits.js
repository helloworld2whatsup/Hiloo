import fs from 'fs';

async function testApi() {
  try {
    const res = await fetch('https://api.jolpi.ca/ergast/f1/drivers/alonso/circuits.json?limit=100');
    const data = await res.json();
    console.log(data.MRData.CircuitTable.Circuits.length);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
testApi();
