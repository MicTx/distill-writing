// HTML -> markdown cleaner for distill.pub article (constrained, single-purpose)
const fs = require('fs');
let html = fs.readFileSync('source/gnn-intro.html', 'utf8').replace(/\r\n?/g, '\n'); // 行尾归一:不依赖仓库检出配置

// 1. extract front-matter metadata (before stripping scripts)
let meta = { title: '', authors: [], abstract: '' };
const fm = html.match(/<d-front-matter[\s\S]*?<\/d-front-matter>/);
if (fm) {
  const t = fm[0].match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (t) meta.title = JSON.parse('"' + t[1] + '"');
  const a = fm[0].match(/"authors"\s*:\s*\[([\s\S]*?)\]/);
  if (a) meta.authors = [...a[1].matchAll(/"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)"/g)]
    .filter((m) => m[1] === 'given' || m[1] === 'family').map((m) => m[2]);
  const ab = fm[0].match(/"abstract"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (ab) meta.abstract = JSON.parse('"' + ab[1] + '"');
}

// 2. cut to main content only
const start = html.search(/<d-title/);
const endPos = html.search(/<\/d-bibliography>/);
html = html.slice(start, endPos > 0 ? endPos + 16 : undefined);

// 3. strip non-content
html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
html = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
html = html.replace(/<svg[\s\S]*?<\/svg>/gi, ' [SVG图形] ');

// 4. distill-specific elements
html = html.replace(/<d-cite[^>]*key="([^"]*)"[^>]*>[\s\S]*?<\/d-cite>/gi, (m, k) => '[@' + k + ']');
html = html.replace(/<figure[^>]*>/gi, '\n\n[[交互图/图示 开始]]\n');
html = html.replace(/<\/figure>/gi, '[[交互图/图示 结束]]\n');
html = html.replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, (m, t) => '> 图注: ' + t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '\n');
html = html.replace(/<d-footnote-list[^>]*>/gi, '\n\n## 脚注列表\n');
html = html.replace(/<d-citation-list[^>]*>/gi, '\n\n## 引用列表\n');
html = html.replace(/<d-bibliography[^>]*>/gi, '\n\n## 参考文献\n');

// 5. headings
for (let i = 6; i >= 1; i--) {
  const re = new RegExp('<h' + i + '[^>]*>([\\s\\S]*?)</h' + i + '>', 'g');
  html = html.replace(re, (m, t) => '\n\n' + '#'.repeat(i) + ' ' + t.replace(/<[^>]+>/g, '').trim() + '\n');
}

// 6. blocks
html = html.replace(/<p[^>]*>/gi, '\n\n');
html = html.replace(/<li[^>]*>/gi, '\n- ');
html = html.replace(/<br\s*\/?>/gi, '\n');
html = html.replace(/<blockquote[^>]*>/gi, '\n');

// 7. inline
html = html.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (m, _t, c) => '**' + c.replace(/<[^>]+>/g, '').trim() + '**');
html = html.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (m, _t, c) => '*' + c.replace(/<[^>]+>/g, '').trim() + '*');
html = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
html = html.replace(/<a [^>]*>([\s\S]*?)<\/a>/gi, '$1');

// 8. strip all remaining tags, decode entities
html = html.replace(/<[^>]+>/g, ' ');
const ents = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&mdash;': '—', '&ndash;': '–', '&rsquo;': "'", '&lsquo;': "'", '&rdquo;': '"', '&ldquo;': '"', '&hellip;': '…' };
html = html.replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n));
for (const [k, v] of Object.entries(ents)) html = html.split(k).join(v);

// 9. collapse whitespace
html = html.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();

const header = [
  '# ' + (meta.title || 'A Gentle Introduction to Graph Neural Networks'),
  '',
  '> 原文: https://distill.pub/2021/gnn-intro/ (CC-BY 4.0) | 作者: ' + (meta.authors.join(', ') || 'Sanchez-Lengeling, Reif, Pearce, Wiltschko'),
  '> 本文件是 HTML 清洗后的全文 markdown,供写作方法论分析使用。[[交互图/图示]] 标记处原文为交互式可视化。',
  '',
  '> 摘要: ' + (meta.abstract || '(见正文)'),
  '',
].join('\n');

fs.writeFileSync('distill-analysis/article.md', header + html + '\n', 'utf8');
console.log('written', (header + html).length, 'chars');
