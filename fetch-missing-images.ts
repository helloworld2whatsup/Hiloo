import fs from 'fs';

async function fetchDriverImageUrl(driverName: string): Promise<string | null> {
  try {
    const url = `https://de.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(driverName)}&prop=pageimages&format=json&pithumbsize=500`;
    const response = await fetch(url);
    const data = await response.json();
    
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
    
    // Try english wikipedia
    const enUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(driverName)}&prop=pageimages&format=json&pithumbsize=500`;
    const enResponse = await fetch(enUrl);
    const enData = await enResponse.json();
    
    const enPages = enData.query.pages;
    const enPageId = Object.keys(enPages)[0];
    
    if (enPageId !== '-1' && enPages[enPageId].thumbnail) {
      return enPages[enPageId].thumbnail.source;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image for ${driverName}:`, error);
    return null;
  }
}

async function main() {
  const driversToUpdate = [
    'Louis Rosier',
    'Mike Hawthorn',
    'Alan Jones (Rennfahrer)',
    'Gilles Villeneuve',
    'George Russell (Rennfahrer)',
    'Sergio Pérez',
    'Carlos Sainz junior',
    'Alexander Albon'
  ];

  for (const driverName of driversToUpdate) {
    const imageUrl = await fetchDriverImageUrl(driverName);
    console.log(`${driverName}: ${imageUrl}`);
  }
}

main();
