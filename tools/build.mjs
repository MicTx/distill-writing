// 检查并打包 skill,零依赖,Node 18 以上;从哪个目录运行都行。
// 用法:node tools/build.mjs           跑完全部检查,都过了才把 skill/gentle-introduction-skill/ 打成 dist/gentle-introduction-skill.zip
//       node tools/build.mjs --check   只检查,不打包
// 检查项:SKILL.md frontmatter;skill 文档里反引号括起的文件路径都找得到;references/、scripts/ 下的文件都在 SKILL.md 里提到;
//   文本文件是 UTF-8、无 BOM、LF 行尾;字数脚本跑两个样例;清洗管线在临时目录重跑,产物与 article.md 逐字节相同;
//   tools/ 下五个核验脚本。任何一项不过都以非零退出码结束,不出包。
// 公开发布仓库(如 GitHub)不含原文底本(source/ 与 distill-analysis/article.md 依原作 CC-BY 4.0,仅存于源仓库):
//   底本缺席时,依赖它的四项检查(清洗管线 + 五个核验脚本)跳过并逐项提示,其余检查照常跑、照常打包;
//   源仓库里底本齐全,全部检查照旧。
// zip 根目录就是 gentle-introduction-skill/ 文件夹。claude.ai 上传和 Skills API 只认 Agent Skills 规范的六个 frontmatter 字段,多一个就拒收
//   (https://code.claude.com/docs/en/skills#using-skill-frontmatter-outside-claude-code),所以 zip 里的 SKILL.md
//   去掉 argument-hint 这类 Claude Code 专用字段;源文件不动,Claude Code 照旧直接复制目录。
// 条目按路径排序,时间戳取 SOURCE_DATE_EPOCH,没设就取最后一次提交的时间:同一版 Node 下,源文件不变,重复打包逐字节相同。
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const NAME = 'gentle-introduction-skill';
const SKILL = join(ROOT, 'skill', NAME);
const OUT = join(ROOT, 'dist', `${NAME}.zip`);
const SPEC_KEYS = ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'];
const REPO_ONLY = ['tools/check-stats.mjs']; // skill 里提到、只在源仓库里的文件(提到处已写明安装后没有)
const VERIFIERS = ['check-quotes.mjs', 'check-synthesis.mjs', 'check-stats.mjs', 'verify-analysis-quotes.js', 'verify-analysis-doc.js'];
const TEXT = /\.(md|mjs|cjs|js|json|txt|py|sh|ya?ml|csv|html)$/;

const failures = [];
const ok = (msg) => console.log(`  ok    ${msg}`);
const fail = (msg) => { failures.push(msg); console.log(`  FAIL  ${msg}`); };
const skip = (msg) => console.log(`  skip  ${msg}`);
// 公开发布仓库不含原文底本(依原作 CC-BY 4.0,仅存于源仓库);缺席时依赖它的检查跳过
const hasSource = existsSync(join(ROOT, 'distill-analysis', 'article.md')) && existsSync(join(ROOT, 'source', 'gnn-intro.html'));
const node = (args, opts) => spawnSync(process.execPath, args, { encoding: 'utf8', ...opts });
const lines = (s) => s.split('\n').filter((l) => l.trim());

// skill 目录下的文件:相对路径用 /,按路径排序;点开头的(.DS_Store 之类)不算
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).filter((e) => !e.name.startsWith('.'))
  .flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const files = walk(SKILL).map((p) => relative(SKILL, p).replaceAll('\\', '/')).sort();
const read = (f) => readFileSync(join(SKILL, f), 'utf8');

// 1. frontmatter。只认单行的 key: value(缩进的续行归上一个字段),值加双引号时按 JSON 字符串解析
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!m) throw new Error('SKILL.md 第一行不是 ---,没有 frontmatter');
  const fields = [];
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z][\w-]*):(.*)$/);
    if (kv) fields.push({ key: kv[1], raw: kv[2].trim(), lines: [line] });
    else if (fields.length && !/^\S/.test(line)) fields.at(-1).lines.push(line);
    else throw new Error(`frontmatter 这一行看不懂:${line}`);
  }
  const value = (key) => {
    const f = fields.find((x) => x.key === key);
    if (!f || f.lines.length > 1 || /^[|>]/.test(f.raw)) return null;
    if (f.raw.startsWith('"')) return JSON.parse(f.raw);
    if (f.raw.startsWith("'")) return f.raw.slice(1, -1).replaceAll("''", "'");
    return f.raw;
  };
  return { fields, value, body: md.slice(m[0].length) };
}

