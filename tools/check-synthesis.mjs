import fs from 'fs';
const art = fs.readFileSync('distill-analysis/article.md', 'utf8');
const doc = fs.readFileSync('distill-analysis/00-synthesis.md', 'utf8');
const count = (re) => (doc.match(re) || []).length;
console.log('P', count(/^\*\*P\d+\|/gm));
console.log('S', count(/^\*\*S\d+\|/gm));
console.log('C', count(/^\*\*C\d+\|/gm));
console.log('G', count(/^\*\*G\d+\|/gm));
console.log('L', count(/^\*\*L\d+\|/gm));
const open = '\u00AB', close = '\u00BB';
const re = new RegExp(open + '[^' + close + ']+' + close, 'g');
const qs = doc.match(re) || [];
let f = 0;
for (const q of qs) {
  const s = q.slice(1, -1);
  if (!art.includes(s)) { f++; console.log('FAIL:', JSON.stringify(s.slice(0, 100))); }
}
console.log('quotes', qs.length, 'failures', f);
if (f) process.exitCode = 1;
