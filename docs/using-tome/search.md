---
title: Search
sidebar_position: 2
---

# Search

A catalog of any useful size stops being browsable fast — one plugin in the
demo catalog carries 28 entries on its own. You shouldn't have to remember
what anything is called. Tome indexes every enabled skill and command so you
can ask for what you mean and get the right entry back.

## `tome query`

```bash
tome query "verify a Compact contract"
```

```text
|   Score | Catalog         | Plugin          | Skill                                     | Version | Path                                                      |
|---------|-----------------|-----------------|-------------------------------------------|---------|-----------------------------------------------------------|
|  4.7874 | midnight-expert | midnight-verify | midnight-verify:verify-by-execution       | 0.13.0  | skills/midnight-verify:verify-by-execution/SKILL.md       |
|  3.4658 | midnight-expert | midnight-verify | midnight-verify:verify-by-zkir-checker    | 0.13.0  | skills/midnight-verify:verify-by-zkir-checker/SKILL.md    |
|  3.1529 | midnight-expert | midnight-verify | midnight-verify:verify-compact            | 0.13.0  | skills/midnight-verify:verify-compact/SKILL.md            |
|  2.7010 | midnight-expert | midnight-verify | midnight-verify:verify-by-witness         | 0.13.0  | skills/midnight-verify:verify-by-witness/SKILL.md         |
|  1.4746 | midnight-expert | midnight-verify | midnight-verify:verify-by-cli-execution   | 0.13.0  | skills/midnight-verify:verify-by-cli-execution/SKILL.md   |
|  0.0356 | midnight-expert | midnight-verify | midnight-verify:verify                    | 0.13.0  | commands/midnight-verify:verify.md                        |
| -0.4743 | midnight-expert | midnight-verify | midnight-verify:verify-by-source          | 0.13.0  | skills/midnight-verify:verify-by-source/SKILL.md          |
| -1.0289 | midnight-expert | midnight-verify | midnight-verify:verify-by-zkir-inspection | 0.13.0  | skills/midnight-verify:verify-by-zkir-inspection/SKILL.md |
| -1.2946 | midnight-expert | midnight-verify | midnight-verify:verify-tooling            | 0.13.0  | skills/midnight-verify:verify-tooling/SKILL.md            |
| -3.3564 | midnight-expert | midnight-verify | midnight-verify:verify-ledger             | 0.13.0  | skills/midnight-verify:verify-ledger/SKILL.md             |
```

The right skill is at the top with a clear margin, and the scores fall off
honestly — all the way below zero for entries that merely share vocabulary
with the query.

Search runs in two stages:

1. **KNN retrieval** — your query is embedded with a local model and matched
   against the vector index to pull back the nearest candidates.
2. **Reranking** — a local cross-encoder reranker re-scores those candidates so
   the most relevant results rise to the top.

Both models run on your machine; nothing is sent anywhere.

## Scoping and flags

| Flag | Effect |
| --- | --- |
| `--top-k <n>` | Return at most *n* results. |
| `--min-score <s>` | Drop results scoring below *s*. |
| `--no-rerank` | Skip the reranking stage; results come back in raw KNN order. |
| `--catalog <name>` | Restrict the search to a single catalog. |
| `--plugin <name>` | Restrict the search to a single plugin. |
| `--strict` | Fail (non-zero exit) instead of returning weak results when nothing meets the bar. |
| `--json` | Emit machine-readable output. |

### Trimming the list with `--top-k`

```bash
tome query "verify a Compact contract" --top-k 3
```

```text
|  Score | Catalog         | Plugin          | Skill                                  | Version | Path                                                   |
|--------|-----------------|-----------------|----------------------------------------|---------|--------------------------------------------------------|
| 4.3648 | midnight-expert | midnight-verify | midnight-verify:verify-by-execution    | 0.13.0  | skills/midnight-verify:verify-by-execution/SKILL.md    |
| 3.8602 | midnight-expert | midnight-verify | midnight-verify:verify-by-zkir-checker | 0.13.0  | skills/midnight-verify:verify-by-zkir-checker/SKILL.md |
| 3.6187 | midnight-expert | midnight-verify | midnight-verify:verify-compact         | 0.13.0  | skills/midnight-verify:verify-compact/SKILL.md         |
```

Same query, same top three entries — different scores than the ten-result run
above. Reranker scores are relative to the candidate set, not absolute, so
compare scores within a single run, never across runs.

## Why search matters: load on demand

The point of search is **load on demand**. Instead of stuffing every skill into
your agent's context up front, the agent searches at runtime and loads only what
the current task needs. That:

- **protects the context window** — skills that aren't relevant never take up
  space;
- **cuts token spend** — you pay for the skills you use, not your whole library;
- **scales** — a large catalog stays usable because retrieval, not context size,
  does the filtering.

To make it concrete: the top hit above, `verify-by-execution`, is a single
SKILL.md of 11,652 characters (1,539 words). Loading it costs one skill's
worth of context — the plugin's other 27 entries stay on the shelf.

Inside a configured harness, this same search runs over the
[MCP server](./mcp-server.md), so your agent gets search and skill loading
without you running `tome query` by hand.

## Pitfalls

| Exit code | What happened | What to do |
| --- | --- | --- |
| `40` | `--strict` was set and no result met the bar. | Expected in scripts — treat it as "no match", or loosen the query. See [exit codes](../reference/exit-codes.md). |

## Where next

- [MCP server](./mcp-server.md) — the same search, driven by your agent
  mid-task.
- [Plugins & catalogs](./plugins-and-catalogs.md) — what gets indexed, and
  when.