let packedSkillMd = null;
function checkFrontmatter() {
  const md = read('SKILL.md');
  let fm, name, desc;
  try { fm = parseFrontmatter(md); name = fm.value('name'); desc = fm.value('description'); } catch (e) { return fail(`frontmatter:${e.message}`); }
  const errs = [];
  const keys = fm.fields.map((f) => f.key);
  const dup = keys.filter((k, i) => keys.indexOf(k) !== i);
  if (dup.length) errs.push(`字段重复:${dup.join(', ')}`);
  if (!name) errs.push('缺 name,或 name 不是单行字符串');
  else {
    if (name !== NAME) errs.push(`name 是 ${name},要和目录名 ${NAME} 一致`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) errs.push('name 只能用小写字母、数字和单个连字符,不超过 64 个字符');
    if (/anthropic|claude/.test(name)) errs.push('name 不能含保留词 anthropic、claude');
  }
  const len = [...(desc ?? '')].length;
  if (!desc?.trim()) errs.push('缺 description,或 description 不是单行字符串');
  else {
    if (len > 1024) errs.push(`description ${len} 个字符,超过 1024`);
    if (/[<>]/.test(desc)) errs.push('description 里不能有尖括号 < >');
  }
  if (errs.length) return errs.forEach((e) => fail(`frontmatter:${e}`));
  const extra = fm.fields.filter((f) => !SPEC_KEYS.includes(f.key));
  packedSkillMd = extra.length
    ? `---\n${fm.fields.filter((f) => SPEC_KEYS.includes(f.key)).flatMap((f) => f.lines).join('\n')}\n---\n${fm.body}`
    : md;
  ok(`frontmatter:name=${name},description ${len} 个字符`
    + (extra.length ? `;zip 里去掉 Claude Code 专用字段 ${extra.map((f) => f.key).join(', ')}` : ''));
}

// 2. 反引号里的文件路径:先按所在文件的目录解析,再按 skill 根目录,最后认不带目录的文件名(正文常只写 xxx.md)
function checkReferences() {
  const TOKEN = /(?<!\S)((?:[\w.-]+\/)*[\w-][\w.-]*\.(?:md|mjs|cjs|js|json|txt|py|sh|html)|(?:[\w-][\w.-]*\/)+)(?!\S)/g;
  const dirs = new Set(files.flatMap((f) => f.split('/').slice(0, -1).map((_, i, a) => `${a.slice(0, i + 1).join('/')}/`)));
  const found = (from, tok) => (tok.endsWith('/') ? dirs.has(tok)
    : [posix.normalize(posix.join(posix.dirname(from), tok)), tok].some((p) => files.includes(p)) || files.some((g) => g.endsWith(`/${tok}`)));
  let n = 0;
  const repoOnly = new Set();
  const before = failures.length;
  for (const f of files.filter((x) => x.endsWith('.md'))) {
    for (const [, span] of read(f).matchAll(/`([^`\n]+)`/g)) {
      for (const [tok] of span.matchAll(TOKEN)) {
        n++;
        if (found(f, tok)) continue;
        if (REPO_ONLY.includes(tok) && existsSync(join(ROOT, tok))) repoOnly.add(tok);
        else fail(`${f}:\`${tok}\` 在 skill 里找不到`);
      }
    }
  }
  if (failures.length === before) {
    ok(`文件引用:${n} 处反引号路径都找得到` + (repoOnly.size ? `(其中 ${[...repoOnly].join(', ')} 只在源仓库里,提到处已写明)` : ''));
  }
}

