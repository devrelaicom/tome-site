---
title: Search
sidebar_position: 2
---

# Search

Tome indexes every enabled skill and command so you can find the right one by
meaning, not just by name.

## `tome query`

```bash
tome query "verify a Compact contract"
```

Search runs in two stages:

1. **KNN retrieval** — your query is embedded with a local model and matched
   against the vector index to pull back the nearest candidates.
2. **Reranking** — a local cross-encoder reranker re-scores those candidates so
   the most relevant results rise to the top.

Both models run on your machine; nothing is sent anywhere.

## Scoping and flags

| Flag | Effect |
| --- | --- |
| `--catalog <name>` | Restrict the search to a single catalog. |
| `--plugin <name>` | Restrict the search to a single plugin. |
| `--strict` | Fail (non-zero exit) instead of returning weak results when nothing meets the bar. |
| `--json` | Emit machine-readable output. |

With `--strict`, a search that finds nothing relevant exits non-zero rather than
returning low-confidence matches — useful in scripts.

## Why search matters: load on demand

The point of search is **load on demand**. Instead of stuffing every skill into
your agent's context up front, the agent searches at runtime and loads only what
the current task needs. That:

- **protects the context window** — skills that aren't relevant never take up
  space;
- **cuts token spend** — you pay for the skills you use, not your whole library;
- **scales** — a large catalog stays usable because retrieval, not context size,
  does the filtering.

Inside a configured harness, this same search runs over the
[MCP server](./mcp-server.md), so your agent gets search and skill loading
without you running `tome query` by hand.
