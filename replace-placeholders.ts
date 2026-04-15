import fs from 'fs';

const dataPath = 'src/data.ts';
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const driverRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'[\s\S]*?imageUrl:\s*'https:\/\/picsum\.photos[^']+'/g;
const matches = [...dataContent.matchAll(driverRegex)];

console.log('Found', matches.length, 'drivers still needing images.');

let updatedCount = 0;

for (const match of matches) {
  const id = match[1];
  const name = match[2];
  
  const fallbackUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=18181b&textColor=ef4444`;
  
  const safeName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const replaceRegex = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'${safeName}'[\\s\\S]*?imageUrl:\\s*')https:\\/\\/picsum\\.photos[^']+(')`);
  dataContent = dataContent.replace(replaceRegex, `$1${fallbackUrl}$2`);
  updatedCount++;
}

fs.writeFileSync(dataPath, dataContent);
console.log('Replaced', updatedCount, 'remaining placeholders with initials.');