// 3. 孤儿文件:SKILL.md 没提到的文件,模型不会知道去读
function checkOrphans() {
  const skillMd = read('SKILL.md');
  const orphans = files.filter((f) => f !== 'SKILL.md' && !skillMd.includes(f));
  if (orphans.length) orphans.forEach((f) => fail(`${f}:SKILL.md 里没提到它的路径`));
  else ok(`没有孤儿文件:SKILL.md 之外的 ${files.length - 1} 个文件都在 SKILL.md 里提到`);
}

// 4. 编码
function checkEncoding() {
  const utf8 = new TextDecoder('utf-8', { fatal: true });
  const text = files.filter((f) => TEXT.test(f));
  const before = failures.length;
  for (const f of text) {
    const buf = readFileSync(join(SKILL, f));
    try { utf8.decode(buf); } catch { fail(`${f}:不是合法的 UTF-8`); continue; }
    if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) fail(`${f}:开头有 BOM`);
    if (buf.includes(0x0d)) fail(`${f}:有 CR 行尾`);
  }
  if (failures.length === before) ok(`编码:${text.length} 个文本文件都是 UTF-8、无 BOM、LF 行尾`);
}

// 5. 字数脚本:两个小样例,数字对不上说明口径被改坏了
function checkCounter() {
  const CASES = [
    // 标题、英文/数字串、图位块(标签行和画面不计,图注计)、HTML 注释;--sections 分两节
    ['# 标题\n\n开篇一句,有 B-tree 和 1.06。\n\n## 第一节\n\n【图 1|示意】\n画面:这里不计。\n图注:计入。\n\n<!-- 不计 -->\n',
      ['--sections'], [18, 13, 2, 3, 12, 66.7, 6, 33.3]],
    ["# Title\n\nDon't split 12,000 or B-tree.\n", [], [6, 6, 0]],
  ];
  const script = join(SKILL, 'scripts', 'count.mjs');
  const bad = CASES.filter(([input, args, want]) => {
    const r = node([script, ...args], { input });
    const got = (r.stdout.match(/\d+(?:\.\d+)?/g) || []).map(Number);
    return r.status !== 0 || got.join() !== want.join();
  });
  if (bad.length) bad.forEach(([input]) => fail(`scripts/count.mjs:样例「${input.split('\n')[0]}」的计数和预期不同`));
  else ok(`字数脚本:${CASES.length} 个样例计数正确`);
}

