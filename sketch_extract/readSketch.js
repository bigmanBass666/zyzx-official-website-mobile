const fs = require('fs');

// Read page 1 - main page with most artboards
const page1 = JSON.parse(fs.readFileSync('./sketch_extract/pages/eFRVuNK-h4GYJi-EUH71B.json', 'utf8'));

function extractTexts(layer, artboardName) {
  const results = [];
  if (layer._class === 'artboard') artboardName = layer.name;
  if (layer._class === 'text' && layer.attributedString && layer.attributedString.string) {
    const text = layer.attributedString.string.trim();
    if (text) results.push({ artboard: artboardName, text });
  }
  if (layer.layers) {
    for (const child of layer.layers) {
      results.push(...extractTexts(child, artboardName));
    }
  }
  return results;
}

const texts = [];
for (const layer of page1.layers || []) {
  texts.push(...extractTexts(layer, ''));
}

// Group by artboard, deduplicate
const grouped = {};
for (const t of texts) {
  if (!grouped[t.artboard]) grouped[t.artboard] = [];
  if (!grouped[t.artboard].includes(t.text)) grouped[t.artboard].push(t.text);
}

for (const [artboard, items] of Object.entries(grouped)) {
  console.log('=== ' + artboard + ' ===');
  for (const t of items) console.log('  ' + t);
  console.log('');
}
