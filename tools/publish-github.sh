#!/usr/bin/env bash
# 公开发布快照:git.mxk.dev 私有真源 → GitHub MicTx/gentle-introduction-skill 公开载荷。
# 用法: tools/publish-github.sh [--dry-run] [--keep]
#   --dry-run  走完全部门禁与快照构建,但不推送、不建提交历史
#   --keep     失败时保留临时目录供排查
#
# 背景:2026-10-04 发布事故——快照误用未提交的工作区(hasSource 改动未提交,
# HEAD 还是旧 build.mjs),推上 GitHub 后公开版 npm run check 直接 ENOENT 崩溃,
# 直到 clone 实测才暴露。本脚本把事故的每道手工检查固化为门禁:
#   门禁 1  干净树:工作区必须与 HEAD 一致(git archive 只含已提交状态,
#            脏树意味着你要发布的内容和验证过的内容不是同一份)
#   门禁 2  排除清单:.spec/、source/、distill-analysis/article.md 不进公开库
#            (.spec/ 是内部过程目录;后两者是原文全文,依原作 CC-BY 4.0
#            不可改非商用,公开面要全 NC 就只能不分发,仅存私有真源)
#   门禁 3  快照内自检:在快照目录实跑 node tools/build.mjs --check,
#            原文底本缺席应优雅 skip(这正是上次事故的崩溃点)
#   门禁 4  私密扫描:快照内容 grep 敏感模式,0 命中才可推
set -euo pipefail

REMOTE_REPO="https://github.com/MicTx/gentle-introduction-skill.git"
EXCLUDES=('.spec' 'source' 'distill-analysis/article.md')
SCAN_PATTERN='mxk\.dev|192\.168\.|administrator@|api[_-]?key|SECRET_KEY'
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DRY_RUN=0; KEEP=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --keep) KEEP=1 ;;
    *) echo "未知参数: $arg(可用: --dry-run --keep)" >&2; exit 2 ;;
  esac
done

cleanup() { [ "$KEEP" = 1 ] || rm -rf "$SNAP"; }
SNAP="$(mktemp -d "${TMPDIR:-/tmp}/distill-publish-XXXXXX")"
trap cleanup EXIT

# ---- 门禁 1:干净树 ----
echo "== 门禁 1/4: 工作区与 HEAD 一致 =="
if ! git -C "$ROOT" diff --quiet HEAD -- 2>/dev/null || ! git -C "$ROOT" diff --cached --quiet HEAD -- 2>/dev/null; then
  echo "FAIL 工作区有未提交改动。git archive 只含已提交状态——先提交再发布,否则快照里的内容不是你验证过的那份。" >&2
  echo "     (这正是 2026-10-04 事故:hasSource 改动未提交,快照带上了旧 build.mjs)" >&2
  git -C "$ROOT" status --short >&2
  exit 1
fi
UNTRACKED=$(git -C "$ROOT" status --porcelain | grep -c '^??' || true)
if [ "$UNTRACKED" -gt 0 ]; then
  echo "FAIL 存在未跟踪文件。请先 git add 提交或确认它们不需要发布:" >&2
  git -C "$ROOT" status --short | grep '^??' >&2
  exit 1
fi
echo "ok    干净树,HEAD 即待发布状态:$(git -C "$ROOT" rev-parse --short HEAD)"

# ---- 门禁 2:快照构建(archive 已提交状态 + 排除) ----
echo "== 门禁 2/4: 快照构建与排除清单 =="
git -C "$ROOT" archive HEAD | tar -x -C "$SNAP"
for ex in "${EXCLUDES[@]}"; do
  if [ -e "$SNAP/$ex" ]; then rm -rf "$SNAP/$ex"; echo "ok    已排除 $ex"
  else echo "FAIL 排除项 $ex 在 HEAD 中不存在——排除清单与仓库结构脱节,请更新脚本" >&2; exit 1; fi
done
BLOBS=$(find "$SNAP" -type f -not -path '*/.git/*' | wc -l | tr -d ' ')
echo "ok    快照 $BLOBS 个文件"

# ---- 门禁 3:快照内自检(事故崩溃点) ----
echo "== 门禁 3/4: 快照内 npm check 自检 =="
CHECK_OUT="$(cd "$SNAP" && node tools/build.mjs --check 2>&1)" || {
  echo "FAIL 快照内自检未通过——公开仓库将无法自检(上次事故的崩溃点):" >&2
  printf '%s\n' "$CHECK_OUT" | tail -8 >&2
  exit 1
}
printf '%s\n' "$CHECK_OUT" | grep -E '^  (ok|skip)' | sed 's/^/    /'
if printf '%s\n' "$CHECK_OUT" | grep -q '^  skip  清洗管线'; then
  echo "ok    原文底本缺席,原文类检查优雅跳过(公开版预期形态)"
else
  echo "warn  清洗管线未跳过:快照可能包含原文底本,请检查排除清单"
fi

# ---- 门禁 4:私密扫描 ----
echo "== 门禁 4/4: 私密扫描 =="
SCAN_HITS=$(grep -rniE "$SCAN_PATTERN" "$SNAP" \
  --include='*.md' --include='*.json' --include='*.mjs' --include='*.js' --include='*.sh' \
  | grep -v 'publish-github\.sh' | tee /tmp/distill-scan-hits.$$ | wc -l | tr -d ' ' || true)
SCAN_COUNT=$(wc -l < /tmp/distill-scan-hits.$$ | tr -d ' ' || true)
rm -f /tmp/distill-scan-hits.$$
if [ "$SCAN_COUNT" -gt 0 ]; then
  echo "FAIL 私密扫描 $SCAN_COUNT 处命中:" >&2
  grep -rniE "$SCAN_PATTERN" "$SNAP" \
    --include='*.md' --include='*.json' --include='*.mjs' --include='*.js' --include='*.sh' \
    | grep -v 'publish-github\.sh' | head -10 >&2 || true
  exit 1
fi
echo "ok    敏感模式 0 命中($SCAN_PATTERN)"

if [ "$DRY_RUN" = 1 ]; then
  echo "== dry-run:四道门禁全过,未推送。实际发布去掉 --dry-run =="
  exit 0
fi

# ---- 发布:全新历史(作者统一) + 强推 ----
echo "== 发布:重建提交历史并推送 =="
cd "$SNAP"
git init -q -b main
git config user.name "mxk"
git config user.email "dawudcn@qq.com"
git add -A
git commit -q -m "chore(release): 公开发布快照

源: git.mxk.dev/mxk/gentle-introduction-skill (私有真源) $(git -C "$ROOT" rev-parse --short HEAD)
公开面全内容 CC BY-NC 4.0 或原作短引文;原文全文与 .spec/ 不入公开库。
发布工具: tools/publish-github.sh(四道门禁)"
git remote add origin "$REMOTE_REPO"
git push -f origin main
echo "== 发布完成: $REMOTE_REPO (main) =="

# ---- 推送后验证:clone 实测 ----
echo "== 推送后验证: clone 实测 =="
VERIFY_DIR="$(mktemp -d "${TMPDIR:-/tmp}/distill-verify-XXXXXX")"
trap 'rm -rf "$SNAP" "$VERIFY_DIR"' EXIT
git clone -q --depth 1 "$REMOTE_REPO" "$VERIFY_DIR/repo"
(cd "$VERIFY_DIR/repo" && node tools/build.mjs --check >/dev/null 2>&1) || {
  echo "FAIL 远端 clone 自检未通过——请立即排查(远端可能已污染)" >&2
  exit 1
}
rm -rf "$VERIFY_DIR"
echo "ok    远端 clone 自检通过"
echo "全部完成。"
