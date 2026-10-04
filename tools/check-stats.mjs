// 复核 skill 里引用的原文统计数字(情态词频、句长、图注等),防止规则建立在错误的计数上。
// skill 中的数字即本脚本的输出;改动任何一方,另一方须同步。
// 口径:摘要起、Final thoughts 止(不含作者/机构信息、致谢、参考文献);
//       词频与篇幅占比 = 正文 + 图注;句子级统计 = 仅正文;
//       分句 = 句末 .!? 后接大写/引号/括号/强调符(Mr. / e.g. / i.e. 不断句;删引用后不足 2 词的残片丢弃)。
import { readFileSync } from 'node:fs';

const art = readFileSync('distill-analysis/article.md', 'utf8');
const region = art
  .slice(art.indexOf('Neural networks have been adapted'), art.indexOf('### Acknowledgments'))
  .replace(/### Authors[\s\S]*?(?=\*This article is one of two)/, '');

const noCite = (s) => s.replace(/\[@[^\]]+\]/g, '');
const wc = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const split = (p) => noCite(p).split(/(?<!\b(?:Mr|Dr|Ms|vs|e\.g|i\.e)\.)(?<=[.!?])\s+(?=[A-Z“"(*$])/).map((s) => s.trim()).filter((s) => wc(s) >= 2);

// 九段骨架(structure-templates.md)与原文小节的对应;未列出的 h3 沿用所属 h2 的段号。
// 段 5 = 机制章末两节设计维度(边、全局);段 6 = 实验场 + 实证(原文顺序即如此)
const PART = [['## Graphs and where', 1], ['## What types', 2], ['## The challenges', 3], ['## Graph Neural Networks', 4],
  ['### Learning edge', 5], ['### Adding global', 5], ['## GNN playground', 6], ['### Some empirical', 6],
  ['## Into the Weeds', 7], ['## Final thoughts', 8]];
const partWords = Array(9).fill(0);
let part = 0;

const prose = [], captions = [];
for (const raw of region.split('\n')) {
  const t = raw.trim();
  const hit = PART.find(([h]) => t.startsWith(h));
  if (hit) part = hit[1];
  if (!t || t.startsWith('#') || t.startsWith('[[') || t === '[SVG图形]') continue;
  if (t.startsWith('> 图注')) { const c = t.replace(/^> 图注:\s*/, ''); if (c) { captions.push(c); partWords[part] += wc(noCite(c)); } continue; }
  if (t.startsWith('>')) continue;
  prose.push(t);
  partWords[part] += wc(noCite(t));
}
const text = noCite(prose.join('\n') + '\n' + captions.join('\n'));
const freq = (w) => (text.match(new RegExp('\\b' + w + '\\b', 'gi')) || []).length;

const paras = prose.map(split).filter((ss) => ss.length);
const sents = paras.flat();
const words = sents.reduce((a, s) => a + wc(s), 0);
const long = sents.filter((s) => wc(s) > 25);
const directive = /\b(Note that|note that|notice|One thing to note|It should be noted|let’s)\b/i;
const directives = sents.filter((s) => directive.test(s)).length;
const imperative = /^(Hover|Click|Edit|Select|Toggle|Play|Drag|Use|Try|Change|Compare|Explore)\b/;
const embedded = /\b(hover|click|edit|select|toggle)\b/i;

// 长句之后(同段内)下一句的分布:仍是长句的比例,和 5–12 词句的比例(后者与全文基线相当 = 不存在「长句后必接落锤短句」规律)
let pairs = 0, hits = 0, longNext = 0;
for (const ss of paras) for (let i = 0; i + 1 < ss.length; i++) if (wc(ss[i]) > 25) { pairs++; const n = wc(ss[i + 1]); if (n >= 5 && n <= 12) hits++; if (n > 25) longNext++; }
const pct = (a, b) => Math.round((100 * a) / b);
let maxRun = 0;
for (const ss of paras) { let r = 0; for (const s of ss) { r = wc(s) > 25 ? r + 1 : 0; maxRun = Math.max(maxRun, r); } }

const rows = [
  // [名称, skill 中写的值, 实测值]
  ['can', 116, freq('can')],
  ['might', 21, freq('might')],
  ['could', 12, freq('could')],
  ['would', 11, freq('would')],
  ['often', 8, freq('often')],
  ['usually', 3, freq('usually')],
  ['typically', 2, freq('typically')],
  ['is/are', 238, freq('(is|are)')],
  ['was/were', 2, freq('(was|were)')],
  ['where', 33, freq('where')],
  ['which', 21, freq('which')],
  ['句首 This', 26, sents.filter((s) => /^This\b/.test(s)).length],
  ['>25 词长句', 94, long.length],
  ['  其中含分号', 1, long.filter((s) => s.includes(';')).length],
  ['  其中含破折号', 3, long.filter((s) => /—|–| - /.test(s)).length],
  ['长句占比 %', 24, pct(long.length, sents.length)],
  ['长句后(同段)仍接长句 %', 18, pct(longNext, pairs)],
  ['长句后紧跟 5–12 词句 %', 20, pct(hits, pairs)],
  ['全文 5–12 词句基线 %', 20, pct(sents.filter((s) => wc(s) >= 5 && wc(s) <= 12).length, sents.length)],
  ['同段连续三个长句(处)', 1, paras.filter((ss) => { let r = 0; return ss.some((s) => (r = wc(s) > 25 ? r + 1 : 0) >= 3); }).length],
  ['≤10 词短句占比 %', 13, pct(sents.filter((s) => wc(s) <= 10).length, sents.length)],
  ['每段平均句数 ×10', 25, Math.round((10 * sents.length) / paras.length)],
  ['单句段占比 %', 32, pct(paras.filter((ss) => ss.length === 1).length, paras.length)],
  ['≤3 句段占比 %', 80, pct(paras.filter((ss) => ss.length <= 3).length, paras.length)],
  ['can be + 过去分词', 37, (text.match(/\bcan(?: also| easily)? be \w+(?:ed|en|wn|ne)\b/gi) || []).length],
  ['观察指令句', 11, directives],
  ['  约每 N 词一处', 700, Math.round(words / directives / 100) * 100],
  ['评价副词 Fortunately/Unfortunately/surprisingly', 3, (text.match(/\b(Fortunately|Unfortunately|surprisingly)\b/g) || []).length],
  ['实质图注', 37, captions.length],
  ['  祈使句开头', 7, captions.filter((c) => imperative.test(c)).length],
  ['  描述句内嵌祈使', 6, captions.filter((c) => !imperative.test(c) && embedded.test(c)).length],
  ['  问题句', 0, captions.filter((c) => c.includes('?')).length],
  // 九段篇幅占比 %(词数),依次为段 0–8
  ...[6, 11, 7, 6, 15, 7, 16, 30, 1].map((claimed, i) =>
    [`段${i} 篇幅占比 %`, claimed, pct(partWords[i], partWords.reduce((a, b) => a + b, 0))]),
];

let bad = 0;
for (const [name, claimed, measured] of rows) {
  const ok = claimed === measured;
  if (!ok) bad++;
  console.log(`${ok ? 'OK  ' : 'DIFF'} ${name.padEnd(24)} skill=${String(claimed).padEnd(5)} 实测=${measured}`);
}
console.log(`\n(参考)正文 ${sents.length} 句 / ${words} 词;长句同段最长连排 ${maxRun} 句`);
console.log(`(参考)同段内长句后接句 ${pairs} 对:仍为长句 ${longNext},为 5–12 词句 ${hits}`);
console.log(bad ? `\nFAILED: ${bad} 项与 skill 不符` : '\nALL MATCH');
if (bad) process.exitCode = 1;
