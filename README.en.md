# gentle-introduction-skill

**English** | [简体中文](README.md)

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

A general-purpose writing-methodology skill: turn any complex topic into a deep explainer that readers can follow all the way, verify with their own hands, and trust by the end. The methodology is distilled from a Distill classic and is not tied to any domain. To an LLM it is a set of instructions; to a human, a self-contained writing manual.

It suits explanatory writing about mechanisms, principles, and the "why" of things — not API docs, news briefs, marketing copy, or fiction (source and attribution at the end). The manuals themselves are written in Chinese; the writing output follows whatever language you ask for. Here is what a finished piece looks like (translated from the Chinese original):

> A glimpse (from `distill-analysis/test-2-sample.md`; task: explain the Maillard reaction to a home cook):
>
> The Maillard reaction runs in three steps:
> 1. Amino acids and sugars on the surface of the meat *meet*;
> 2. Heat *breaks* each of them apart;
> 3. The fragments *reassemble* into hundreds of new molecules, and some *drift* into your nose — that is the aroma.
>
> Think of two boxes of LEGO: the blocks are limited, but change the combinations and the shapes all change. In LEGO the parts survive assembly; in the pan they are taken apart and remade — borrow the "combination" intuition, not "parts stay the same".

## Table of contents

- [Using the skill](#using-the-skill)
  - [Three commands](#three-commands)
  - [Length tiers](#length-tiers)
- [Methodology at a glance (ten core principles)](#methodology-at-a-glance-ten-core-principles)
- [What is in this repository](#what-is-in-this-repository)
- [Reproduce, verify, and package](#reproduce-verify-and-package)
- [Source and license](#source-and-license)

## Using the skill

`skill/gentle-introduction-skill/` is a self-contained directory: copy it into your tool's skills directory and it is installed — no dependencies, no configuration. Find your tool below; to install into every agent tool on one machine at once, see "Bulk install" at the end of this section.

**In Claude Code**: copy the whole `skill/gentle-introduction-skill/` directory to `~/.claude/skills/` (user-level, global) or `.claude/skills/` inside a project (that project only). Then invoke it with `/gentle-introduction-skill` plus a command (below), or just tell the model "explain X clearly for a newcomer", "review this explainer draft", or "write it the way Distill would" — the skill triggers automatically via its description.

**In ZCode**: copy the same directory to `~/.agents/skills/` (user-level) or `.agents/skills/` inside a project (that project only); triggering works the same way, and you can also force-load it with `/skill gentle-introduction-skill` and put the command words in your message.

**On claude.ai**: run `npm run build` first (Node 18+, no dependencies to install), then upload the generated `dist/gentle-introduction-skill.zip` in claude.ai's skills settings, and put the command words in your message. The SKILL.md inside the zip omits two host-specific fields (`when_to_use` and `argument-hint`) compared to the source file — see "Reproduce, verify, and package" for why; the Skills API has the same restriction, use the copy inside the zip.

**In Codex CLI, Gemini CLI, Qwen, OpenCode, iFlow**: copy `skill/gentle-introduction-skill/` into the tool's user-level skills directory (`~/.codex/skills/`, `~/.gemini/skills/`, `~/.qwen/skills/`, `~/.iflow/skills/`; OpenCode uses `~/.config/opencode/skills/` or `~/.opencode/skills/` — full list in `tools/install.sh`); triggering works as in Claude Code, or just run `tools/install.sh` below to install everywhere at once.

**In models/tools without a skills directory**: `skill/gentle-introduction-skill/SKILL.md` is a self-contained master guide — use it directly as a system prompt or as a writing manual.

**As a human reader**: start from `distill-analysis/00-synthesis.md` (in Chinese); when stuck on a specific problem, consult the matching booklet under `skill/gentle-introduction-skill/references/` (each opens with a "when to read this booklet" note).

**Bulk install**: run `tools/install.sh` from the repository root to install the skill into every agent skill directory detected on this machine (`~/.agents`, `~/.zcode`, `~/.claude`, `~/.codex`, `~/.gemini`, both OpenCode paths, `~/.qwen`, `~/.iflow` — only where they exist; extra directories can be passed as arguments). It byte-verifies every copy afterwards; re-run it after updating the skill to sync all copies.

### Three commands

Format: `/gentle-introduction-skill <command> <subject> [length] [other requirements]`

| Command | What it does | Delivers | Example |
|---|---|---|---|
| `write` | write a piece from scratch | finished piece + a short delivery note | `/gentle-introduction-skill write 为什么打过疫苗的身体能记住病毒 3000字 读者是高中生` |
| `review` | diagnose a draft, no rewriting | review report: overall verdict, issues sorted by severity (with sample fixes for the important ones), what is worth keeping, facts to verify | `/gentle-introduction-skill review @drafts/hash-table.md` |
| `revise` | rewrite a draft | full revised text + up to 5 change notes + a "please verify" list | `/gentle-introduction-skill revise drafts/hash-table.md 缩写到800字以内` |

- Chinese synonyms are recognized as well: 写/起草 for write, 审/审阅/提意见 for review, 改/改写/润色 for revise. Without a command word, one is inferred from the request; a pasted draft with no instructions defaults to review, and the report ends by asking whether to revise directly.
- Omitted parameters fall back to defaults (reader: a smart adult outside the field; medium: static text and figures; language: follows yours); the delivery note states which defaults were used instead of stopping to ask. It asks only when the subject (for write) or the draft (for review/revise) is missing.
- When the subject is a file path: write can take an output path; revise saves the revised text as `<name>.revised.md` and overwrites the original only on explicit request; review delivers the report in the conversation and saves it as `<name>.review.md` when archiving is wanted. Only the piece itself is written to files; notes stay in the conversation.
- These are subcommands of `/gentle-introduction-skill` rather than three separate skills: Claude Code ships its own `/review` (an alias of `/code-review`), which a same-named user skill would shadow.

### Length tiers

Give the length as a count ("1500字", "3000 words") or as a tier name; the process, structure, and checklists scale with the tier. English drafts count words, so the boundaries below are roughly half the Chinese ones:

| Tier | Length | Structure |
|---|---|---|
| Conversational | ≤ 400 words | no sections: gap → minimal example → mechanism → analogy breakpoint → a step the reader can verify |
| Short article | 400–1000 words | the nine-part skeleton compressed into 3–5 sections |
| Mid-length | 1000–2000 words | keeps opening, from-known-to-new, core challenge, core mechanism, closing — 4–6 sections |
| Long-form | 2000+ words | the full nine-part skeleton, 7–12 sections |
| Series | multiple parts | a series plan is delivered first, part one written by default; each part is counted on its own; one shared term table across the series, fixed coordinate axes, reference domains may differ per axis |

Counting: Chinese counts characters (each character, punctuation mark, or symbol is one; a run of Latin letters or digits is one; whitespace and Markdown markup do not count); English counts words. `skill/gentle-introduction-skill/scripts/count.mjs` counts by this rule, reports headroom against caps and per-section shares (zero dependencies, Node 18+). How approximate vs. hard limits are decided, default lengths for bare tier names, and what revise cuts or adds when shrinking — these details are in the 「规模分档」「交付约定」 and 「revise|改稿」 sections of `skill/gentle-introduction-skill/SKILL.md` and in the scaling guide of `skill/gentle-introduction-skill/references/structure-templates.md` (both in Chinese).

## Methodology at a glance (ten core principles)

1. Section order follows "what will the reader ask next", not the discipline's own logic
2. Complexity ratchet: each step forward adds exactly one mechanism, and names the increment three times
3. Flaw-chain progression: each level ends by exposing its own flaw; the next level opens by stating it
4. The gap comes before the noun; one term list, one register, never switched mid-text
5. Experience before terminology: participation cannot be deferred, understanding can
6. Anchor every concept in two reference domains; set the coordinate axes up front
7. Every analogy carries its own breakpoint; name the counterintuitive explicitly and prepay the payoff
8. Metaphors motivate; precise definitions define; symbols arrive after the verbal procedure
9. Depth is deferrable debt (forward pointers + a named container)
10. Honesty over persuasion; attribution is etiquette; trust the reader as a peer

Full treatment in `skill/gentle-introduction-skill/SKILL.md` (in Chinese).

## What is in this repository

If you only want to use the skill, the sections above are enough; this inventory is for readers who want to dig into the methodology and for anyone reproducing the verification.

| Path | Contents | For whom |
|---|---|---|
| `skill/gentle-introduction-skill/` | **The main deliverable**: the writing skill — three commands (write / review / revise), five length tiers from a few paragraphs to a serialized series. SKILL.md (master guide) + five booklets (structure templates / 49 bilingual sentence patterns / concept introduction / figure strategy / final checklist) + the counting script `scripts/count.mjs` | LLMs (as instructions) and humans (as a manual) |
| `distill-analysis/00-synthesis.md` | the full synthesis: 14 writing principles + 75 methods and patterns + a six-stage writing process | readers who want the whole methodology |
| `distill-analysis/01–08 booklets` | eight dimension-by-dimension analyses (macro structure / opening and closing / concept introduction / sentence-level patterns / analogies / figure rhetoric / cognitive load / scholarly honesty), `01-structure.md` through `08-credibility.md`, each with 12+ chapter-tagged verbatim quotes from the original | readers digging into one facet |
| `distill-analysis/test-1-sample.md`, `distill-analysis/test-2-sample.md` | two real sample runs (Transformer attention / the Maillard reaction), each with a self-audit list of "which rules were actually applied"; generated by the pre-revision version of the skill, a few rule names in the lists have since been corrected (see each file's header note) | anyone who wants to see the skill's actual output |
| `distill-analysis/article.md` | the source article cleaned into full markdown (generated from `source/gnn-intro.html`, byte-reproducible). **Exists only in the private source repository, together with the `source/` archive** — the full original text is CC-BY 4.0 by its authors and is not redistributed with public releases; in public releases it is the input of the quote-verification scripts, which skip automatically when it is absent | the ground truth for all quote checks |
| `source/gnn-intro.html` | the original HTML archived as-is (214KB). Private source repository only, not part of public releases | reproduction and provenance |
| `tools/` | cleaning, verification, and packaging scripts (below) | reproducers |

## Reproduce, verify, and package

Run everything from the repository root. One command runs all the checks below plus the skill package's own checks; Node 18+, no dependencies to install:

```bash
npm run check   # check only, i.e. node tools/build.mjs --check
npm run build   # after everything passes, packages dist/gentle-introduction-skill.zip, i.e. node tools/build.mjs
```

The skill package's own checks: SKILL.md frontmatter compliance (name matches the directory name, description no longer than 1024 characters, no angle brackets); every backticked file path in the docs resolves; every file under `references/` and `scripts/` is mentioned in SKILL.md; text files are UTF-8, no BOM, LF line endings; the counting script's sample counts are unchanged; the statistics the skill cites (word frequency / sentence length / paragraph length / captions) are recomputed under one convention and compared. The cleaning pipeline reruns in a temp directory and never touches the repository's `article.md`. Any failure exits non-zero and produces no package. The source texts (`source/gnn-intro.html` and `distill-analysis/article.md`) exist only in the private source repository; when absent from a public release, the checks that depend on them (the cleaning pipeline and five verification scripts) skip automatically with a per-item notice, and all other checks and packaging proceed as usual.

The zip's root is a `gentle-introduction-skill/` folder. claude.ai uploads and the Skills API accept only the six frontmatter fields of the Agent Skills spec (name, description, license, compatibility, metadata, allowed-tools) — one extra field and the upload is rejected — so the SKILL.md inside the zip has host-specific fields stripped by the whitelist in `tools/build.mjs`: `argument-hint` (Claude Code parameter hint) and `when_to_use` (ZCode trigger supplement); `license` (CC-BY-NC-4.0) is on the whitelist and stays. All other files are byte-identical to the source directory; in Claude Code, keep copying the source directory directly. Files are sorted by path, timestamps come from the last commit (overridable with `SOURCE_DATE_EPOCH`), and repeated packaging under the same Node version is byte-identical. `dist/` is not committed.

You can also run them one by one (1–4 below depend on the source texts and work only in a repository containing `source/` and `distill-analysis/article.md`):

```bash
# 1. Cleaning pipeline: source/gnn-intro.html → distill-analysis/article.md (byte-deterministic output)
node tools/clean.js

# 2. Quote fidelity: are all «…» quotes in the skill's six files verbatim substrings of article.md,
#    and do the § section labels after the quotes match the sections the quotes actually sit in?
node tools/check-quotes.mjs
# → TOTAL quotes=156 failures=0; § labels checked=120 mismatches=0

# 3. Quote verification for the synthesis document (182 quotes)
node tools/check-synthesis.mjs

# 4. Spot-checks on the eight analysis booklets
node tools/verify-analysis-quotes.js
node tools/verify-analysis-doc.js
```

All verification scripts exit non-zero on mismatch; wire `npm run check` into CI or a pre-commit hook as the single entry point. Counting conventions (body regions, sentence splitting, whether captions count into word frequency) are documented in the header of `tools/check-stats.mjs`. The `_check_synth.mjs`, `_tmp_analyze.mjs` and similar scripts mentioned in the booklets' "verification records" were session-temporary scripts never committed; the reproducible checks are the ones under `tools/` (erratum: `00-synthesis.md`, counting-convention item #7).

## Source and license

- The methodology is distilled from: Benjamin Sanchez-Lengeling, Emily Reif, Adam Pearce, Alexander B. Wiltschko, *A Gentle Introduction to Graph Neural Networks*, Distill 2021, DOI: 10.23915/distill.00033, https://distill.pub/2021/gnn-intro/ (CC-BY-4.0)
- Every «…» and quoted English passage in this repository is a verbatim excerpt of that article, used only as a sentence-pattern anchor: the 156 quotes in the skill's six files are verified by `tools/check-quotes.mjs`, the 182 in 00-synthesis by `tools/check-synthesis.mjs`, booklet 07 by `tools/verify-analysis-doc.js`; the other booklets carry their own inline verification records. `source/gnn-intro.html` is the page archived as-is, redistributed under CC-BY 4.0 with the attribution above.
- The Chinese analyses and skill content in this repository: CC BY-NC 4.0 (Attribution-NonCommercial; full text in the root [LICENSE](LICENSE)). The short English quotes inside «…» and quotation marks are verbatim excerpts of the original work, used as sentence-pattern anchors under the original's CC-BY 4.0 with the attribution above, unaffected by this repository's license; the full-text archive (`source/gnn-intro.html`) and the cleaned full text (`distill-analysis/article.md`) stay in the private source repository and are not redistributed in public releases. Contribution workflow in [CONTRIBUTING.md](CONTRIBUTING.md).
