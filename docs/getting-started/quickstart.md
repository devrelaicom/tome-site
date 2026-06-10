---
title: Quickstart
sidebar_position: 2
---

# Quickstart

Four commands stand between a fresh install and an agent that loads exactly the
skill it needs, mid-task. This page runs them against a real catalog —
`devrelaicom/midnight-expert-tome`, thirteen plugins of Midnight development
expertise — so you can see what success looks like. If you haven't installed
Tome yet, start with [Install](./install.md).

## 1. Add a catalog

A catalog is a git repo of plugins — a volume for the bookshelf. Add it once and
Tome clones it, parses every plugin inside, and registers them all:

```bash
tome catalog add devrelaicom/midnight-expert-tome
```

Tome confirms the add with the ref it pinned and the plugin count — for this
catalog, `plugins: 13`. Nothing is indexed yet: plugins start disabled, and you
choose which ones to read from.

## 2. Enable a plugin

Enabling is the moment a plugin's entries become real: parsed, embedded, and
indexed for search. Plugins are addressed as `<catalog>/<plugin>`:

```bash
tome plugin enable midnight-expert/midnight-verify
```

The first enable offers to download the search models if they're missing (see
[Install](./install.md)). Check the shelf:

```bash
tome plugin list
```

```text
| Catalog         | Plugin                | Version | Status     | Entries                           | Last indexed |
|-----------------|-----------------------|---------|------------|-----------------------------------|--------------|
| midnight-expert | midnight-verify       | 0.13.0  | ✓ enabled  | (19 skills, 2 commands, 7 agents) | just now     |
```

That's one row of thirteen — the other twelve plugins stay `✗ disabled` until
you say otherwise.

## 3. Point a harness at Tome

Tome writes native configuration for each supported harness — rules files, MCP
server wiring, and (where the harness supports them) native agents and hooks.

```bash
tome harness use cursor
```

Swap `cursor` for `claude-code`, `codex`, `gemini`, or `opencode` as needed. See
[Harnesses](../using-tome/harnesses.md) for what gets written for each.

## 4. Search

Run a semantic search across every enabled skill and command:

```bash
tome query "verify a Compact contract"
```

```text
|   Score | Catalog         | Plugin          | Skill                                     | Version | Path                                                      |
|---------|-----------------|-----------------|-------------------------------------------|---------|-----------------------------------------------------------|
|  4.7874 | midnight-expert | midnight-verify | midnight-verify:verify-by-execution       | 0.13.0  | skills/midnight-verify:verify-by-execution/SKILL.md       |
|  3.4658 | midnight-expert | midnight-verify | midnight-verify:verify-by-zkir-checker    | 0.13.0  | skills/midnight-verify:verify-by-zkir-checker/SKILL.md    |
|  3.1529 | midnight-expert | midnight-verify | midnight-verify:verify-compact            | 0.13.0  | skills/midnight-verify:verify-compact/SKILL.md            |
```

(Top three of ten rows shown.)

:::note[What just happened]

That query ran a KNN vector search and a reranking pass, entirely on your
machine. Inside a configured harness the same search runs over the
[MCP server](../using-tome/mcp-server.md) — the agent searches, then loads only
the winning skill instead of holding all 28 indexed entries in context.

:::

## Pitfalls

- Adding a catalog that's already on the shelf exits `4`
  (`catalog_already_exists`).
- Enabling a plugin that's already enabled exits `21`
  (`plugin_already_in_state`).
- A plugin with only a legacy Claude Code `plugin.json` isn't loaded — that's
  exit `80` (`plugin_not_converted`);
  [`tome plugin convert`](../authoring/convert.md) migrates it.

## Next steps

- [Concepts](./concepts.md) — the model behind catalogs, plugins, and workspaces.
- [Plugins & catalogs](../using-tome/plugins-and-catalogs.md) — the day-to-day
  lifecycle.
- [Commands reference](../reference/commands.md) — every command and flag.
- [Troubleshooting](../using-tome/troubleshooting.md) — `tome doctor` and common
  issues.
