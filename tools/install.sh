#!/usr/bin/env bash
# 把 skill/gentle-introduction-skill 覆盖安装到本机所有 agent 的 skill 目录。
# 用法: tools/install.sh [额外目标 skills 目录...]
#   - 标准位置存在才安装,不存在的自动跳过;额外目标必须已存在
#   - 重复运行安全:同名副本先删后拷,装完逐字节校验
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/skill/gentle-introduction-skill"

# 本机各 agent 的用户级 skill 目录
CANDIDATES=(
  "$HOME/.agents/skills"           # 跨工具标准位(ZCode 等亦读取)
  "$HOME/.zcode/skills"            # ZCode 专属(同名时优先于 ~/.agents)
  "$HOME/.claude/skills"           # Claude Code
  "$HOME/.codex/skills"            # Codex CLI
  "$HOME/.gemini/skills"           # Gemini CLI
  "$HOME/.config/opencode/skills"  # OpenCode(config 路径)
  "$HOME/.opencode/skills"         # OpenCode(兼容路径)
  "$HOME/.qwen/skills"             # Qwen CLI
  "$HOME/.iflow/skills"            # iFlow
)

TARGETS=()
for d in "${CANDIDATES[@]}"; do
  if [ -d "$d" ]; then TARGETS+=("$d"); fi
done
for d in "$@"; do
  if [ -d "$d" ]; then TARGETS+=("$d"); else echo "跳过(不存在): $d" >&2; fi
done

if [ "${#TARGETS[@]}" -eq 0 ]; then
  echo "未发现任何 agent skill 目录;可显式传目标目录" >&2
  exit 1
fi

fail=0
for d in "${TARGETS[@]}"; do
  dst="$d/gentle-introduction-skill"
  rm -rf "$dst"
  cp -R "$SRC" "$dst"
  chmod +x "$dst/scripts/count.mjs"
  if diff -r "$SRC" "$dst" >/dev/null 2>&1; then
    echo "OK   $dst"
  else
    echo "FAIL $dst" >&2
    fail=1
  fi
done
exit $fail
