# gentle-introduction-skill

**简体中文** | [English](README.en.md)

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

通用写作方法论 skill:把复杂主题写成读者能一路跟上、亲手验证、读完信任的深度解释文;蒸馏自 Distill 名篇,不绑定领域。对 LLM 它是一套指令,对人它是一本可独立阅读的写作手册。

适合讲机制、原理与「为什么」的解释性写作,不用于 API 文档、新闻快讯、营销文案、小说(篇目与出处见文末)。装好之后能写出什么,先看一段实物:

> 样例一瞥(摘自 `distill-analysis/test-2-sample.md`,任务:向家庭厨师解释美拉德反应):
>
> 美拉德反应分三步:
> 1. 肉表面的氨基酸和糖*碰*上;
> 2. 热把两者各自*拆*开;
> 3. 碎块重新*拼*成几百种新分子,一部分*飘*进鼻子——那就是香味。
>
> 这像两盒乐高:块数有限,拼法一变,造型全变。不过乐高拼完零件还在,锅里是零件被拆掉重造——「组合」的直觉可以借用,「零件不变」不能。

## 目录

- [怎么用这个 skill](#怎么用这个-skill)
  - [三个指令](#三个指令)
  - [篇幅分档](#篇幅分档)
- [方法论概览(十条核心哲学)](#方法论概览十条核心哲学)
- [仓库里有什么](#仓库里有什么)
- [复现、核验与打包](#复现核验与打包)
- [出处与许可](#出处与许可)

## 怎么用这个 skill

`skill/gentle-introduction-skill/` 是一个自包含目录,复制进所用工具的 skills 目录即装,不装依赖、不改配置。按你用的工具对号入座;一台机器上多个工具想一次装全,见本节末的「本机批量安装」。

**在 Claude Code 里**:把 `skill/gentle-introduction-skill/` 整个目录复制到 `~/.claude/skills/`(用户级,全局生效)或项目内 `.claude/skills/`(仅本项目)。之后用 `/gentle-introduction-skill` 加指令调用(见下),或直接对模型说「深入浅出地讲清 X」「帮我看看这篇科普稿」「像 Distill 那样写」,按 description 自动触发。

**在 ZCode 里**:同一目录复制到 `~/.agents/skills/`(用户级)或项目内 `.agents/skills/`(仅本项目);触发方式同上,也可用 `/skill gentle-introduction-skill` 强制加载,指令词写在消息里。

**在 claude.ai 里**:先运行 `npm run build`(需要 Node 18 以上,没有依赖要装),再把生成的 `dist/gentle-introduction-skill.zip` 在 claude.ai 的 skills 设置里上传,指令词写在消息里。zip 里的 SKILL.md 比源文件少 `when_to_use` 和 `argument-hint` 两个宿主专用字段,原因见「复现、核验与打包」;用 Skills API 上传时限制相同,用 zip 里的那份。

**在 Codex CLI、Gemini CLI、Qwen、OpenCode、iFlow 里**:把 `skill/gentle-introduction-skill/` 复制到对应工具的用户级 skills 目录(`~/.codex/skills/`、`~/.gemini/skills/`、`~/.qwen/skills/`、`~/.iflow/skills/`,OpenCode 用 `~/.config/opencode/skills/` 或 `~/.opencode/skills/`,完整清单见 `tools/install.sh`),触发方式同 Claude Code;或直接跑下面的 `tools/install.sh` 一键装全。

**在不支持 skills 目录的模型/工具里**:`skill/gentle-introduction-skill/SKILL.md` 是自包含的总纲,可直接作为系统提示词或写作手册使用。

**作为人类读者**:从 `distill-analysis/00-synthesis.md` 读起;卡在具体问题时查 `skill/gentle-introduction-skill/references/` 对应分册(各分册开头有「何时读本册」)。

**本机批量安装**:仓库根目录运行 `tools/install.sh`,把 skill 覆盖安装到本机检测到的全部 agent skill 目录(`~/.agents`、`~/.zcode`、`~/.claude`、`~/.codex`、`~/.gemini`、OpenCode 两个路径、`~/.qwen`、`~/.iflow`,存在才装,可再传额外目录参数);装完逐字节校验,更新 skill 后重跑一遍即可同步各副本。

### 三个指令

格式:`/gentle-introduction-skill <指令> <对象> [长度] [其他要求]`

| 指令 | 做什么 | 交付 | 例子 |
|---|---|---|---|
| `write` | 从零写一篇 | 成稿 + 一小段交付说明 | `/gentle-introduction-skill write 为什么打过疫苗的身体能记住病毒 3000字 读者是高中生` |
| `review` | 审稿,只诊断不改写 | 审阅报告:总评、按严重度排序的问题清单(要紧的附示范改法)、值得保留的地方、待核实的事实 | `/gentle-introduction-skill review @drafts/hash-table.md` |
| `revise` | 改稿 | 改后全文 + 至多 5 条改动说明 + 「请核实」清单 | `/gentle-introduction-skill revise drafts/hash-table.md 缩写到800字以内` |

- 指令也认中文:写/起草、审/审阅/提意见、改/改写/润色。不写指令词时按请求推断;只贴稿子、没说要什么,默认先审,报告末尾问要不要直接改。
- 没写的参数用默认值(读者是聪明但不懂行的成年人,媒介是静态图文,语言跟随用户),交付说明里一句话交代用了哪些,不停下来追问;只有缺了主题或稿子才问。
- 对象是文件路径时:write 可指定输出路径;revise 的改后稿另存为 `<原名>.revised.md`,明确要求才覆盖原稿;review 的报告在对话里交付,要存档时存为 `<原名>.review.md`。存进文件的只有稿子本身,说明留在对话里。
- 做成 `/gentle-introduction-skill` 的子命令,而不是三个独立的 skill:Claude Code 自带 `/review`(`/code-review` 的别名),同名的用户 skill 会遮住它。

### 篇幅分档

长度写字数(「1500字」「3000 words」)或档名都行,流程、结构与自查清单随档缩放:

| 档 | 篇幅 | 结构 |
|---|---|---|
| 对话级 | ≤800 字 | 不分节:缺口 → 最小例 → 机制 → 类比断点 → 读者能自己验证的一步 |
| 短文 | 800–2000 字 | 九段骨架压成 3–5 节 |
| 中篇 | 2000–4000 字 | 保留开篇、以已知引入、核心挑战、核心机制、收束,4–6 节 |
| 长文 | 4000 字以上 | 完整九段,7–12 节 |
| 系列 | 多篇连载 | 先交系列规划,默认只写第一篇;字数逐篇算;全系列共用一张主词表,坐标系固定,参照系可按轴各选 |

字数口径:汉字、标点和符号各算一个字,连着的英文字母或数字串算一个字,空白和 Markdown 符号不算;英文稿按词数计,各档界限约取一半。`skill/gentle-introduction-skill/scripts/count.mjs` 按这个口径数数、报上限余量和各节占比(零依赖,Node 18 以上)。约数与上限的判定、只给档名时的默认篇幅、revise 缩写砍什么扩写补什么——这些细则见 `skill/gentle-introduction-skill/SKILL.md` 的「规模分档」「交付约定」「revise|改稿」与 `skill/gentle-introduction-skill/references/structure-templates.md`「伸缩指南」。

## 方法论概览(十条核心哲学)

1. 章节顺序服从「读者下一秒会问什么」,不服从学科知识的逻辑
2. 复杂度棘轮:每前进一步只增加一个机制,且增量点名三遍
3. 缺陷链推进:每级以自曝缺陷收尾,下一级以缺陷陈述开场
4. 缺口先于名词;一支术语表全文不换口径
5. 体验先于术语:参与不能后置,理解可以后置
6. 双参照系锚定,坐标系先行
7. 类比自带断点;反常识显式命名并预付回报
8. 隐喻负责动机,精确定义负责定义;符号晚于口头程序
9. 深度是可展期的债务(前向指针 + 命名容器)
10. 诚实优先于说服;归属是礼仪;信任读者是同行

完整展开见 `skill/gentle-introduction-skill/SKILL.md`。

## 仓库里有什么

只想把 skill 用起来,上面几节就够了;下面这份清单给想深挖方法论的读者和要复现核验的人。

| 路径 | 内容 | 给谁看 |
|---|---|---|
| `skill/gentle-introduction-skill/` | **主交付物**:写作 skill,三个指令(write 写 / review 审 / revise 改),篇幅从几段话到系列连载分五档。SKILL.md(总纲)+ 五本分册(结构模板 / 49 条中英双骨架句式库 / 概念引入 / 图示策略 / 终稿自查)+ 字数脚本 `scripts/count.mjs` | 给 LLM(作为指令)与人(作为手册) |
| `distill-analysis/00-synthesis.md` | 综合方法论全文:14 条写作哲学 + 75 条方法与句式 + 写作六阶段流程 | 想通读方法论的读者 |
| `distill-analysis/01-08 各册` | 八维度逐字级分析(宏观结构 / 开篇收束 / 概念引入 / 逐字句式 / 类比 / 图示修辞 / 认知负荷 / 学术诚实),`01-structure.md` 至 `08-credibility.md`,每册含 12+ 条带章节标注的原文逐字引文 | 想深挖某个侧面的读者 |
| `distill-analysis/test-1-sample.md`、`distill-analysis/test-2-sample.md` | 双任务实测样例(Transformer 注意力 / 美拉德反应),附「实际运用了哪些规则」自证清单;由修订前的旧版 skill 生成,清单中个别规则已勘误(见各文件头注) | 想看 skill 实际效果的人 |
| `distill-analysis/article.md` | 原文清洗后的全文 markdown(由 `source/gnn-intro.html` 生成,可逐字节复现)。**仅源仓库(私有)含此文件与 `source/` 存档**——原文全文依作者 CC-BY 4.0,不随公开发布仓库再分发;公开发布版中它是引文核验脚本的输入,缺席时相关脚本自动跳过 | 全部引文的核对底本 |
| `source/gnn-intro.html` | 原文 HTML 原样存档(214KB)。仅源仓库,公开版不含 | 复现与溯源 |
| `tools/` | 清洗、核验与打包脚本(见下) | 复现者 |

## 复现、核验与打包

全部命令从仓库根目录运行。一条命令跑完下面所有核验,外加 skill 包自身的检查;需要 Node 18 以上,没有依赖要装:

```bash
npm run check   # 只检查,即 node tools/build.mjs --check
npm run build   # 全部通过后打包出 dist/gentle-introduction-skill.zip,即 node tools/build.mjs
```

skill 包自身的检查:SKILL.md 的 frontmatter 合规(name 与目录名一致,description 不超过 1024 个字符、不含尖括号);文档里反引号括起的文件路径都找得到;`references/`、`scripts/` 下的文件都在 SKILL.md 里提到;文本文件是 UTF-8、无 BOM、LF 行尾;字数脚本的样例计数不变;skill 引用的统计数字(词频/句长/段长/图注)按统一口径重算比对。清洗管线在临时目录重跑,不碰仓库里的 `article.md`。任何一项不过都以非零退出码结束,不出包。原文底本(`source/gnn-intro.html` 与 `distill-analysis/article.md`)仅在源仓库(私有)中,公开发布版缺席时,依赖原文的检查(清洗管线与五个核验脚本)自动跳过并逐项提示,其余检查与打包照常。

zip 的根目录是 `gentle-introduction-skill/` 文件夹。claude.ai 上传和 Skills API 只认 Agent Skills 规范的六个 frontmatter 字段(name、description、license、compatibility、metadata、allowed-tools),多一个就拒收,所以 zip 里的 SKILL.md 按 `tools/build.mjs` 的字段白名单自动去掉了宿主专用字段——`argument-hint`(Claude Code 参数提示)和 `when_to_use`(ZCode 触发补充),`license`(CC-BY-NC-4.0)在白名单内保留;其余文件与源目录逐字节相同;在 Claude Code 里照旧直接复制源目录。文件按路径排序,时间戳取最后一次提交的时间(可用 `SOURCE_DATE_EPOCH` 覆盖),同一版 Node 下重复打包逐字节相同。`dist/` 不入库。

也可以逐个运行(以下 1–4 依赖原文底本,仅在含 `source/` 与 `distill-analysis/article.md` 的源仓库可用):

```bash
# 1. 清洗管线:source/gnn-intro.html → distill-analysis/article.md(输出逐字节确定)
node tools/clean.js

# 2. 引文忠实度:skill 六个文件中所有 «…» 引文是否为 article.md 的逐字子串,
#    引文后括注的 § 小节标签是否与引文在原文中的实际小节一致
node tools/check-quotes.mjs
# → TOTAL quotes=156 failures=0; § labels checked=120 mismatches=0

# 3. 综合文档引文核验(182 条)
node tools/check-synthesis.mjs

# 4. 八维度分析册引文抽验
node tools/verify-analysis-quotes.js
node tools/verify-analysis-doc.js
```

所有核验脚本发现不符时以非零退出码结束;接 CI 或 pre-commit 时跑 `npm run check` 一条即可。统计口径(正文区段、分句规则、词频是否含图注)写在 `tools/check-stats.mjs` 文件头。各分析册「核对记录」里提到的 `_check_synth.mjs`、`_tmp_analyze.mjs` 等是撰写时的会话临时脚本,没有入库;可复现的核验以 `tools/` 下的脚本为准(勘误见 `00-synthesis.md` 口径统一 #7)。

## 出处与许可

- 方法论蒸馏自:Benjamin Sanchez-Lengeling, Emily Reif, Adam Pearce, Alexander B. Wiltschko, *A Gentle Introduction to Graph Neural Networks*, Distill 2021, DOI: 10.23915/distill.00033, https://distill.pub/2021/gnn-intro/ (CC-BY-4.0)
- 仓库中所有 «…» 与引号内的英文引文均为该文逐字摘录,仅作句式锚例:skill 六个文件的 156 条引文由 `tools/check-quotes.mjs` 核验,00-synthesis 的 182 条由 `tools/check-synthesis.mjs` 核验,07 册由 `tools/verify-analysis-doc.js` 核验;其余各册的引文核对记录见各册文内「核对记录」。`source/gnn-intro.html` 为该网页原样存档,依 CC-BY-4.0 再分发,署名如上。
- 本仓库的中文分析与 skill 内容:CC BY-NC 4.0(署名—非商用,许可全文见根目录 [LICENSE](LICENSE))。文中 «…» 与引号内的英文短引文为原作逐字摘录,仅作句式锚例,依原作 CC-BY-4.0 署名使用(署名见上),不随本仓库许可改变;原文全文存档(`source/gnn-intro.html`)与清洗全文(`distill-analysis/article.md`)仅保留在私有源仓库,公开发布版不再分发。贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。
