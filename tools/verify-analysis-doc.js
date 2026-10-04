// 端到端核验:抽取 07-cognitive-load.md 中所有「…」英文引文,验证每条都是 article.md 的连续子串
const fs = require('fs');
const doc = fs.readFileSync('distill-analysis/07-cognitive-load.md', 'utf8');
const article = fs.readFileSync('distill-analysis/article.md', 'utf8');
const body = article.slice(0, article.indexOf('## 引用列表'));

const spans = [...doc.matchAll(/「([^」]+)」/g)].map(m => m[1]);
console.log('抽取引文数:', spans.length);
let fail = 0;
spans.forEach((s, i) => {
  const ok = body.includes(s);
  if (!ok) { fail++; console.log('FAIL #' + (i + 1), '|', s); }
});
console.log(fail === 0 ? 'ALL PASS — 每条引文均为 article.md 逐字子串' : 'FAILED: ' + fail);
if (fail) process.exitCode = 1;

// 词数上限检查(每条 ≤ 40 词)
const wc = (s) => s.trim().split(/\s+/).length;
const over = spans.filter(s => wc(s) > 40);
console.log('超过 40 词的引文:', over.length ? over.map(s => wc(s) + ':' + s.slice(0, 50)) : '无');
