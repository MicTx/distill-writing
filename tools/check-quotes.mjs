// 逐字校验:提取 skill 目录所有 «…» 引文,验证是否为 article.md 的逐字子串;
// 并核对引文后括注的 § 小节标签是否与引文在原文中的实际小节一致(简称表见 SKILL.md)。
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const skillDir = 'skill/gentle-introduction-skill';
const article = readFileSync('distill-analysis/article.md', 'utf8');

// 原文小节 → § 简称。h2 决定大类,两个 h3 例外:例证、实证
const heads = [];
article.split('\n').forEach((l, i) => { const m = l.match(/^(#{2,3}) (.*)/); if (m) heads.push({ line: i + 1, lvl: m[1].length, t: m[2] }); });
const SECTIONS = [['Graphs and where', '以已知引入'], ['What types', '任务'], ['The challenges', '挑战'],
  ['Graph Neural Networks', '机制'], ['GNN playground', '实验'], ['Into the Weeds', '容器'], ['Final thoughts', '收束']];
const sectionOf = (q) => {
  const idx = article.indexOf(q);
  const line = article.slice(0, idx).split('\n').length;
  let h2 = null, h3 = '';
  for (const h of heads) { if (h.line > line) break; if (h.lvl === 2) { h2 = h.t; h3 = ''; } else h3 = h.t; }
  if (h2 === null) return '引言';
  if (h3.startsWith('Graph-valued data')) return '例证';
  if (h3.startsWith('Some empirical')) return '实证';
  if (h3 === 'Acknowledgments') return '致谢';
  return (SECTIONS.find(([k]) => h2.startsWith(k)) || [, '致谢'])[1];
};

const files = ['SKILL.md', ...readdirSync(join(skillDir, 'references')).map(f => 'references/' + f)];
let total = 0, failures = 0, labelled = 0, mislabelled = 0;

for (const f of files) {
  const text = readFileSync(join(skillDir, f), 'utf8');
  const lines = text.split('\n').length;
  const quotes = [...text.matchAll(/«([^»]+)»/g)].map(m => m[1]).filter(q => q !== '…'); // «…» 是约定说明里的占位符
  const bad = quotes.filter(q => !article.includes(q));
  total += quotes.length; failures += bad.length;
  console.log(`${f}: ${lines} lines, ${quotes.length} quotes, ${bad.length} failures`);
  for (const q of bad) console.log(`  FAIL: ${q.slice(0, 120)}`);
  // 一串引文(以 → / + ; 、 相连)后接 (§标签):串内每条引文都须落在标签所列小节之一
  for (const m of text.matchAll(/((?:«[^»]+»\s*(?:→|\/|\+|;|、)?\s*)+)\(([^)]*§[^)]*)\)/g)) {
    const labels = [...m[2].matchAll(/§([^\s·,;/—)]+)/g)].map(x => x[1]);
    for (const [, q] of m[1].matchAll(/«([^»]+)»/g)) {
      if (!article.includes(q)) continue;
      labelled++;
      const actual = sectionOf(q);
      if (!labels.some(l => l.startsWith(actual))) { mislabelled++; console.log(`  LABEL: (${m[2]}) 应为 §${actual}: ${q.slice(0, 80)}`); }
    }
  }
}
console.log(`\nTOTAL quotes=${total} failures=${failures}; § labels checked=${labelled} mismatches=${mislabelled}`);
if (failures || mislabelled) process.exitCode = 1;
