#!/usr/bin/env node
// 按 SKILL.md「交付约定」的口径数字数,零依赖。
// 用法:node count.mjs <稿子.md> [--target 2500 | --max 800] [--sections] [--zh | --en]
//   没给文件时读标准输入。--target:约数,报上下 15% 的范围;--max:上限,报留 5% 余量后的建议值;
//   --sections:按小标题分节列出字数与占比,对篇幅预算用;--zh / --en:强制口径(默认看汉字与英文词哪个多)。
//   只数稿子本身:系列规划、大纲和交付说明别放进来。
// 中文口径:汉字、标点和其他符号各计 1;一串连着的英文字母或数字计 1(1.06、12,000、don't、B-tree 不拆);
//   空白与 Markdown 符号不计。英文口径:数词,英文词与数字各计 1,汉字各计 1,标点不计。
// 两种口径都计标题、表格与图注;不计图位块的标签行【图 N|…】与「画面」、HTML 注释、代码块的围栏行。
import { readFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const num = (name) => { const i = argv.indexOf(name); return i < 0 ? null : Number(argv[i + 1]); };
const files = argv.filter((a, i) => !a.startsWith('--') && !['--target', '--max'].includes(argv[i - 1]));
const HAN = /\p{Script=Han}/gu;
const RUN = /[A-Za-z0-9_]+(?:(?:[.'’-]|,(?=\d{3}))[A-Za-z0-9_]+)*/g;

// 去掉读者看不见的部分,再按小标题切节(第一个一级标题算文章标题,归入开篇)
function sections(md) {
  const kept = [];
  let fig = null, fence = false;
  for (let line of md.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').replace(/<!--[\s\S]*?-->/g, '').split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) { fence = !fence; continue; }
    if (!fence && /^\s*[【\[](图|Figure)\s*\d/.test(line)) { fig = 'visual'; continue; }
    if (!fence && fig) {
      const cap = line.match(/^\s*(?:图注|Caption)\s*[::]\s*(.*)$/);
      if (cap) { fig = 'caption'; line = cap[1]; }
      else if (!line.trim()) fig = null;
      else if (fig === 'visual') continue;
    }
    kept.push({ line, level: fence ? 0 : (line.match(/^\s*(#{1,6})\s/)?.[1].length ?? 0) });
  }
  const heads = kept.filter((k) => k.level);
  const title = heads[0]?.level === 1 ? heads[0] : null;
  const split = Math.min(...heads.filter((h) => h !== title).map((h) => h.level));
  const out = [{ name: '标题与开篇', text: '' }];
  for (const k of kept) {
    if (k !== title && k.level === split) out.push({ name: k.line.replace(/^\s*#+\s*/, '').trim(), text: '' });
    out.at(-1).text += k.line + '\n';
  }
  return out.filter((s, i) => i > 0 || s.text.trim());
}

function tally(text, en) {
  const t = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')                                    // 图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')                                  // 链接只留文字
    .replace(/<[^>]+>/g, '')                                                  // HTML 标签
    .replace(/^\s*>+\s?/gm, '')                                               // 引用
    .replace(/^\s*#{1,6}\s+/gm, '')                                           // 标题记号
    .replace(/^\s*(?:[-*+]|\d+[.)])\s+/gm, '')                                // 列表记号
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)*\|?\s*$/gm, '')    // 表格分隔行
    .replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, '')                         // 分隔线
    .replace(/\*\*|__|[*`|\\]/g, ' ');                                        // 强调、代码、表格竖线、转义
  const han = (t.match(HAN) || []).length;
  const runs = (t.match(RUN) || []).length;
  const punct = [...t.replace(HAN, '').replace(RUN, '').replace(/\s/g, '')].length;
  return { han, runs, punct, total: en ? han + runs : han + runs + punct };
}

const src = files.length ? files.map((f) => [f, readFileSync(f, 'utf8')]) : [['(stdin)', readFileSync(0, 'utf8')]];
for (const [name, md] of src) {
  const secs = sections(md);
  const all = tally(secs.map((s) => s.text).join('\n'), false);
  const en = argv.includes('--en') || (!argv.includes('--zh') && all.runs > all.han);
  const counts = secs.map((s) => tally(s.text, en).total);
  const total = counts.reduce((a, b) => a + b, 0);
  const unit = en ? '词' : '字';
  console.log(en
    ? `${name}: ${total} 词(英文词与数字 ${all.runs},汉字 ${all.han})`
    : `${name}: ${total} 字(汉字 ${all.han},英文/数字串 ${all.runs},标点符号 ${all.punct})`);
  const target = num('--target'), max = num('--max');
  if (target) {
    const lo = Math.round(target * 0.85), hi = Math.round(target * 1.15);
    console.log(`  目标约 ${target} ${unit},上下 15% 是 ${lo}–${hi}:` + (total < lo ? `还差 ${lo - total}` : total > hi ? `多出 ${total - hi}` : '在范围内'));
  }
  if (max) {
    const safe = Math.floor(max * 0.95);
    console.log(`  上限 ${max} ${unit},留 5% 余量后建议不超过 ${safe}:`
      + (total > max ? `超出上限 ${total - max}` : total > safe ? '没超上限,但余量不足 5%' : `还能加 ${safe - total}`));
  }
  if (argv.includes('--sections')) {
    secs.forEach((s, i) => console.log(`  ${String(counts[i]).padStart(6)}  ${(total ? 100 * counts[i] / total : 0).toFixed(1).padStart(5)}%  ${s.name}`));
  }
}
