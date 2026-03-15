const fs = require('fs');

// Read page 2
const page2 = JSON.parse(fs.readFileSync('./sketch_extract/pages/8_1.json', 'utf8'));

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

// Extract colors from style
function extractColors(layer, artboardName) {
  const results = [];
  if (layer._class === 'artboard') artboardName = layer.name;
  if (layer.style && layer.style.fills) {
    for (const fill of layer.style.fills) {
      if (fill.color && fill.isEnabled !== false) {
        const c = fill.color;
        const r = Math.round((c.red || 0) * 255);
        const g = Math.round((c.green || 0) * 255);
        const b = Math.round((c.blue || 0) * 255);
        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        results.push(hex);
      }
    }
  }
  if (layer.layers) {
    for (const child of layer.layers) {
      results.push(...extractColors(child, artboardName));
    }
  }
  return results;
}

const texts = [];
const colors = [];
for (const layer of page2.layers || []) {
  texts.push(...extractTexts(layer, ''));
  colors.push(...extractColors(layer, ''));
}

// Group texts by artboard
const grouped = {};
for (const t of texts) {
  if (!grouped[t.artboard]) grouped[t.artboard] = [];
  if (!grouped[t.artboard].includes(t.text)) grouped[t.artboard].push(t.text);
}

console.log('=== 第二页文字内容 ===');
for (const [artboard, items] of Object.entries(grouped)) {
  console.log('\n--- ' + artboard + ' ---');
  for (const t of items) console.log('  ' + t);
}

// Unique colors
const uniqueColors = [...new Set(colors)];
console.log('\n\n=== 使用的颜色 (' + uniqueColors.length + '种) ===');
for (const c of uniqueColors) console.log('  ' + c);
