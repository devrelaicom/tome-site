---
title: Commands reference
sidebar_position: 1
---

# Commands reference

Every Tome command, its subcommands, and the flags you'll reach for most. Tome
exits `0` on success and a specific non-zero code on failure — see
[Exit codes](../reference/exit-codes.md).

## `tome catalog`

Manage catalogs (git repos of plugins).

| Subcommand | Purpose |
| --- | --- |
| `add <repo>` | Clone, parse, and index a catalog. |
| `remove <name>` | Remove a catalog. `--force` cascades to disable its plugins. |
| `list` | List added catalogs. |
| `update <name>` | Pull and re-index a catalog. |
| `show <name>` | Show a catalog's plugins and entries. |

## `tome plugin`

Manage plugin lifecycle.

| Subcommand | Purpose |
| --- | --- |
| `enable <name>` | Enable a plugin's entries. |
| `disable <name>` | Disable a plugin. |
| `list` | List plugins, grouping Skills and Commands with per-entry annotations. |
| `show <name>` | Show a plugin's entries with annotations. |

Bare `tome plugin` opens an interactive catalog → plugin → action picker.

## `tome query`

Semantic search across enabled skills and commands (KNN + reranker).

Key flags: `--catalog <name>`, `--plugin <name>`, `--strict` (fail instead of
returning weak results), `--json`. See [Search](../using-tome/search.md).

## `tome models`

Manage the local embedding and rerank models, against a pinned registry.

| Subcommand | Purpose |
| --- | --- |
| `download` | Download a registered model. |
| `list` | List models and their on-disk state. |
| `remove` | Remove a downloaded model. |

## `tome reindex`

Rebuild the search index.

```bash
tome reindex                      # everything
tome reindex <catalog>            # one catalog
tome reindex <catalog>/<plugin>   # one plugin
```

Add `--force` to rebuild from scratch.

## `tome status`

Read-only pre-flight check. **Never takes the index lock.** Flags: `--verify`,
`--json`. See [Troubleshooting](../using-tome/troubleshooting.md).

## `tome doctor`

Report on and repair every subsystem. **Read-only by default.** Flags: `--fix`
(repair), `--force` (apply held-back fixes), `--verify`, `--json`.

## `tome workspace`

Per-project scopes and composition.

| Subcommand | Purpose |
| --- | --- |
| `use <name>` | Switch the active workspace. |
| `init <name>` | Create a workspace. |
| `list` | List workspaces. |
| `info` | Show the active workspace and composition. |
| `rename <a> <b>` | Rename a workspace. |
| `regen-summary` | Regenerate the workspace summary. |
| `remove <name>` | Remove a workspace. |
| `sync` | Reconcile the workspace with current state. |

See [Workspaces](../using-tome/workspaces.md).

## `tome harness`

Configure target coding agents (Claude Code, Cursor, Codex, Gemini CLI,
OpenCode).

| Subcommand | Purpose |
| --- | --- |
| *(bare)* | Interactive picker. |
| `use <name>` | Write native config for a harness. |
| `list` | List configured harnesses. |
| `info <name>` | Show what Tome manages for a harness. |
| `sync` | Re-write native config from current state. |
| `remove <name>` | Remove Tome-managed config for a harness. |

See [Harnesses](../using-tome/harnesses.md).

## `tome mcp`

Run Tome as an MCP server. Exposes the `search_skills`, `get_skill`, and
`get_skill_info` tools plus user-invocable entries as MCP prompts. See the
[MCP server](../using-tome/mcp-server.md).

## Global behaviour

- `--json` is available on the read-only inspection commands and is orthogonal to
  logging (which goes to stderr).
- On `SIGINT` (Ctrl-C), Tome exits with code `8`.
- Every failure class has its own [exit code](../reference/exit-codes.md).
