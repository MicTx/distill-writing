# 贡献指南

本仓库是从 Distill 名篇逐字级蒸馏出的写作方法论与 LLM 写作 skill,核心资产是**带核验的引文与数字**。改动前先读 [README.md](README.md) 的「复现、核验与打包」一节。

## 改动前

- 需要 Node 18 以上;没有其他依赖要装。
- 跑一遍基线:`npm run check`,确认起点是全绿。

## 改什么

- **skill 内容**(`skill/gentle-introduction-skill/`):SKILL.md 是自包含总纲,references/ 分册各管一个侧面;改动要跨文件一致——SKILL.md 的「References 路由表」与各分册互相指向,别只改一头。
- **引文**:所有 «…» 引文必须是原文的逐字子串,并带 § 小节标注;改引文先在原文核对(源仓库用 `distill-analysis/article.md` 核对底本;公开发布版无原文底本,引文改动请在源仓库进行)。
- **数字**:skill 与 README 引用的统计数字(引文条数、词频、句长、图注)由 `tools/check-stats.mjs` 按统一口径复核;改动相关内容后数字要同步。

## 提交前

`npm run check` 必须全绿再提交——它跑 skill 包全部自检(frontmatter 合规、反引号路径存在、无孤儿文件、编码、引文忠实度、统计数字复核、清洗管线逐字节复现),任何一项不过都以非零退出码结束。接 CI 或 pre-commit 时跑这一条即可。公开发布版(无原文底本)中依赖原文的检查项自动跳过,skill 自身的检查(前五项)照常把关。

## 打包

`npm run build` 产出 `dist/gentle-introduction-skill.zip`(claude.ai 上传用);zip 内 SKILL.md 自动去掉宿主专用字段,`dist/` 不入库。