// 6. 清洗管线:在临时目录重跑 clean.js(它按当前目录读写),不碰仓库里的 article.md
function checkClean() {
  if (!hasSource) return skip('清洗管线:仓库无原文底本(公开发布版),跳过');
  const tmp = mkdtempSync(join(tmpdir(), 'distill-build-'));
  try {
    for (const d of ['source', 'distill-analysis']) mkdirSync(join(tmp, d));
    copyFileSync(join(ROOT, 'source', 'gnn-intro.html'), join(tmp, 'source', 'gnn-intro.html'));
    const r = node([join(ROOT, 'tools', 'clean.js')], { cwd: tmp });
    if (r.status !== 0) return fail(`clean.js 出错:${lines(r.stderr || r.stdout).at(-1)}`);
    const same = readFileSync(join(tmp, 'distill-analysis', 'article.md')).equals(readFileSync(join(ROOT, 'distill-analysis', 'article.md')));
    if (same) ok('清洗管线:在临时目录重跑 clean.js,产物与 distill-analysis/article.md 逐字节相同');
    else fail('清洗管线:重跑 clean.js 的产物和 distill-analysis/article.md 不同;运行 node tools/clean.js 后看 git diff');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// 7. 核验脚本:都按当前目录找文件,所以在仓库根目录跑
function checkVerifiers() {
  if (!hasSource) return skip('核验脚本:仓库无原文底本(公开发布版),五个引文/统计核验跳过;skill 自身的检查(前 5 项)不受影响');
  for (const v of VERIFIERS) {
    const r = node([join(ROOT, 'tools', v)], { cwd: ROOT });
    const out = lines(`${r.stdout ?? ''}${r.stderr ?? ''}`);
    if (r.status === 0) ok(`${v}:${out.findLast((l) => /pass|fail|match/i.test(l)) ?? out.at(-1) ?? ''}`);
    else fail(`${v} 没通过(退出码 ${r.status}),最后几行:\n${out.slice(-12).map((l) => `          ${l}`).join('\n')}`);
  }
}

// 8. zip。只放文件(和 Anthropic 的 package_skill.py 一样不写目录条目),deflate,文件名标记为 UTF-8
const CRC = Array.from({ length: 256 }, (_, n) => {
  for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
const crc32 = (buf) => { let c = ~0; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return ~c >>> 0; };
const pack = (fields) => {
  const b = Buffer.alloc(fields.reduce((n, [size]) => n + size, 0));
  let o = 0;
  for (const [size, v] of fields) { if (size === 2) b.writeUInt16LE(v, o); else b.writeUInt32LE(v, o); o += size; }
  return b;
};

function sourceDate() {
  const env = process.env.SOURCE_DATE_EPOCH;
  if (/^\d+$/.test(env ?? '')) return Number(env);
  const r = spawnSync('git', ['log', '-1', '--format=%ct'], { cwd: ROOT, encoding: 'utf8' });
  return r.status === 0 && /^\d+\s*$/.test(r.stdout) ? Number(r.stdout) : 0;
}

function zip(entries, epoch) {
  const d = new Date(Math.max(epoch, 315532800) * 1000); // zip 的时间从 1980 年起
  const time = (d.getUTCHours() << 11) | (d.getUTCMinutes() << 5) | (d.getUTCSeconds() >> 1);
  const date = ((d.getUTCFullYear() - 1980) << 9) | ((d.getUTCMonth() + 1) << 5) | d.getUTCDate();
  const body = [], central = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const fname = Buffer.from(name, 'utf8');
    const deflated = deflateRawSync(data, { level: 9 });
    const [method, stored] = deflated.length < data.length ? [8, deflated] : [0, data];
    const mode = data[0] === 0x23 && data[1] === 0x21 ? 0o100755 : 0o100644; // 带 #! 的脚本给可执行位
    const common = [[2, 20], [2, 0x0800], [2, method], [2, time], [2, date], [4, crc32(data)], [4, stored.length], [4, data.length], [2, fname.length], [2, 0]];
    const local = pack([[4, 0x04034b50], ...common]);
    body.push(local, fname, stored);
    central.push(pack([[4, 0x02014b50], [2, 0x0314], ...common, [2, 0], [2, 0], [2, 0], [4, mode * 0x10000], [4, offset]]), fname);
    offset += local.length + fname.length + stored.length;
  }
  const cd = Buffer.concat(central);
  const end = pack([[4, 0x06054b50], [2, 0], [2, 0], [2, entries.length], [2, entries.length], [4, cd.length], [4, offset], [2, 0]]);
  return Buffer.concat([...body, cd, end]);
}

const checkOnly = process.argv.includes('--check');
console.log(`检查 skill/${NAME}/`);
checkFrontmatter();
checkReferences();
checkOrphans();
checkEncoding();
checkCounter();
checkClean();
checkVerifiers();

if (failures.length) {
  console.log(`\n${failures.length} 项没通过` + (checkOnly ? '。' : ',不打包。'));
  process.exitCode = 1;
} else if (checkOnly) {
  console.log(`\n全部通过${hasSource ? '。' : '(原文底本相关检查因公开发布版缺席而跳过)。'}`);
} else {
  const entries = files.map((f) => ({
    name: `${NAME}/${f}`,
    data: f === 'SKILL.md' ? Buffer.from(packedSkillMd, 'utf8') : readFileSync(join(SKILL, f)),
  }));
  const out = zip(entries, sourceDate());
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, out);
  const raw = entries.reduce((n, e) => n + e.data.length, 0);
  console.log(`\n全部通过,已打包 ${relative(ROOT, OUT).replaceAll('\\', '/')}:${entries.length} 个文件,`
    + `${(raw / 1024).toFixed(1)} KB 压到 ${(out.length / 1024).toFixed(1)} KB,sha256 ${createHash('sha256').update(out).digest('hex').slice(0, 16)}`);
}
